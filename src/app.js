import 'jquery';
import angular from 'angular';
import 'angular-route';
import 'ui-select';
import 'style-loader!css-loader!normalize.css';
import './app.sass';
import 'style-loader!css-loader!ui-select/dist/select.css';
import MechanismFinderController from './mechanism-finder/mechanism-finder.controller';
import PartnerFinderController from './partner-finder/partner-finder.controller';
import SqlViewMapper from './sql-view/SqlViewMapper'
import SettingsLoader from './settings/SettingsLoader'

let developmentHeaders = {};
if (process.env.NODE_ENV === 'development') {
    developmentHeaders = require('../developmentHeaders.js');
}

function preloadOrganisationUnitsAndPartners($http, DHIS_BASE_URL, objectCache) {
    console.log('running the run');
    const partnersRequest = $http.get([
        DHIS_BASE_URL,
        'api',
        'categoryOptionGroupSets',
        'BOyWrF33hiR.json?fields=categoryOptionGroups[id,name,code]&paging=false'
    ].join('/'), {cache: true})
    .then((response) => response.data)
    .then((data) => data && data.categoryOptionGroups)
    .then(data => data.sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0 ))
    .then(units => (console.log(units), units))
    .catch(() => []);

    const organisationUnitsUrl = [DHIS_BASE_URL, 'api', 'organisationUnits.json?fields=name,id&level=3&paging=false'].join('/');
    const organisationUnitsRequest = $http.get(organisationUnitsUrl, { cache: true })
        .then((response) => response.data)
        .then((data) => data && data.organisationUnits)
        .then(data => data.sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0))
        .catch((e) => {
            window.console.log(e);
            return [];
        });

    objectCache.set('partners', partnersRequest);
    objectCache.set('organisationUnits', organisationUnitsRequest);
}

function objectCache() {
    const cache = new Map();
    
    return cache;
}

function initMenu() {
    return jQuery.getJSON('manifest.webapp');
}

angular.module('whereIsMyMech', ['ngRoute', 'ui.select'])
    .controller('MechanismFinderController', MechanismFinderController)
    .controller('PartnerFinderController', PartnerFinderController)
    .controller('AppController', function ($scope) {
        $scope.$on('$routeChangeSuccess', (event, toState) => {
            this.route = toState.originalPath;
        });
    })
    .service('settingsLoader', ['$http', 'DHIS_BASE_URL', SettingsLoader])
    .service('sqlViewMapper', ['$http', 'DHIS_BASE_URL', SqlViewMapper])
    .constant('SQL_VIEW_PARTNERS_SYSTEM_SETTING', 'keyAPP_MechanismFinder-PartnerSQLView')
    .config($httpProvider => {
        if (process.env.NODE_ENV === 'development') {
            $httpProvider.interceptors.push(($q) => {
                return {
                    request(config) {
                        if (config.url && /^https:\/\/test.datim.org/.test(config.url)) {
                            config.headers = Object.assign({}, config.headers, developmentHeaders);
                        }
                        return config;
                    },
                };
            });
        }
    })
    .factory('objectCache', objectCache)
    .run(preloadOrganisationUnitsAndPartners)
    .config($routeProvider => {
        $routeProvider
            .when('/partner-finder', {
                controller: 'PartnerFinderController',
                controllerAs: 'partnerFinder',
                templateUrl: 'partner-finder/partner-finder.tmpl.html',
                reloadOnSearch: false,
                resolve: {
                    partners: (objectCache) => objectCache.get('partners'),
                    organisationUnits: (objectCache) => objectCache.get('organisationUnits'),
                    SQL_VIEW_PARTNERS: (settingsLoader, SQL_VIEW_PARTNERS_SYSTEM_SETTING, $q) => {
                        return settingsLoader.getSystemSetting(SQL_VIEW_PARTNERS_SYSTEM_SETTING)
                            .then(data => data.value)
                            .catch(e => {
                                window.console.error(e);
                                return $q.reject('Unable to load the id of the required SQLView');
                            });
                    }
                }
            })
            .when('/mechanism-finder', {
                controller: 'MechanismFinderController',
                controllerAs: 'wimm',
                templateUrl: 'mechanism-finder/mechanism-finder.tmpl.html',
                reloadOnSearch: false
            })
            .otherwise('/mechanism-finder');
    });

initMenu()
    .then((manifest) => {
        angular.module('whereIsMyMech')
            .constant('DHIS_BASE_URL', process.env.NODE_ENV === 'production' ? manifest.activities.dhis.href : 'https://test.datim.org');
    })
    .then(() => angular.bootstrap(document.querySelector('html'), ['whereIsMyMech']))
    .catch((e) => window.console.log('Failed to bootstrap the app', e));
