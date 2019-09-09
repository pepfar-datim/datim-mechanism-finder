import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

const theme = require('./theme.js');


function ProgressNote(props) {
	return (
		<div 
			style = {{
				marginLeft: theme.spacing.spacing
			}}
		>
			<p>
				{"Trying to find mechanism with mechanism code: " + props.text}
			</p>
			<CircularProgress 
				style = {{
					color: theme.colors.grey
				}}
			/>
		</div>
	);
}

export default ProgressNote;
