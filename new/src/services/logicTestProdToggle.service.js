export function logicTestProdToggle(environment, host) {
	console.log(environment);
	console.log(host)
	if (environment === "production") {
		console.log(/datim\.org$/.test(host));
		if (
			/datim\.org$/.test(host) &&
			host !== "www.datim.org" &&
			host !== "triage.datim.org"
		) {
			return true;
		}
		return false;
	}
	return true;
}