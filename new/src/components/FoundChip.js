import React from "react";

import Chip from "@material-ui/core/Chip";

import { withStyles } from "@material-ui/styles";

const styles = {
	chipStyling: {
		padding: "5px",
		margin: "5px",
		textAlign: "left",
		backgroundColor: "#c8e6c9",
	},
	chipColors: {
		okayColor: "#c8e6c9",
		warningColor: "#ffcdd2"
	}
};

function FoundChip(props) {
	const { classes } = props;
	return (
		<Chip
			className={classes.chipStyling}
			style={{
				backgroundColor: props.foundStatus
					? styles.chipColors.okayColor
					: styles.chipColors.warningColor
			}}
			label={
				props.foundStatus
					? "Found in " + props.foundLocale
					: "Not found in " + props.foundLocale
			}
		/>
	);
}

export default withStyles(styles)(FoundChip);
