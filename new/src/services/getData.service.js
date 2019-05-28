import { generateUrlMechanism } from "./getUrl.service";

const urlLogic = {
	prod: { url: "https://sync.datim.org", factsText: "Found in FACTS Info" },
	test: {
		url: "https://test.sync.datim.org",
		factsText: "Found in FACTS Info test feed"
	}
};

export function getData(searchText, environment, _this) {
	fetch(urlLogic[environment]["url"] + "?search=" + searchText, {
		headers: { Accept: "application/json; charset=UTF-8" },
		mode: "cors"
	})
		.then(response => {
			return response.text();
		})
		.then(text => {
			return JSON.parse(text);
		})
		.then(dataArray => {
			if (dataArray.length > 1) {
				var data = dataToObject(JSON.parse(JSON.stringify(dataArray)))
				_this.setState({
					data: data,
					factsText: urlLogic[environment]["factsText"]
				});
				return [dataArray[1], _this];
			} else {
				_this.setState({
					factsText: "Not " + urlLogic[environment]["factsText"]
				});
				return ["", _this];
			}
		})
		.then(getMechanism)
		.catch(error => {
			console.log(error);
		});
}

function getMechanism(info) {
	// this is where calls and processing for getting mechanism info will occur
	var _this = info[1];
	var mechanismCode = info[0] ? info[0][4] : _this.state.searchText;

	var url = generateUrlMechanism(mechanismCode);

	fetch(url, { credentials: "include" })
		.then(resp => resp.json())
		.then(result => result.categoryOptions[0])
		.then(categoryOption => {
			_this.setState({ searching: false });
			var datimText = categoryOption
				? "Found in DATIM"
				: "Not found in DATIM";
			_this.setState({ datimText: datimText });
			if (categoryOption) {
				_this.setState({ mechanism: categoryOption });
				_this.setState({ agency: getEntity(categoryOption, "Agency") });
				_this.setState({
					partner: getEntity(categoryOption, "Partner")
				});
			}
		})
		.catch(error => {
			_this.setState({
				searching: false,
				datimText: "Not found in DATIM: search error"
			});
			console.log(error);
		});
}

function getEntity(categoryOption, entityType) {
	var entityRe = new RegExp("^" + entityType + "_.+");
	var entity = categoryOption.categoryOptionGroups
		.filter(categoryOptionGroup => entityRe.test(categoryOptionGroup.code))
		.reduce(current => current);
	return entity;
}

function dataToObject(dataArray) {

	for(let i=1; i<dataArray.length; i++){
		var dataTempObject = dataArray[i].reduce(function (tempObject, value, index) {
	  		tempObject[dataArray[0][index]] = value;
	  		return tempObject;
		}, {});
		dataArray[i] = dataTempObject	
	}
	return dataArray
}