import React from 'react';
import './App.css';

import SearchBar from './SearchBar.js';
import EnvironmentSelector from './EnvironmentSelector.js';

import {getData} from './getData.js';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { searchText: '', environment: 'test', timeout: 0, data: '' };
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleEnvironmentChange = this.handleEnvironmentChange.bind(this);
	}

	getData(){
		if(this.state.timeout) clearTimeout(this.state.timeout);
		this.setState({
			data: '',
			timeout: setTimeout(() => {
				getData(this.state.searchText, this.state.environment, this);
			}, 1000)
		})		
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
			<div className='App'>
				<h2>DATIM Mechanism Finder</h2>
				<SearchBar
					searchText={this.state.searchText}
					onSearchTextChange={this.handleSearchChange}
				/>
				<EnvironmentSelector
					environment={this.state.environment}
					onEnvironmentChange={this.handleEnvironmentChange}
				/>
				{this.state.data &&
					<p id='returnedData'>{this.state.data}</p>
				}
			</div>
		);
	}
}

export default App;