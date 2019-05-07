import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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
        {props.data.slice(1).map(row => (
          <TableRow>
            {row.map(value => (
              <TableCell>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DataTable;