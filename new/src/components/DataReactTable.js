import React from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";

import FoldableTableHOC from "react-table/lib/hoc/foldableTable";

const FoldableTable = FoldableTableHOC(ReactTable);

function getData(array) {
	var newData = JSON.parse(JSON.stringify(array));
	newData.splice(0, 1);
	return newData;
}

function getColumns(columnRow,dataRow) {
	for(let i=columnRow.length; i<=Object.keys(dataRow).length; i++){
		columnRow.push('undefined' + i);
	}
	for(let i=Object.keys(dataRow).length; i<=columnRow.length; i++){
		columnRow.pop();
	}
	var columns = columnRow.reduce((columnsArray, column) => {
		var columnProperties = {
			Header: column,
			accessor: column,
			foldable: true
		};
		columnsArray.push(columnProperties);
		return columnsArray;
	}, []);
	return columns;
}

function DataReactTable(props) {
	var definedColumns = getColumns(props.data[0],props.data[1]);
	return (
		<FoldableTable
			data={getData(props.data)}
			columns={definedColumns}
			filterable={true}
			defaultPageSize={5}
			getTrProps={(state, rowInfo, column) => {
				var newDate = false;
				try {
					let rowIndex = rowInfo.viewIndex;
					if (rowIndex >= 0) {
						if (
							state.sortedData[rowIndex - 1]["_original"][
								"Date"
							] !== rowInfo.original.Date
						) {
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