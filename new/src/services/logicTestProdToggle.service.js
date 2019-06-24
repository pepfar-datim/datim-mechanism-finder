export function logicTestProdToggle(environment, url) {
	if (environment === "production") {
		if (
			/datim\.org$/.test(url) &&
			url != "www.datim.org" &&
			url != "triage.datim.org"
		) {
			return true;
		}
		return false;
	}
	return true;
}