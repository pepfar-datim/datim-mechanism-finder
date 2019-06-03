import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function getActiveStatus(entity, entityType) {
	if (entityType === "Mechanism") {
		var today = new Date();
		var start = new Date(entity.startDate);
		var end = new Date(entity.endDate);
		if (start <= today && today <= end) {
			return true;
		}
		return false;
	}

	return undefined;
}

function formatDate(date) {
	if (typeof date === "string") {
		return date.substring(0, 10);
	}
}

function generateTable(entity, entityType, activeStatus) {
	return (
		<div>
			<p>
				<strong>name:</strong> {entity.name}
			</p>
			<p>
				<strong>code:</strong> {entity.code}
			</p>
			{entityType !== "Mechanism" && (
				<p>
					<strong>created:</strong> {formatDate(entity.created)}
				</p>
			)}
			{entityType === "Mechanism" && (
				<p>
					<strong>start:</strong> {formatDate(entity.startDate)}
				</p>
			)}
			{entityType === "Mechanism" && (
				<p>
					<strong>end:</strong> {formatDate(entity.endDate)}
				</p>
			)}
			{entityType === "Mechanism" && (
				<p>
					<strong>status:</strong>{" "}
					{activeStatus ? "Active" : "Inactive"}
				</p>
			)}
			<p>
				<strong>last updated:</strong> {formatDate(entity.lastUpdated)}
			</p>
		</div>
	);
}

function MechanismCard(props) {
	var activeStatus = getActiveStatus(props.entity, props.text);
	return (
		<div style={{ display: "inline-block" }}>
			<Card
				style={{
					minWidth: 400,
					maxWidth: 400,
					float: "left",
					margin: 10,
					height: 250,
					whiteSpace: "normal",
					wordWrap: "break-word",
					backgroundColor:
						typeof activeStatus === "undefined"
							? "#HHHHHH"
							: activeStatus
							? "#A5D6A7"
							: "#EF9A9A"
				}}
			>
				<CardContent>
					<div>
						<Typography variant="h5" gutterBottom>
							{props.text}
						</Typography>
						{generateTable(props.entity, props.text, activeStatus)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default MechanismCard;