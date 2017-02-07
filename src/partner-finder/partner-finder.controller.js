export default class PartnerFinderController {
    constructor(partners, organisationUnits, sqlViewMapper, SQL_VIEW_PARTNERS) {
        this.selectedPartner;
        this.selectedOrganisationUnit;
        this.foundMechanisms;
        this.partners = partners;
        this.allPartners = partners;
        this.organisationUnits = organisationUnits;
        this.sqlViewMapper = sqlViewMapper;
        this.SQL_VIEW_PARTNERS = SQL_VIEW_PARTNERS;
    }

    changedOrganisationUnit() {
        this.searchPartners();
    }

    searchPartners() {
        if (this.selectedOrganisationUnit && this.selectedOrganisationUnit.id && this.selectedPartner && this.selectedPartner.id) {
            this.sqlViewMapper
                .getData(this.SQL_VIEW_PARTNERS, {
                    organisationUnitId: this.selectedOrganisationUnit.id,
                    partnerId: this.selectedPartner.id
                })
                .then(mechanisms => {
                    this.foundMechanisms = mechanisms;
                });
        }
    }

    isMechanismActive(mechanism) {
        return new Date(mechanism.startdate) < Date.now() && new Date(mechanism.enddate) > Date.now();
    }

    formatDate(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let dateToFormat = new Date(date);
        return [days[dateToFormat.getDay()], dateToFormat.getDate(), months[dateToFormat.getMonth()], dateToFormat.getFullYear()].join (' ');
    }

    getCodeFromName(mechanismName) {
        let mechanismNumberMatch = mechanismName.match(/\d{1,}/);
        if (mechanismNumberMatch.length) {
            return mechanismNumberMatch[0];
        }
        return mechanismName;
    }
}
