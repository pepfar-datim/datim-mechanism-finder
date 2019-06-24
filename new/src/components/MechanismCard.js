import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { useTheme } from "@material-ui/styles";
import { makeStyles } from "@material-ui/styles";

import CardTable from "./CardTable.js";

const useStyles = makeStyles(theme => ({
	cardStyling: {
		minWidth: 400,
		maxWidth: 400,
		align: "left",
		float: "left",
		margin: theme.spacing,
		height: 300,
		whiteSpace: "normal",
		wordWrap: "break-word"
	}
}));

function getActiveStatus(entity, entityType) {
	if (entityType === "Mechanism") {
		var today = new Date();
		var start = new Date(entity.startDate);
		var end = new Date(entity.endDate);
		if (start <= today && today <= end) {
			return "Active";
		}
		if (today <= start) {
			return "Will be active";
		}
		return "Inactive";
	}

	return undefined;
}

function MechanismCard(props) {
	const theme = useTheme();
	const classes = useStyles();
	var activeStatus = getActiveStatus(props.entity, props.text);
	return (
		<div style={{ display: "inline-block" }}>
			<Card
				className={classes.cardStyling}
				style={{
					backgroundColor:
						typeof activeStatus === "undefined"
							? "#HHHHHH"
							: activeStatus === "Active"
							? theme.okayColor
							: activeStatus === "Will be active"
							? theme.futureColor
							: theme.warningColor
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