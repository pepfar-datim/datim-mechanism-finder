export function logicTestProdToggle(environment, host) {
	if (environment === "production") {
		if (
			/datim\.org$/.test(host) &&
			host !== "www.datim.org" &&
			host !== "triage.testing.datim.org"
		) {
			return true;
		}
		return false;
	}
	return true;
}