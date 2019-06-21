import React from "react";
import "./Main.css";

import SearchBar from "./SearchBar.js";
import EnvironmentSelector from "./EnvironmentSelector.js";
import FoundSummary from "./FoundSummary.js";
import DataTable from "./DataTable.js";
import DataReactTable from "./DataReactTable.js";
import MechanismCard from "./MechanismCard.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { ThemeProvider } from '@material-ui/styles';

import { getData } from "../services/getData.service.js";

const theme = {
  warningColor: '#ffcdd2',
  okayColor: '#c8e6c9',
  futureColor: '#c5e3fc'
  ,
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
			partner: ""
		};
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleEnvironmentChange = this.handleEnvironmentChange.bind(this);
	}

	getData() {
		if (this.state.timeout) clearTimeout(this.state.timeout);
		this.setState({
			searching: true,
			data: "",
			foundInDATIM: false,
			foundInFACTS: false,
			mechanism: "",
			agency: "",
			partner: "",
			timeout: setTimeout(() => {
				getData(this.state.searchText, this.state.environment, this);
			}, 1000)
		});
	}

	handleEnvironmentChange(text) {
		this.setState({ environment: text });
		this.getData();
	}

	handleSearchChange(text) {
		this.setState({ searchText: text });
		this.getData();
	}

	render() {
		return (
			<ThemeProvider theme={theme}>
				<div>
					<Typography variant="h4" gutterBottom>
						DATIM Mechanism Finder
					</Typography>
					<SearchBar
						searchText={this.state.searchText}
						onSearchTextChange={this.handleSearchChange}
					/>
					<EnvironmentSelector
						environment={this.state.environment}
						onEnvironmentChange={this.handleEnvironmentChange}
					/>
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
									style={{ whiteSpace: "nowrap", align: "left" }}
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