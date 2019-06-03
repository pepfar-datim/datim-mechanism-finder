import React from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";

function getData(array){
  var newData = JSON.parse(JSON.stringify(array))
  newData.splice(0,1)
  return newData
}

function getColumns(array){
  var columns = array.reduce((columnsArray, column) => {
      columnsArray.push({'Header': column, 'accessor': column});
      return columnsArray
  }, []);
  return columns
}



function DataReactTable(props) {
  return (
    <ReactTable
      data={getData(props.data)}
      columns={getColumns(props.data[0])}
      filterable={true}
      defaultPageSize={5}
    />
  );
}

export default DataReactTable;
