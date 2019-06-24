import React from "react";

import Chip from "@material-ui/core/Chip";

import { useTheme } from "@material-ui/styles";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
	chipStyling: {
		padding: "5px",
		marginLeft: theme.spacing,
		marginBottom: theme.spacing,
		textAlign: "left"
	}
}));

function FoundChip(props) {
	const classes = useStyles();
	const theme = useTheme();
	return (
		<Chip
			className={classes.chipStyling}
			style={{
				backgroundColor: props.foundStatus
					? theme.okayColor
					: theme.warningColor
			}}
			label={
				props.foundStatus
					? "Found in " + props.foundLocale
					: "Not found in " + props.foundLocale
			}
		/>
	);
}

function FoundTable(props) {
	return (
		<div>
			<FoundChip
				foundStatus={props.foundInFACTS}
				foundLocale="FACTS Info"
			/>
			<FoundChip foundStatus={props.foundInDATIM} foundLocale="DATIM" />
		</div>
	);
}

export default FoundTable;