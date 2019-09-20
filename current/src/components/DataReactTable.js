import React from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";

import FoldableTableHOC from "react-table/lib/hoc/foldableTable";
import ReactTooltip from 'react-tooltip'

const FoldableTable = FoldableTableHOC(ReactTable);

function getData(array) {
	var newData = JSON.parse(JSON.stringify(array));
	newData.splice(0, 1);
	return newData;
}

function MyCell(column) {
  return <span title={column}>{column}</span>
}

function organizeColumns(columnRow, dataRow) {
	var idealOrder = ["Date","OU","OU Country Code","FY","Reporting Cycle","HQ ID","IM","Agency","Award Number","Partner Name","Partner DUNS","Start Date","End Date","Active","Partner Country","Indigenous Partner","Organization Type","Legacy ID","Legacy Partner Name","Legacy Partner ID","Legacy Partner Organization Type ID"];

	//first harmonize length between columns and data (if necessary)
	for (let i = columnRow.length; i <= Object.keys(dataRow).length; i++) {
		columnRow.push("undefined" + i);
	}
	for (let i = Object.keys(dataRow).length; i <= columnRow.length; i++) {
		columnRow.pop();
	}

	//then create hash map from what is present
	var presentHeaders = columnRow.reduce((hash, header) => {
    	hash[header] = true;
    	return hash
	}, {});

	//and use that to create the actual order of the columns (add extra headers that aren't in ideal order at the end)
	var actualOrder = []
	for (let i=0; i<idealOrder.length; i++) {
		if (presentHeaders.hasOwnProperty(idealOrder[i])) {
			actualOrder.push(idealOrder[i]);
			delete presentHeaders[idealOrder[i]];
		}
	}
	actualOrder = actualOrder.concat(Object.keys(presentHeaders))
	return actualOrder
}

function getColumns(columnRow, dataRow) {
	const headerStyle = "{white-space: pre-line !important;word-wrap: break-word;}"
	var wideColumns = {"Legacy Partner Name": true, "IM": true};

	columnRow = organizeColumns(columnRow, dataRow);
	var columnNameRemap = {"HQ ID": "Mech ID", "IM": "Mech Name"};

	var columns = columnRow.reduce((columnsArray, column) => {
		var columnName = column;
		if (columnNameRemap.hasOwnProperty(column)) {columnName = columnNameRemap[column]}
		var columnProperties = {
			Header: <div data-tip={columnName}>{columnName}<ReactTooltip place="top" type="dark" effect="float"/></div>,
			accessor: column,
			foldable: true,
			style: { 'whiteSpace': 'unset'},
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