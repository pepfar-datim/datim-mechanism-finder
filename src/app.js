'use strict';
import 'jquery';
import angular from 'angular';

import manifest from 'manifest.webapp!json';

class WhereIsMyMechController {
    constructor($http, $scope, $location) {
        this.headerMap = {
            Date: 'Date',
            OperatingUnit: 'OU',
            FiscalYear: 'FY',
            PlanningReportingCycle: 'Reporting Cycle',
            HQMechanismID: 'HQ ID',
            LegacyMechanismID: 'Legacy ID',
            ImplementingMechanismName: 'IM',
            FundingAgency: 'Funding Agency',
            PrimePartner: 'Prime Partner',
            PrimePartnerID: 'Partner ID',
            StartDate: 'Start Date',
            EndDate: 'End Date',
            Active: 'Active'
        };

        this.myMechanismSearchString = '';
        this.api = $http;
        this.datimInfo = {};
        this.location = $location;

        $scope.$watch(() => this.myMechanismSearchString, (newVal, oldVal) => {
            if (newVal !== oldVal) {
                this.search();
            }
        });

        //Set the predefined search if we have one and run the search against the server
        if ($location.$$search.query) {
            this.myMechanismSearchString = $location.$$search.query;
            this.search();
        }
    }

    setSearchString(value) {
        this.myMechanismSearchString = value.replace(/\"/g, '').trim();
    }

    search() {
        //Reset found flags
        this.foundInDatim = false;
        this.foundInFactsInfo = false;
        this.datimInfo = {};

        this.location.search('query', this.myMechanismSearchString);

        this.api.get('//sync.datim.org:1777/?search=' + this.myMechanismSearchString)
            .then(this.buildResultList.bind(this))
            .then(this.setResultList.bind(this))
            .then((resultList) => {
                if (resultList.length > 0) {
                    this.foundInFactsInfo = true;
                    return resultList[0];
                }
                return [];
            })
            .then(this.loadDATIMMechanism.bind(this));
    }

    buildResultList(response) {
        let lines = response.data;
        let headers = lines.shift();

        return {
            headers: headers,
            lines: lines
                .map(line => {
                    line[line.length - 1] =  parseInt(line[line.length - 1], 10);
                    return line;
                })
        };
    }

    setResultList(resultList) {
        if (!this.headers) {
            this.headers = resultList.headers;
        }
        this.resultList = resultList.lines;

        return this.resultList;
    }

    loadDATIMMechanism(firstRow) {
        if (firstRow) {
            this.datimMechanismCodeToSearch = firstRow[4];
        } else {
            this.datimMechanismCodeToSearch = this.myMechanismSearchString;
        }

        this.api.get('manifest.webapp')
            .then(response => {
                return response.data;
            })
            .then(manifest => {
                return manifest.activities.dhis.href;
            })
            .then(apiUrl => {
                return this.api.get([apiUrl, 'api', 'categoryOptions.json?filter=code:eq:' + this.datimMechanismCodeToSearch + '&fields=:all'].join('/'));
            })
            .then(response => response.data.categoryOptions[0])
            .then(categoryOption => {
                if (categoryOption) {
                    this.foundInDatim = true;
                    this.datimInfo.mechanism = categoryOption;
                }

                if (categoryOption && categoryOption.categoryOptionGroups.length > 0) {
                    this.datimInfo.agency = categoryOption.categoryOptionGroups.filter(categoryOptionGroup => /^Agency_.+/.test(categoryOptionGroup.code)).reduce((current) => current);
                    this.datimInfo.partner = categoryOption.categoryOptionGroups.filter(categoryOptionGroup => /^Partner_.+/.test(categoryOptionGroup.code)).reduce((current) => current);
                }
            });

    }
}

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
        '/dhis-web-commons/font-awesome/css/font-awesome.min.css',
        '/dhis-web-commons/css/menu.css'
    ];
    let headElement = angular.element(document.querySelector('head'));
    stylesheets.forEach(stylesheetUrl => {
        let styleSheetElement = angular.element('<link href="' + window.location.origin + dhis2.settings.baseUrl + stylesheetUrl + '" rel="stylesheet" type="text/css" />');
        angular.element(document.querySelector('head'))
            .append(styleSheetElement);
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

angular.module('whereIsMyMech', ['d2HeaderBar'])
    .controller('WhereIsMyMechController', WhereIsMyMechController);

initMenu()
    .then(() => angular.bootstrap(document.querySelector('html'), ['whereIsMyMech']))
    .catch(() => window.console.log('Failed to bootstrap the app'));
