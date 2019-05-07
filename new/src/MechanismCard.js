import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

function MechanismCard(props) {
	return (
		<div style={{ display: "inline-block" }}>
			<Card style={{ minWidth: 400, float: "left", margin: 10 }}>
				<CardContent>
					<p>{props.text}</p>
				</CardContent>
			</Card>
		</div>
	);
}

export default MechanismCard;