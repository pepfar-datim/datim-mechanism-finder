import React from "react";

import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
	searchBarStyling: {
		fontSize: "12px",
		width: "500px",
		marginLeft: theme.spacing,
	}
}));

function SearchBar(props) {
	const classes = useStyles();
	return (
		<div>
			<TextField
				id="searchBarStyling"
				className={classes.searchBarStyling}
				value={props.searchText}
				placeholder="Search mechanism in DATIM and FACTS info synchronization log"
				onChange={e => props.onSearchTextChange(e.target.value)}
			/>
		</div>
	);
}

export default SearchBar;