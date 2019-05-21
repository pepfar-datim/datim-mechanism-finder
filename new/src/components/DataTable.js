import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

function renderRow(row, i) {
  var tempRowID = "r" + i;
  return (
    <TableRow key={tempRowID}>
      {row.map((value, j) => renderCell(i, j, value))}
    </TableRow>
  );
}

function renderCell(i, j, value) {
  var tempColID = "r" + i + ".c" + j;
  return <TableCell key={tempColID}>{value}</TableCell>;
}

function DataTable(props) {
  console.log("data table rendered");
  return (
    <Table>
      <TableHead>
        <TableRow>
          {props.data[0].map((heading, i) => (
            <TableCell key={i}>{heading}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.data.slice(1).map((row, i) => renderRow(row, i))}
      </TableBody>
    </Table>
  );
}

export default DataTable;