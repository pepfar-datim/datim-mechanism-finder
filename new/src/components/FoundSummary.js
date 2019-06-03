import React from "react";

import Chip from "@material-ui/core/Chip";

function FoundTable(props) {
	return (
		<div>
			<Chip
				style={{
					backgroundColor: props.foundInFACTS ? "#A5D6A7" : "#EF9A9A"
				}}
				label={
					props.foundInFACTS ? "Found in FACTS" : "Not found in FACTS"
				}
			/>
			<Chip
				style={{
					backgroundColor: props.foundInFACTS ? "#A5D6A7" : "#EF9A9A"
				}}
				label={
					props.foundInDATIM ? "Found in DATIM" : "Not found in DATIM"
				}
			/>
		</div>
	);
}

export default FoundTable;