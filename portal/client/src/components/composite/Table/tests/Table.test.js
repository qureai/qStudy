import React from 'react'
import { render, fireEvent, screen, waitForElement } from '@testing-library/react'
import _ from 'lodash'
import Table from '../index'

const data = [
  { id: 1, name: 'Tom', age: 86 },
  { id: 2, name: 'Zebra', age: 12 },
  { id: 3, name: 'Ferry', age: 21 },
  { id: 4, name: 'Jacob', age: 22 },
  { id: 5, name: 'Mike', age: 25 },
  { id: 6, name: 'Ram', age: 29 },
  { id: 7, name: 'Lakshman', age: 30 },
  { id: 8, name: 'Hanuman', age: 7 },
  { id: 9, name: 'Sahil', age: 24 },
  { id: 10, name: 'Preetham', age: 26 },
  { id: 11, name: 'Manoj', age: 90 },
  { id: 12, name: 'Shalini', age: 54 },
  { id: 13, name: 'Teresa', age: 20 },
  { id: 14, name: 'Jesus', age: 2000 },
  { id: 15, name: 'Allah', age: 1300 },
  { id: 16, name: 'God', age: 10000 },
  { id: 17, name: 'Hussian', age: 90 },
]

const columns = [
  { name: 'ID', accessor: 'id', sortable: true },
  { name: 'Name', accessor: 'name', sortable: true, searchable: true },
  { name: 'Age', accessor: 'age', sortable: true },
  { name: 'Bio', accessor: (row) => `${_.get(row, ['name'])} ${_.get(row, ['age'])}`, sortable: false },
  {
    name: 'Link', accessor: 'name', sortable: false,
    transform: (cell, row) => <a href={`/${_.get(row, ['name'])}`}>Visit {_.get(row, ['name'])}</a>
  }
]

test('renders table', () => {
  const { container } = render(
    <Table
      title="Test Table"
      data={data}
      pagination={{ pageSize: data.length, pageNumber: 1 }}
      columns={columns} />
  );

  const table = container.querySelector('table');
  const tBody = table.querySelector('tbody');
  const numOfRows = data.length;
  expect(tBody.children.length).toBe(numOfRows);
})

test('renders loader', () => {
  const { rerender } = render(
    <Table
      title="Test table"
      isLoading
      data={data}
      columns={columns} />
  )

  expect(screen.queryByText('Loading..').textContent).toBe('Loading..');

  rerender(<Table
    title="Test table"
    isLoading={false}
    data={data}
    columns={columns} />);

  expect(screen.queryByText('Loading..')).toBeNull();
})

test('local data: default sort on first column & sort change', () => {
  const { container } = render(
    <Table
      title="Test Table"
      data={data}
      columns={columns} />
  );

  const firstRowfirstCell = container.querySelector('tbody tr:first-child > td:first-child')
  expect(firstRowfirstCell.textContent).toBe('1');
  fireEvent.click(container.querySelector('.column-header').firstChild);
  expect(firstRowfirstCell.textContent).toBe('17');
})

test('local data: change page using next', async () => {
  const pageSize = 5;

  const { container } = render(
    <Table
      title="Test Table"
      data={data}
      pagination={{ pageNumber: 1, pageSize }}
      columns={columns} />
  );

  const tBody = container.querySelector('tbody');
  expect(tBody.children.length).toBe(pageSize);
  fireEvent.click(screen.getByText(/Next/i));
  //  10th row
  await waitForElement(() => screen.getByText('Preetham'));
  fireEvent.click(screen.getByText(/Next/i));
  await waitForElement(() => screen.getByText('Allah'));
  expect(screen.getByRole('button', { name: /4/i }));
  //  click page number
  fireEvent.click(screen.getByRole('button', { name: /4/i }));
  await waitForElement(() => screen.getByText('Hussian'));
})

test('local data: search', async () => {
  render(
    <Table
      title="Test Table"
      data={data}
      columns={columns} />
  );

  const searchInput = screen.getByPlaceholderText(/Search/i);
  fireEvent.change(searchInput, { target: { value: 'xxxxx' } });
  await waitForElement(() => screen.getByText(/No records found/i));
  fireEvent.change(searchInput, { target: { value: 'Sahil' } });
  await waitForElement(() => screen.getByText('Sahil'));
  expect(screen.queryByText(/Preetham/i)).toBeNull();
});

test('rowStyle', async () => {
  function rowStyle(row) {
    if (_.get(row, ['age']) > 20) return 'red';
    return null
  }

  const { container } = render(
    <Table
      title="Test Table"
      data={data}
      rowStyle={rowStyle}
      pagination={{ pageSize: data.length, pageNumber: 1 }}
      columns={columns} />
  );
  const rowsWithRed = data.filter((d) => d.age > 20).length;
  const redRows = container.querySelectorAll('tr.red').length;

  expect(rowsWithRed).toBe(redRows);
});




