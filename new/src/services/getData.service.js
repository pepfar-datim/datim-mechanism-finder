import { generateUrlMechanism } from "./getUrl.service";

const urlLogic = {
	prod: { url: "https://sync.datim.org" },
	test: { url: "https://test.sync.datim.org" }
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
				var data = dataToObject(JSON.parse(JSON.stringify(dataArray)));
				_this.setState({
					data: data,
					foundInFACTS: true
				});
				return [dataArray[1], _this];
			} else {
				_this.setState({
					foundInFACTS: false
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
		.then(resp => {
			return resp.json()
		})
		.then(result => {
			return result.categoryOptions[0]
		})
		.then(categoryOption => {
			var foundInDATIM = categoryOption ? true : false;
			_this.setState({ foundInDATIM: foundInDATIM });
			if (categoryOption) {
				_this.setState({ mechanism: categoryOption });
				_this.setState({mechStatus: getActiveStatus(categoryOption)})
				_this.setState({ agency: getEntity(categoryOption, "Agency") });
				_this.setState({
					partner: getEntity(categoryOption, "Partner")
				});
			}
			return true
		})
		.then(finished => {
			_this.setState({ searching: false, showProgress: false })
		})
		.catch(error => {
			_this.setState({
				searching: false,
				showProgress: false,
				foundInDATIM: false
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
	for (let i = 1; i < dataArray.length; i++) {
		var dataTempObject = dataArray[i].reduce(function(
			tempObject,
			value,
			index
		) {
			var newValue = cleanValues(dataArray[0][index], value);
			if (dataArray[0].length > index) {
				tempObject[dataArray[0][index]] = newValue;
			}
			return tempObject;
		},
		{});
		for (let j = Object.keys(dataTempObject).length; j<dataArray[0].length; j++) {
			dataTempObject[dataArray[0][j]] = "-";
		}
		dataArray[i] = dataTempObject;
	}
	return dataArray;
}

function cleanValues(header, value) {
	switch (header) {
		case "Active":
			return parseInt(value) === 1 ? "Active" : "Inactive";
		case "Indigenous Partner":
			return parseInt(value) === 1 ? "Indigenous" : "Non-indigenous";
		default:
			return value === "NULL" ? "-" : value;
	}
}

function getActiveStatus(entity) {
	var today = new Date();
	var start = new Date(entity.startDate);
	var end = new Date(entity.endDate);
	if (start <= today && today <= end) {
		return "Active";
	}
	if (today <= start) {
		return "Will be active in future";
	}
	return "Inactive";
}
