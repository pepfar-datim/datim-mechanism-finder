'use strict';

class SettingsLoader {
    constructor(api, BASE_URL) {
        this.api = api;
        this.BASE_URL = BASE_URL;
    }

    getSystemSetting(settingsKey) {
        return this.api.get([this.BASE_URL, 'api', 'systemSettings', settingsKey].join('/'), { cache: true })
            .then(response => response.data)
            .then(data => data === '' ? Promise.reject('No value found for ' + settingsKey) : Promise.resolve(data))
            .catch(error => {
                console && console.error && console.error(['Key', settingsKey, 'not found'].join(' '));
                return Promise.reject(error);
            });
    }
}

export default SettingsLoader;
