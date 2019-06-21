import React from "react";

import TextField from "@material-ui/core/TextField";

function SearchBar(props) {
	return (
		<div>
			<TextField
				id="searchTextInput"
				value={props.searchText}
				placeholder="Search mechanism in DATIM and FACTS info synchronization log"
				onChange={e => props.onSearchTextChange(e.target.value)}
				style={{ fontSize: "12px", width: "500px", padding: "5px" }}
			/>
		</div>
	);
}

export default SearchBar;