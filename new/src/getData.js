export function getData(searchText, environment, _this) {

	const urlLogic = {
		prod: {url:'https://sync.datim.org', factsText:'Found in FACTS Info'},
		test: {url:'https://test.sync.datim.org', factsText:'Found in FACTS Info test feed'}
	};

    fetch(urlLogic[environment]['url'] + '?search=' + searchText,{
    headers: {'Accept': 'application/json; charset=UTF-8'}, mode: 'cors'
	})
    .then(response => {
    	response.text()
    	.then(text => {
    		_this.setState({data: text})
    	})
	})
}