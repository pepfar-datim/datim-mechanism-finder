import React from "react";

import Chip from "@material-ui/core/Chip";

import { useTheme } from '@material-ui/styles';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  chipStyling: {
    padding: '5px',
    marginLeft: '10px',
    textAlign: 'left',
  }
});

function FoundTable(props) {
	const classes = useStyles();
	const theme = useTheme();
	return (
		<div>
			<Chip
				className={classes.chipStyling}
				style={{
					backgroundColor: props.foundInFACTS ? theme.okayColor : theme.warningColor,
				}}
				label={
					props.foundInFACTS ? "Found in FACTS" : "Not found in FACTS"
				}
			/>
			<Chip
				className={classes.chipStyling}
				style={{
					backgroundColor: props.foundInFACTS ? theme.okayColor : theme.warningColor
				}}
				label={
					props.foundInDATIM ? "Found in DATIM" : "Not found in DATIM"
				}
			/>
		</div>
	);
}

export default FoundTable;