import React from "react";

import TextField from "@material-ui/core/TextField";

const theme = require('./theme.js');


function SearchBar(props) {

	return (
		<div>
			<TextField
				id="searchBarStyling"
				style={{
					fontSize: "12px",
					width: "500px",
					marginLeft: theme.spacing.spacing
				}}
				value={props.searchText}
				placeholder="Search mechanism in DATIM and FACTS info synchronization log"
				onChange={e => props.onSearchTextChange(e.target.value)}
			/>
		</div>
	);
}

export default SearchBar;