/**
 *
 * Table
 *
 */

import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import { NoRecords, Loader, THead, TBody, TFooter, TableMenu } from './components'

function getCellValue(row, column) {
  const { accessor } = column;
  const cellValue = _.isFunction(accessor) ? accessor(row) : row[accessor];
  return cellValue
}

function sortTableData(tableData, column, sortOrder) {
  const tableDataCopy = [...tableData];
  const sortedData = tableDataCopy.sort((firstRow, secondRow) => {
    const firstCellValue = getCellValue(firstRow, column);
    const secondCellValue = getCellValue(secondRow, column);
    const sortOrderFlag = sortOrder === 'asc' ? 1 : -1;
    if (firstCellValue > secondCellValue) return 1 * sortOrderFlag;
    if (firstCellValue < secondCellValue) return -1 * sortOrderFlag;
    return 0;
  })

  return sortedData
}


function Table(props) {
  const {
    title,
    columns,
    data,
    isLoading,
    renderTitleRightComponent,
    sort,
    pagination,
    search,
    rowStyle,
    className,
    tableClass,
    hasTableHeader,
    onClickRow,
  } = props

  const { sortIndex: defaultSortIndex, onSortChange, sortOrder: defaultSortOrder } = sort;
  const { totalRecords, onPageChange } = pagination;
  const { pageNumber: page = 1, pageSize } = pagination;
  const { onSearch, enableSearch } = search;

  const totalPages = totalRecords ? Math.ceil(totalRecords / pageSize) : Math.ceil(data.length / pageSize);
  const [sortColumnIndex, setSortColumnIndex] = useState(defaultSortIndex);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);
  const isServerSide = onPageChange || onSortChange
  const [pageNumber, setPageNumber] = useState(page);

  const getInitialData = useCallback(() => {
    let initialTableData = data;
    if (!isServerSide) {
      initialTableData = sortTableData(data, columns[sortColumnIndex], sortOrder);
    }
    return initialTableData;
  }, [data, isServerSide, columns, sortColumnIndex, sortOrder]);

  const [tableData, setTableData] = useState(isServerSide ? data : getInitialData());

  const getPageDataSlice = useCallback(() => {
    const lowerIndex = (pageNumber - 1) * pageSize
    const higherIndex = (pageNumber * pageSize)
    return tableData.slice(lowerIndex, higherIndex);
  }, [tableData, pageNumber, pageSize]);

  const [pageData, setPageData] = useState(isServerSide ? data : getPageDataSlice());

  useEffect(() => {
    setPageNumber(page);
    setTableData(isServerSide ? data : getInitialData());
    setPageData(isServerSide ? data : getPageDataSlice());
  }, [page, data, isServerSide]);

  useEffect(() => {
    if (!isServerSide) {
      const newPageData = getPageDataSlice();
      setPageData(newPageData);
    }
  }, [tableData, isServerSide]);


  const onClickPageChange = useCallback((newPageNumber) => {
    if (newPageNumber < 1 || newPageNumber > totalPages) {
      return;
    }
    if (onPageChange) {
      onPageChange(newPageNumber)
    } else {
      setPageNumber(newPageNumber);
    }
  }, [onPageChange, totalPages])

  useEffect(() => {
    if (!onPageChange) {
      setPageData(getPageDataSlice());
    }
  }, [pageNumber])

  function onSortClick(columnIndex, newSortOrder) {
    const column = columns[columnIndex];
    if (onSortChange) {
      onSortChange(column, newSortOrder)
      return
    }
    const sortedTableData = sortTableData(data, column, newSortOrder);
    setTableData(sortedTableData);
    setSortColumnIndex(columnIndex);
    setSortOrder(newSortOrder);
  }

  function onPerformSearch(searchText) {
    if (searchText === '' && !isServerSide) {
      setTableData(getInitialData());
    }
    if (onSearch) {
      onSearch(searchText);
    } else {
      const caseInsensitiveSearchText = searchText.toLowerCase();
      const validColumns = columns.filter((col) => col.searchable);
      let searchedTableData = [];
      validColumns.forEach((col) => {
        const filteredData = data.filter((row) => {
          const cellValue = getCellValue(row, col).toLowerCase();
          return cellValue.search(caseInsensitiveSearchText) >= 0;
        })

        searchedTableData = searchedTableData.concat(filteredData);
      });

      setTableData(searchedTableData);
    }
  }

  const wrapperClasses = classNames('box table-wrapper is-unselectable mb-6', {
    [className]: !!className
  });
  const tableClasses = classNames('table is-fullwidth is-hoverable', {
    [tableClass]: !!tableClass
  })

  let showFooter = true
  if (pageNumber === 1 && _.size(pageData) !== pageSize) {
    showFooter = false
  }

  return (
    <div title={title} className={wrapperClasses}>
      {hasTableHeader && <TableMenu
        title={title}
        enableSearch={enableSearch}
        onSearch={onPerformSearch}
        renderTitleRightComponent={renderTitleRightComponent} />}
      <Loader isLoading={isLoading} />
      {isLoading || tableData.length === 0 ? <NoRecords /> :
        <table className={tableClasses}>
          <THead
            columns={columns}
            sortOrder={sortOrder}
            sortColumnIndex={sortColumnIndex}
            onSortClick={onSortClick} />
          <TBody
            pageData={pageData}
            columns={columns}
            pageSize={pageSize}
            onClickRow={onClickRow}
            rowStyle={rowStyle} />
          {showFooter && <TFooter
            columns={columns}
            pageNumber={pageNumber}
            totalPages={totalPages}
            onClickPageChange={onClickPageChange} />}
        </table>
      }
    </div>
  )
}

Table.defaultProps = {
  hasTableHeader: true,
  renderTitleRightComponent: () => null,
  sort: { sortIndex: 0, sortOrder: 'asc' }, // TODO: no default sort, if specifiied then do it
  search: { enableSearch: true },
  pagination: { pageNumber: 1, pageSize: 10 },
  rowStyle: () => '',
  isLoading: false,
  className: '',
  tableClass: '',
  onClickRow: null,
}

Table.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    sortable: PropTypes.bool,
    transform: PropTypes.func
  })).isRequired,
  sort: PropTypes.shape({
    sortIndex: PropTypes.number,
    sortOrder: PropTypes.oneOf(['asc', 'desc']),
    onSortChange: PropTypes.func
  }),
  pagination: PropTypes.shape({
    pageNumber: PropTypes.number,
    pageSize: PropTypes.number,
    totalRecords: PropTypes.number,
    onPageChange: PropTypes.func
  }),
  search: PropTypes.shape({
    enableSearch: PropTypes.bool,
    onSearch: PropTypes.func
  }),
  onClickRow: PropTypes.func,
  hasTableHeader: PropTypes.bool,
  tableClass: PropTypes.string,
  isLoading: PropTypes.bool,
  renderTitleRightComponent: PropTypes.func,
  className: PropTypes.string,
  rowStyle: PropTypes.func
}

export default Table
