export default function partnerFinderState() {
    return {
        currentOrganisationUnit: undefined,
        partnersWithMechanismsInSelectedOU: [],
        foundMechanismsForPartners: new Map(),
        openClosedStatus: new Set(),
        loadingStatus: new Set(),
    };
}
