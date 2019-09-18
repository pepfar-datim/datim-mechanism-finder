import React from "react";
import "./Main.css";

import SearchBar from "./SearchBar.js";
import EnvironmentSelector from "./EnvironmentSelector.js";
import FoundSummary from "./FoundSummary.js";
import DataReactTable from "./DataReactTable.js";
import MechanismCard from "./MechanismCard.js";
import ProgressNote from "./ProgressNote.js";
import Typography from "@material-ui/core/Typography";

import { getData } from "../services/getData.service.js";
import { logicTestProdToggle } from "../services/logicTestProdToggle.service.js";

import { withStyles } from "@material-ui/styles";

const theme = require('./theme.js');


const styles = {
    root: {
        paddingTop: "10px",
        paddingBottom: "10px",
        margin: "10px"
    },
};

class Main extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			environment: "prod",
			timeout: 0,
			data: [],
			searching: true,
			foundInDATIM: false,
			foundInFACTS: false,
			mechStatus: '',
			mechanism: "",
			agency: "",
			partner: "",
			showProgress: false,
			toggleEnvironment: logicTestProdToggle(process.env.NODE_ENV,window.location.host)
		};
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleEnvironmentChange = this.handleEnvironmentChange.bind(this);
		this.setMinHeight = this.setMinHeight.bind(this);
	}

	retrieveData() {
		if (this.state.timeout) clearTimeout(this.state.timeout);
		this.setState({
			searching: true,
			showProgress: false,
			data: "",
			foundInDATIM: false,
			foundInFACTS: false,
			mechanism: "",
			agency: "",
			partner: "",
			cardHeight: 320,
			timeout: setTimeout(() => {
				getData(this.state.searchText, this.state.environment, this);
				this.setState({ showProgress: true });
			}, 1000) 
		});
	}

	handleEnvironmentChange(text) {
		this.setState({ environment: text });
		this.retrieveData();
	}

	handleSearchChange(text) {
		this.setState({ searchText: text });
		this.retrieveData();
	}

	setMinHeight(renderedHeight, margin) {
		if (renderedHeight > this.state.cardHeight) {
			renderedHeight += margin; //add back margin
			this.setState({cardHeight: renderedHeight})
		}
	}

	render() {
		return (
			<div className={this.props.classes.root}>
				<Typography
					variant="h5"
					gutterBottom
					style={{ marginLeft: theme.spacing.spacing }}
				>
					DATIM Mechanism Finder
				</Typography>
				<SearchBar
					searchText={this.state.searchText}
					onSearchTextChange={this.handleSearchChange}
				/>
				{this.state.toggleEnvironment && (
					<EnvironmentSelector
						environment={this.state.environment}
						onEnvironmentChange={this.handleEnvironmentChange}
					/>
				)}
				{this.state.showProgress && (
					<ProgressNote text={this.state.searchText} />
				)}

				{!this.state.searching && (
					<div>
						<FoundSummary
							foundInFACTS={this.state.foundInFACTS}
							foundInDATIM={this.state.foundInDATIM}
						/>
						{(this.state.mechanism ||
							this.state.agency ||
							this.state.partner) && (
							<div
								className="row"
								style={{
									whiteSpace: "nowrap",
									align: "left"
								}}
							>
								<MechanismCard
									text="Mechanism"
									entity={this.state.mechanism}
									mechStatus={this.state.mechStatus}
									cardHeight={this.state.cardHeight}
									setMinHeight={this.setMinHeight}
								/>
								<MechanismCard
									text="Agency"
									entity={this.state.agency}
									mechStatus={this.state.mechStatus}
									cardHeight={this.state.cardHeight}
									setMinHeight={this.setMinHeight}
								/>
								<MechanismCard
									text="Partner"
									entity={this.state.partner}
									mechStatus={this.state.mechStatus}
									cardHeight={this.state.cardHeight}
									setMinHeight={this.setMinHeight}
								/>
							</div>
						)}
						{this.state.data.length > 1 && (
							<DataReactTable data={this.state.data} />
						)}
					</div>
				)}
			</div>
		);
	}
}

export default withStyles(styles)(Main);
