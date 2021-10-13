import React from 'react';
import SearchBar from './search'
import Pagination from './pagination'



function Table(props) {

  // const filterBy = item => {
  //   if (filter.length > 0) {
  //       return item.role.toLowerCase().includes(filter.toLowerCase()) || item.name.toLowerCase().includes(filter.toLowerCase()) || item.email.toLowerCase().includes(filter.toLowerCase());
  //   }
  // }

  // const checkPagination = records => {
  //   const offset = props.page * props.pageLimit;
  //   return records.slice(offset, offset + props.pageLimit);
  // }

  // const getAllRecords = () => {
  //   const list = filter ? props.entries.filter(item => filterBy(item))  : props.entries;
  //    return list
  // }

  // const bindTableRecords = () => {
  //   return checkPagination(getAllRecords());
  // }
  return (
    <>
      <SearchBar setFilter={props.setFilter} setPage={props.setPage}/>
      <table>
        <thead>
          {props.header}
        </thead>
        <tbody>
          {props.checkPagination(props.entries).map(item => props.renderRow(item))}
        </tbody>
      </table>
      <Pagination 
        pageLimit = {props.pageLimit}
        pages = {props.totalRecords}
        currentPage = {props.page}
        setPage = {props.setPage}
        deleteRows ={props.deleteRows}
      />
    </>
  )
}

export default Table