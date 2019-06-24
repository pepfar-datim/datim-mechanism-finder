import React from "react";
import "./Main.css";

import SearchBar from "./SearchBar.js";
import EnvironmentSelector from "./EnvironmentSelector.js";
import FoundSummary from "./FoundSummary.js";
import DataTable from "./DataTable.js";
import DataReactTable from "./DataReactTable.js";
import MechanismCard from "./MechanismCard.js";
import ProgressNote from "./ProgressNote.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { ThemeProvider } from "@material-ui/styles";

import { getData } from "../services/getData.service.js";
import { logicTestProdToggle } from "../services/logicTestProdToggle.service.js";

const theme = {
	warningColor: "#ffcdd2",
	okayColor: "#c8e6c9",
	futureColor: "#c5e3fc",
	grey: "#4a5768",
	spacing: "10px"
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
			mechanism: "",
			agency: "",
			partner: "",
			showProgress: false,
			toggleEnvironment: logicTestProdToggle(process.env.NODE_ENV,window.location.href)
		};
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleEnvironmentChange = this.handleEnvironmentChange.bind(this);
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

	render() {
		return (
			<ThemeProvider theme={theme}>
				<div>
					<Typography
						variant="h5"
						gutterBottom
						style={{ marginLeft: theme.spacing }}
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
									/>
									<MechanismCard
										text="Agency"
										entity={this.state.agency}
									/>
									<MechanismCard
										text="Partner"
										entity={this.state.partner}
									/>
								</div>
							)}
							{this.state.data.length > 1 && (
								<DataReactTable data={this.state.data} />
							)}
						</div>
					)}
				</div>
			</ThemeProvider>
		);
	}
}

export default Main;
