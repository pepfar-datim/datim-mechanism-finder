'use strict';

class SqlViewMapper {
    constructor(api, BASE_URL) {
        this.api = api;
        this.BASE_URL = BASE_URL;
    }

    getData(sqlViewID, variables) {
        const sqlViewUrl = [this.BASE_URL, 'api', 'sqlViews', sqlViewID, 'data.json'].join('/');

        let queryParams = Object.keys(variables)
            .map(key => ['var=', key, ':', variables[key]].join(''))
            .join('&');

        return this.api.get([sqlViewUrl, queryParams].join('?'))
            .then(response => response.data || {})
            .then(data => {
                let { headers, rows } = data;

                return (rows || []).map(dataRow => {
                    let dataObject = {};
                    (headers || []).forEach((header, index) => {
                        dataObject[header.name] = dataRow[index];
                    });
                    return dataObject;
                });
            })
            .catch(error => {
                console.error && console.error(error);
                return [];
            });
    }
}

export default SqlViewMapper;
