import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
	progressStyling: {
		marginLeft: theme.spacing
	},
	circle: {
		color: theme.grey
	}
}));

function ProgressNote(props) {
	const classes = useStyles();
	return (
		<div className={classes.progressStyling}>
			<p>
				{"Trying to find mechanism with mechanism code: " + props.text}
			</p>
			<CircularProgress className={classes.circle} />
		</div>
	);
}

export default ProgressNote;
