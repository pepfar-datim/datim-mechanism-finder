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

function getColumns(columnRow, dataRow) {
	var wideColumns = {"Legacy Partner Name": true, "IM": true};
	for (let i = columnRow.length; i <= Object.keys(dataRow).length; i++) {
		columnRow.push("undefined" + i);
	}
	for (let i = Object.keys(dataRow).length; i <= columnRow.length; i++) {
		columnRow.pop();
	}
	var columns = columnRow.reduce((columnsArray, column) => {
		var columnProperties = {
			Header: column,
			accessor: column,
			foldable: true,
			style: { whiteSpace: "unset", wordWrap: "break" },
			width: 100
		};
		if (wideColumns.hasOwnProperty(column)) {columnProperties.width = 200;}
		columnsArray.push(columnProperties);
		return columnsArray;
	}, []);
	return columns;
}

function DataReactTable(props) {
	var definedColumns = getColumns(props.data[0], props.data[1]);
	return (
<div>
		<FoldableTable
			style={{
				margin: "10px",
				height: "calc(100% - 600px)",
			}}
			data={getData(props.data)}
			columns={definedColumns}
			filterable={true}
			defaultPageSize={100}
			minRows={0}
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
		/>
</div>
	);
}

export default DataReactTable;