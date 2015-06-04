'use strict';

import 'jquery';
import angular from 'angular';
import 'angular-route';
import 'angular-ui-select';

import manifest from 'manifest.webapp!json';

import MechanismFinderController from 'mechanism-finder/mechanism-finder.controller';
import PartnerFinderController from 'partner-finder/partner-finder.controller';
import SqlViewMapper from 'sql-view/SqlViewMapper'
import SettingsLoader from 'settings/SettingsLoader'

function initMenu() {
    //Setup dhis2 global for the menu
    window.dhis2 = window.dhis2 || {};
    dhis2.settings = dhis2.settings || {};
    dhis2.settings.baseUrl = manifest.activities.dhis.href.replace(window.location.origin, '').replace(/^\//, '');

    System.config({
        paths: {
            'commons:*': window.location.origin + '/' + dhis2.settings.baseUrl + '/dhis-web-commons/javascripts/dhis2/*.js'
        }
    });
    let menuFiles = [
        'dhis2.translate',
        'dhis2.menu',
        'dhis2.menu.ui'
    ];

    let stylesheets = [
        'dhis-web-commons/font-awesome/css/font-awesome.min.css',
        'dhis-web-commons/css/menu.css'
    ];
    let headElement = angular.element(document.querySelector('head'));
    stylesheets.forEach(stylesheetUrl => {
        let styleSheetElement = angular.element('<link href="' + [window.location.origin, dhis2.settings.baseUrl, stylesheetUrl].join('/') + '" rel="stylesheet" type="text/css" />');
        headElement.append(styleSheetElement);
    });

    return new Promise(function (resolve, reject) {
        let result = Promise.resolve([]);
        menuFiles.forEach(menuFile => {
                result = result.then(function () {
                return System.import('commons:' + menuFile);
            });
        });

        resolve(result);
    });
}

angular.module('whereIsMyMech', ['ngRoute', 'ui.select', 'd2HeaderBar'])
    .controller('MechanismFinderController', MechanismFinderController)
    .controller('PartnerFinderController', PartnerFinderController)
    .controller('AppController', function ($scope) {
        $scope.$on('$routeChangeSuccess', (event, toState) => {
            this.route = toState.originalPath;
        });
    })
    .service('settingsLoader', ['$http', 'DHIS_BASE_URL', SettingsLoader])
    .service('sqlViewMapper', ['$http', 'DHIS_BASE_URL', SqlViewMapper])
    .constant('DHIS_BASE_URL', manifest.activities.dhis.href)
    .constant('SQL_VIEW_PARTNERS_SYSTEM_SETTING', 'keyAPP_MechanismFinder-PartnerSQLView')
    .config($routeProvider => {
        $routeProvider
            .when('/partner-finder', {
                controller: 'PartnerFinderController',
                controllerAs: 'partnerFinder',
                templateUrl: 'partner-finder/partner-finder.tmpl.html',
                reloadOnSearch: false,
                resolve: {
                    partners: ($http, DHIS_BASE_URL) => {
                        return $http.get([
                            DHIS_BASE_URL,
                            'api',
                            'categoryOptionGroupSets',
                            'BOyWrF33hiR.json?fields=categoryOptionGroups[id,name,code]&paging=false'
                        ].join('/'), {cache: true})
                        .then((response) => response.data)
                        .then((data) => data && data.categoryOptionGroups)
                        .then(data => data.sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0 ))
                        .catch(() => []);
                    },

                    organisationUnits: ($http, DHIS_BASE_URL) => {
                        return $http.get([
                            DHIS_BASE_URL,
                            'api',
                            'organisationUnits.json?fields=name,id&level=3&paging=false'
                        ].join('/'), {cache: true})
                            .then((response) => response.data)
                            .then((data) => data && data.organisationUnits)
                            .then(data => data.sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0 ))
                            .catch((e) => {
                                window.console.log(e);
                                return [];
                            });
                    },
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
    .then(() => angular.bootstrap(document.querySelector('html'), ['whereIsMyMech']))
    .catch(() => window.console.log('Failed to bootstrap the app'));
