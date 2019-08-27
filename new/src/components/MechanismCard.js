import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import CardTable from "./CardTable.js";

const theme = require('./theme.js');

function MechanismCard(props) {
	var activeStatus = props.mechStatus;
	return (
		<div style={{ display: "inline-block" }}>
			<Card
				style={{
					minWidth: 400,
					maxWidth: 400,
					align: "left",
					float: "left",
					margin: theme.spacing.spacing,
					height: 320,
					whiteSpace: "normal",
					wordWrap: "break-word",
					backgroundColor:
						typeof activeStatus === "undefined"
							? "#HHHHHH"
							: activeStatus === "Active"
							? theme.colors.okayColor
							: activeStatus === "Will be active in future"
							? theme.colors.futureColor
							: theme.colors.warningColor
				}}
			>
				<CardContent>
					<div>
						<Typography variant="h6" gutterBottom>
							{props.text}
						</Typography>
						<CardTable
							entity={props.entity}
							entityType={props.text}
							activeStatus={activeStatus}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default MechanismCard;