import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

const rowStyling = {
		height: "30px"
	}

function formatDate(date) {
	if (typeof date === "string") {
		return date.substring(0, 10);
	}
}

function CardTable(props) {
	return (
		<Table style={{whiteSpace: "pre-line"}}>
			<TableBody>
				<TableRow
					style={rowStyling}
					hover={true}
					key={"name.row"}
				>
					<TableCell key="name.name" style={{"width":"60px"}}>
						<Typography variant="body1" gutterBottom>
							name
						</Typography>
					</TableCell>
					<TableCell key="name.value">
						<Typography variant="body1" gutterBottom>
							{props.entity.name}
						</Typography>
					</TableCell>
				</TableRow>
				<TableRow
					style={rowStyling}
					hover={true}
					key={"code.row"}
				>
					<TableCell key="code.name" style={{"width":"60px"}}>
						<Typography variant="body1" gutterBottom>
							code
						</Typography>
					</TableCell>
					<TableCell key="code.value">
						<Typography variant="body1" gutterBottom>
							{props.entity.code}
						</Typography>
					</TableCell>
				</TableRow>

				<TableRow
					style={rowStyling}
					hover={true}
					key={"lastUpdated.row"}
				>
					<TableCell key="lastUpdated.name" style={{"width":"62px"}}>
						<Typography variant="body1" gutterBottom>
							{"last\nupdated"}
						</Typography>
					</TableCell>
					<TableCell key="lastUpdated.value">
						<Typography variant="body1" gutterBottom>
							{formatDate(props.entity.lastUpdated)}
						</Typography>
					</TableCell>
				</TableRow>
				{props.entityType !== "Mechanism" && (
					<TableRow
						style={rowStyling}
						hover={true}
						key={"created.row"}
					>
						<TableCell key="created.name" style={{"width":"60px"}}>
							<Typography variant="body1" gutterBottom>
								created
							</Typography>
						</TableCell>
						<TableCell key="created.value">
							<Typography variant="body1" gutterBottom>
								{formatDate(props.entity.created)}
							</Typography>
						</TableCell>
					</TableRow>
				)}
				{props.entityType === "Mechanism" && (
					<TableRow
						style={rowStyling}
						hover={true}
						key={"startDate.row"}
					>
						<TableCell key="startDate.name" style={{"width":"60px"}}>
							<Typography variant="body1" gutterBottom>
								start date
							</Typography>
						</TableCell>
						<TableCell key="startDate.value">
							<Typography variant="body1" gutterBottom noWrap>
								{formatDate(props.entity.startDate)}
							</Typography>
						</TableCell>
					</TableRow>
				)}
				{props.entityType === "Mechanism" && (
					<TableRow
						style={rowStyling}
						hover={true}
						key={"endDate.row"}
					>
						<TableCell key="end.name" style={{"width":"60px"}}>
							<Typography variant="body1" gutterBottom inline>
								end date
							</Typography>
						</TableCell>
						<TableCell key="lastupdated.value">
							<Typography variant="body1" gutterBottom>
								{formatDate(props.entity.endDate)}
							</Typography>
						</TableCell>
					</TableRow>
				)}
				{props.entityType === "Mechanism" && (
					<TableRow
						style={rowStyling}
						hover={true}
						key={"status.row"}
					>
						<TableCell key="activeStatus.name" style={{"width":"60px"}}>
							<Typography variant="body1" gutterBottom>
								active
							</Typography>
						</TableCell>
						<TableCell key="activeStatus.value">
							<Typography variant="body1" gutterBottom>
								{props.activeStatus}
							</Typography>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}

export default CardTable;