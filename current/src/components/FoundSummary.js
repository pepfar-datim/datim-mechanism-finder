import React from "react";

import Chip from "@material-ui/core/Chip";

const theme = require('./theme.js');


function FoundChip(props) {

	return (
		<Chip
			style={{
				padding: "5px",
				margin: theme.spacing.spacing,
				textAlign: "left",				
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