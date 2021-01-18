import React, { isValidElement, useRef, useCallback } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const columnProps = PropTypes.shape({
  label: PropTypes.string,
  accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  transform: PropTypes.func,
  searchable: PropTypes.bool,
  sortable: PropTypes.bool,
})
const columnsProps = PropTypes.arrayOf(columnProps)

function THead({ columns, sortOrder, sortColumnIndex, onSortClick }) {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => {
          return (
            <ColumnHeader
              key={index}
              index={index}
              column={column}
              isSortEnabled={index === sortColumnIndex}
              sortOrder={sortOrder}
              onSortClick={onSortClick} />
          )
        })}
      </tr>
    </thead>
  )
}

THead.propTypes = {
  columns: columnsProps.isRequired,
  sortOrder: PropTypes.string.isRequired,
  sortColumnIndex: PropTypes.number.isRequired,
  onSortClick: PropTypes.func.isRequired,
}

function TBody({ pageData, columns, rowStyle, onClickRow, pageSize }) {

  let blankRows = []
  const currentPageSize = _.size(pageData)
  const columnSize = _.size(columns)
  if (currentPageSize !== pageSize) {
    blankRows = _.range(1, pageSize - currentPageSize + 1)
  }

  return (
    <tbody>
      {pageData.map((row, rowIndex) => <Row
        key={rowIndex}
        row={row}
        onClickRow={onClickRow}
        className={rowStyle(row)}
        columns={columns} />)}
      {blankRows.map((index) => {
        return (<Row row={{}} columns={[]} key={currentPageSize + index} className={rowStyle(0)} isBlankRow columnSize={columnSize} />)
      })}
    </tbody>
  )
}

TBody.defaultProps = {
  rowStyle: () => '',
  onClickRow: () => null,
}

TBody.propTypes = {
  pageData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  pageSize: PropTypes.number.isRequired,
  columns: columnsProps.isRequired,
  rowStyle: PropTypes.func,
  onClickRow: PropTypes.func,
}

function TFooter({ pageNumber, totalPages, onClickPageChange, columns }) {
  return (
    <tfoot>
      <tr>
        <td colSpan={columns.length}>
          <div className="level">
            <div>
              {
                _.range(1, totalPages + 1).map((number) => {
                  const pageClass = classNames('button pagination-link', {
                    'is-current': number === pageNumber,
                  })

                  return (
                    <button
                      type="button"
                      className={pageClass}
                      key={number}
                      onClick={() => onClickPageChange(number)}
                      aria-label={`Goto page ${number}`}>
                      {number}
                    </button>
                  )
                })
              }
            </div>
            <nav
              className="pagination"
              role="navigation"
              aria-label="pagination">
              <button
                type="button"
                className="pagination-previous button is-primary is-outlined"
                disabled={pageNumber === 1}
                onClick={() => onClickPageChange(pageNumber - 1)}>Previous
            </button>
              <button
                type="button"
                className="pagination-next button is-primary is-outlined"
                disabled={pageNumber === totalPages}
                onClick={() => onClickPageChange(pageNumber + 1)}>Next page
            </button>
            </nav>
          </div>
        </td>
      </tr>
    </tfoot>
  )
}

TFooter.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onClickPageChange: PropTypes.func.isRequired,
  columns: columnsProps.isRequired,
}


function TableMenu({ title, enableSearch, onSearch, renderTitleRightComponent }) {
  const searchInputRef = useRef(null)
  let onChangeText = useCallback(() => {
    onSearch(searchInputRef.current.value)
  }, [onSearch])

  onChangeText = _.debounce(onChangeText, 500)

  return (
    <div className="level">
      <div className="level-left">
        <div className="level-item">
          <h2 className="is-size-4 has-text-primary">{title}</h2>
        </div>
        {
          renderTitleRightComponent()
        }
      </div>
      {enableSearch ?
        (<div className="level-right">
          <div className="field has-addons">
            <div className="control has-icons-left">
              <input
                ref={searchInputRef}
                onChange={onChangeText}
                className="input"
                type="text"
                placeholder={`Search ${title}...`}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search" />
              </span>
            </div>
            <div className="control" aria-hidden="true" role="button" onClick={() => {
              const searchText = searchInputRef.current.value
              if (searchText.length) {
                onSearch(searchText)
              }
            }}>
              <button type="button" className="button is-primary">Search</button>
            </div>
          </div>
        </div>) : null
      }
    </div>
  )
}

