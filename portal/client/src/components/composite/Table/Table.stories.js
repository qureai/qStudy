import React from 'react';
import Table from './index';
import '../../scss/stories.scss'

export default {
  component: Table,
  title: 'Composite/Table',
};

const data = [
  {name: 'Adam', age: 20, phone: '8790634091'},
  {name: 'Badou', age: 25, phone: '7373838822'},
  {name: 'Casper', age: 22, phone: '7737373882'},
  {name: 'Dan', age: 21, phone: '847478383'},
  {name: 'Elisha', age: 19, phone: '3984858333'},
]

const columns = [
  {label: 'Name', accessor: 'name', sortable: true, searchable: true},
  {label: 'Age', accessor: 'age', sortable: true},
  {label: 'Phone Number', accessor: 'phone'},
]

export const basic = () => {
  return (
    <Table title="Worklist" data={data} columns={columns} className="table"/>
  )
}

export const withoutSearch = () => {
  return <Table title="Table" data={data} columns={columns} search={{enableSearch: false}} className="table"/>
}

export const pagination = () => {
  const data = (new Array(55)).fill(0)
  .map((el) => ({
    name: Math.random().toString(32).slice(2),
    age: Math.floor(Math.random() * 100),
    phone: Math.floor(Math.random() * 100000000)
  }));

  return <Table title="Table" data={data} columns={columns} pagination={{pageSize: 5, pageNumber:1}} className="table"/>
}

