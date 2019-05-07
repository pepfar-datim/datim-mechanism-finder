import React from "react";
import "./App.css";

import SearchBar from "./SearchBar.js";
import EnvironmentSelector from "./EnvironmentSelector.js";
import FoundSummary from "./FoundSummary.js";
import DataTable from "./DataTable.js";
import MechanismCard from "./MechanismCard.js";

import { getData } from "./getData.js";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			environment: "prod",
			timeout: 0,
			data: [],
			searching: true,
			factsText: "",
			datimText: ""
		};
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleEnvironmentChange = this.handleEnvironmentChange.bind(this);
	}

	getData() {
		if (this.state.timeout) clearTimeout(this.state.timeout);
		this.setState({
			searching: true,
			data: "",
			factsText: "",
			datimText: "",
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
			<div className="App">
				<h2>DATIM Mechanism Finder</h2>
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
							factsText={this.state.factsText}
							datimText={this.state.datimText}
						/>
						<div
							className="row"
							style={{ "white-space": "nowrap" }}
						>
							<MechanismCard text="mechanism" />
							<MechanismCard text="more mechanism" />
							<MechanismCard text="mechanism (again)" />
						</div>
						{this.state.data.length > 1 && (
							<DataTable data={this.state.data} />
						)}
					</div>
				)}
			</div>
		);
	}
}

export default App;