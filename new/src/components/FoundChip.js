import React from "react";

import Chip from "@material-ui/core/Chip";

const theme = require('./theme.js');


function FoundChip(props) {

	return (
		<Chip
			className={styles.chipStyling}
			style={{
				padding: "5px",
				margin: "5px",
				textAlign: "left",
				backgroundColor: "#c8e6c9",
				backgroundColor: props.foundStatus
					? theme.colors.okayColor
					: theme.colors.warningColor
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
