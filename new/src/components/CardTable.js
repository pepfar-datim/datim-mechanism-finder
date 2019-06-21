import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  tableStyling: {
    padding: '0pxx',
  }
});

function formatDate(date) {
  if (typeof date === "string") {
    return date.substring(0, 10);
  }
}

function CardTable(props){
  const classes = useStyles();
  return (

    <Table className={classes.tableStyling} size="small">
      <TableBody>
      	<TableRow hover={true} key={'name.row'}>
        	<TableCell key='name.name'>name</TableCell>
        	<TableCell key='name.value'>{props.entity.name}</TableCell>
        </TableRow>
      	<TableRow hover={true} key={'code.row'}>
        	<TableCell key='code.name'>code</TableCell>
        	<TableCell key='code.value'>{props.entity.code}</TableCell>
        </TableRow>
      	
      	<TableRow hover={true} key={'lastUpdated.row'}>
        	<TableCell key='lastUpdated.name'>last updated</TableCell>
        	<TableCell key='lastUpdated.value'>{formatDate(props.entity.lastUpdated)}</TableCell>
        </TableRow>
      	{props.entityType !== "Mechanism" && (
	      	<TableRow hover={true} key={'created.row'}>
	        	<TableCell key='created.name'>created</TableCell>
	        	<TableCell key='created.value'>{formatDate(props.entity.created)}</TableCell>
	        </TableRow>
	    )}
      	{props.entityType === "Mechanism" && (
	      	<TableRow hover={true} key={'startDate.row'}>
	        	<TableCell key='startDate.name'>start</TableCell>
	        	<TableCell key='startDate.value'>{formatDate(props.entity.startDate)}</TableCell>
	        </TableRow>
	    )}
      	{props.entityType === "Mechanism" && (
	      	<TableRow hover={true} key={'endDate.row'}>
	        	<TableCell key='endDate.name'>end</TableCell>
	        	<TableCell key='endDate.value'>{formatDate(props.entity.endDate)}</TableCell>
	        </TableRow>
	    )}
      	{props.entityType === "Mechanism" && (
	      	<TableRow hover={true} key={'status.row'}>
	        	<TableCell key='activeStatus.name'>active</TableCell>
	        	<TableCell key='activeStatus.value'>{props.activeStatus}</TableCell>
	        </TableRow>
	    )}

      </TableBody>
    </Table>
  );
}

export default CardTable;