export default class PartnerFinderController {
    constructor(partners, organisationUnits, sqlViewMapper, SQL_VIEW_PARTNERS, partnerFinderState) {
        this.partnerFinderState = partnerFinderState;
        this.foundMechanisms;
        this.partners = partners;
        this.allPartners = partners;
        this.organisationUnits = organisationUnits;
        this.sqlViewMapper = sqlViewMapper;
        this.SQL_VIEW_PARTNERS = SQL_VIEW_PARTNERS;
    }

    changedOrganisationUnit() {
        this.partnerFinderState.partnersWithMechanismsInSelectedOU = this.allPartners
                .filter(partner => {
                    return partner.categoryOptions && partner.categoryOptions.some(categoryOption => categoryOption.organisationUnits && categoryOption.organisationUnits.some(organisationUnit => organisationUnit.id === this.partnerFinderState.currentOrganisationUnit.id))
                })
                .map(partner => {
                    return {
                        id: partner.id,
                        name: partner.name,
                        mechanismCount: partner.categoryOptions && partner.categoryOptions.filter(categoryOption => categoryOption.organisationUnits && categoryOption.organisationUnits.some(organisationUnit => organisationUnit.id === this.partnerFinderState.currentOrganisationUnit.id)).length,
                        mechansisms: partner.categoryOptions.filter(categoryOption => categoryOption.organisationUnits && categoryOption.organisationUnits.some(organisationUnit => organisationUnit.id === this.partnerFinderState.currentOrganisationUnit.id)),
                    };
                });
    }

    partnerClicked(partner) {
        if (this.partnerFinderState.openClosedStatus.has(partner)) {
            this.partnerFinderState.openClosedStatus.delete(partner);
        } else {
            this.partnerFinderState.openClosedStatus.add(partner);
        }

        if (!this.partnerFinderState.foundMechanismsForPartners.has(partner)) {
            this.partnerFinderState.loadingStatus.add(partner);
            this.searchPartner(partner)
                .then(mechanisms => this.partnerFinderState.foundMechanismsForPartners.set(partner, mechanisms))
                .then(mechanisms => {
                    this.partnerFinderState.loadingStatus.delete(partner);
                    return mechanisms;
                });
        }
    }

    searchPartner(partner) {
        if (this.partnerFinderState.currentOrganisationUnit && this.partnerFinderState.currentOrganisationUnit.id && partner && partner.id) {
            return this.sqlViewMapper
                .getData(this.SQL_VIEW_PARTNERS, {
                    organisationUnitId: this.partnerFinderState.currentOrganisationUnit.id,
                    partnerId: partner.id
                });
        }

        return this.$q.resolve([]);
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
