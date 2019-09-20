import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import CardTable from "./CardTable.js";

const theme = require('./theme.js');

class MechanismCard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
		};
	}

	componentDidMount() {
	    var height = this.divElement.clientHeight;
	    var margin = 2 * parseInt(theme.spacing.spacing.replace('px',''));
	    height = height - margin;
	    this.props.setMinHeight(height, margin)
	}

	render() {
		var activeStatus = this.props.mechStatus;
		return (
			<div ref={ (divElement) => this.divElement = divElement} style={{ display: "inline-block" }}>
				<Card
					style={{
						minWidth: 400,
						maxWidth: 400,
						align: "left",
						float: "left",
						margin: theme.spacing.spacing,
						minHeight: this.props.cardHeight,
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
								{this.props.text}
							</Typography>
							<CardTable
								entity={this.props.entity}
								entityType={this.props.text}
								activeStatus={activeStatus}
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}
}

export default MechanismCard;
