import React, {useState, useMemo , useEffect} from "react";
import APIServiceUpdateTable from '../APIServices/APIServiceUpdateTable'
import {useGlobalFilter, useSortBy, useTable} from "react-table"
import "../../styling/TablePanel.css"
import  { GlobalFilter } from './GlobalFilter'

function TablePanel () {

    const [history,setHistory] = useState([])

     const transHistory = useMemo(() => [...history], [history]);

        const historyColumns = useMemo(
        () =>
          history[0]
            ? Object.keys(history[0])
                .filter((key) => key !== "history_id" && key !== "the_user_account_id")
                .map((key) => {
                  return { Header: key, accessor: key };
                })
            : [],
        [history]
        );

    const tableInstance = useTable(
        {
        columns: historyColumns,
        data: transHistory,
        },
        useGlobalFilter,
        useSortBy
    );

    const{
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
            preGlobalFilteredRows,
            setGlobalFilter,
            state,
         } = tableInstance;

    useEffect( () => {
        APIServiceUpdateTable.UpdateTable(sessionStorage.getItem("account_id")).then(resp => {
            console.log(resp.user_transactions)
            setHistory(resp.user_transactions)
        })
    },[])


    return (
      <div>
        <h1> Transaction history {history["amount"]} </h1>
        <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
        />
      <table {...getTableProps()}>
        <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                  </th>
                ))}
              </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
        </tbody>
      </table>
      </div>
    );
}

export default TablePanel;