TableMenu.propTypes = {
  title: PropTypes.string.isRequired,
  enableSearch: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  renderTitleRightComponent: PropTypes.func.isRequired,
}

function ColumnHeader(props) {
  const { column, onSortClick, isSortEnabled, sortOrder, index } = props
  const { label, sortable } = column
  const columnClass = classNames('column-header', {
    'sortable': sortable,
  })

  return (
    <th
      className={columnClass}
      onClick={() => {
        if (isSortEnabled) {
          onSortClick(index, sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
          onSortClick(index, sortOrder)
        }
      }}>
      <span>{label}</span>
      {
        sortable && !isSortEnabled ?
          (<span className="icon">
            <i className="fas fa-sort" />
          </span>) : null
      }
      {
        sortable && isSortEnabled ?
          (<span className="icon">
            <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`} />
          </span>) : null
      }
    </th>
  )
}

ColumnHeader.defaultProps = {
  onSortClick: () => {
  },
  isSortEnabled: false,
  sortOrder: 'asc',
}

ColumnHeader.propTypes = {
  column: columnProps.isRequired,
  index: PropTypes.number.isRequired,
  onSortClick: PropTypes.func,
  isSortEnabled: PropTypes.bool,
  sortOrder: PropTypes.oneOf(['asc', 'desc']),
}

function getCellValue(row, column) {
  const { accessor } = column
  const cellValue = _.isFunction(accessor) ? accessor(row) : row[accessor]
  return cellValue
}

function renderCell(row, column) {
  const cellValue = getCellValue(row, column)
  const { transform } = column
  const cell = _.isFunction(transform) ? transform(cellValue, row) : cellValue
  return cell
}

function Row({ row, columns, className, onClickRow, isBlankRow, columnSize }) {
  const rowClass = classNames('has-text-black-bis', {
    [className]: !!className,
  })

  if (isBlankRow) {
    return (<tr className={rowClass}>
      <td colSpan={columnSize} />
    </tr>)
  }

  const onClick = (e) => {
    if (onClickRow) {
      e.preventDefault()
      e.stopPropagation()
      onClickRow(row)
    }
  }

  return (
    <tr
      onClick={onClick}
      className={rowClass}>
      {columns.map((column, index) => {
        return <Cell key={index} value={renderCell(row, column)} />
      })}
    </tr>
  )
}

Row.defaultProps = {
  className: '',
  isBlankRow: false,
  columnSize: 0,
  onClickRow: () => null,
}

Row.propTypes = {
  row: PropTypes.shape({}).isRequired,
  columns: columnsProps.isRequired,
  onClickRow: PropTypes.func,
  className: PropTypes.string,
  isBlankRow: PropTypes.bool,
  columnSize: PropTypes.number
}

function Cell({ value }) {
  const isElement = isValidElement(value)
  return (
    <td title={isElement ? '' : value}>
      {isElement ? value : _.truncate(value, { length: 20 })}
    </td>
  )
}

Cell.defaultProps = {
  value: null,
}

Cell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
}


function NoRecords({ message }) {
  return (
    <div className="no-records">
      <div className="notification">
        {message}
      </div>
    </div>
  )
}

NoRecords.defaultProps = {
  message: 'No Records found',
}

NoRecords.propTypes = {
  message: PropTypes.string,
}

function Loader({ isLoading }) {
  return isLoading ? (
    <div className="loader-container">
      Loading..
    </div>
  ) : null
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}


export { THead, TBody, TFooter, TableMenu, NoRecords, Loader }
