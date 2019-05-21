import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography';

function generateTable(entity){
	return (
		<div>
			<p><strong>name:</strong> {entity.name}</p>
			<p><strong>id:</strong> {entity.id}</p>
			<p><strong>code:</strong> {entity.code}</p>
		</div>
	)
}

function MechanismCard(props) {
	return (
		<div style={{ display: "inline-block" }}>
			<Card style={{ minWidth: 400, maxWidth: 400, float: "left", margin: 10}}>
				<CardContent>
    				<div>
    					<Typography variant="h4" gutterBottom>
        					{props.text}
    					</Typography>
    					{generateTable(props.entity)}
    				</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default MechanismCard;