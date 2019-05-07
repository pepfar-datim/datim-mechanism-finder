import React from "react";

import Chip from "@material-ui/core/Chip";

function FoundTable(props) {
	return (
		<div>
			<Chip label={props.factsText} />
			<Chip label={props.datimText} />
		</div>
	);
}

export default FoundTable;