import React from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";

function getData(array) {
  var newData = JSON.parse(JSON.stringify(array));
  newData.splice(0, 1);
  return newData;
}

function getColumns(array) {
  var columns = array.reduce((columnsArray, column) => {
    var columnProperties = { Header: column, accessor: column };
    columnsArray.push(columnProperties);
    return columnsArray;
  }, []);
  return columns;
}

function DataReactTable(props) {
  return (
    <ReactTable
      data={getData(props.data)}
      columns={getColumns(props.data[0])}
      filterable={true}
      defaultPageSize={5}
      getTrProps={(state, rowInfo, column) => {
        var newDate = false;
        try {
          let rowIndex = rowInfo.index;
          if (rowIndex >= 0) {
            if (state.data[rowIndex - 1]["Date"] !== rowInfo.row.Date) {
              newDate = true;
            }
          }
        } catch {
          newDate = false;
        }
        return {
          style: {
            borderTop: newDate ? "3px solid" : ""
          }
        };
      }}
      className="-striped"
    />
  );
}

export default DataReactTable;