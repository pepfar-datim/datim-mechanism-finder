import React from "react";

import TextField from "@material-ui/core/TextField";

function SearchBar(props) {
	return (
		<div>
			<TextField
				id="searchTextInput"
				value={props.searchText}
				onChange={e => props.onSearchTextChange(e.target.value)}
				style={{ fontSize: "12px", width: "500px", padding: "5px" }}
			/>
		</div>
	);
}

export default SearchBar;