import devServerConfig from "../config/serverConfig.dev";
import prodServerConfig from "../config/serverConfig.prod";

let serverConfig;
if (process.env.NODE_ENV === "production") serverConfig = prodServerConfig;
else serverConfig = devServerConfig;

export function generateUrlMechanism(mechanismCode) {
	const endpoint =
		"categoryOptions.json?paging=false&fields=:owner,displayName,name,categories[:owner],categoryOptionCombos[:owner],categoryOptionGroups[:owner],organisationUnits[:owner]";
	const filter = "filter=code:eq:" + mechanismCode;
	return serverConfig.baseUrl + endpoint + "&" + filter;
}

export function generateUrlD2(){
    return `${serverConfig.baseUrl}`
}