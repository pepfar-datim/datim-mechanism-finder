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
        .then(data => {
            if (data.length > 1) {
                _this.setState({
                    data: data,
                    factsText: urlLogic[environment]["factsText"]
                });
                return [data[1], _this];
            } else {
                _this.setState({
                    factsText: "Not " + urlLogic[environment]["factsText"]
                });
                return ["", _this];
            }
        })
        .then(getMechanism);
}

function getMechanism(info) {
    // this is where calls and processing for getting mechanism info will occur
    var _this = info[1];
    _this.setState({ searching: false });
    _this.setState({ datimText: "Not found in DATIM" });
}