import React, {useState, useMemo , useEffect} from "react";
import APIServiceUpdateTable from '../APIServices/APIServiceUpdateTable'
import {useTable} from "react-table"

function TablePanel () {

    const [history,setHistory] = useState([])

    const data = useMemo(
        () => [
            {
                "date": "2022-01-06",
                "transaction": "SUCCESSFUL",
                "transaction_type": "WITHDRAWAL",
                "amount": 1
            },
            {
                "date": "2022-01-05",
                "transaction": "SUCCESSFUL",
                "transaction_type": "WITHDRAWAL",
                "amount": 1
            }
        ],
        []
      );

    const columns = useMemo(() => [
        {
            Header: "Date",
            accessor: "date"
        },
        {
            Header: "Type",
            accessor: "transaction_type"
        },
        {
            Header: "Amount",
            accessor: "amount"
        },
        {
            Header: "Status",
            accessor: "transaction"
        }
    ], [])

    const tableInstance = useTable({columns, data});

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;



    useEffect( () => {
        APIServiceUpdateTable.UpdateTable(sessionStorage.getItem("account_id")).then(resp => {
            console.log(resp.user_transactions)
            setHistory(resp.user_transactions[0])
        })
    },[])


    return (

      <table {...getTableProps()}>
        <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
    );
}

export default TablePanel;