import fetch from "node-fetch";
import path from "node:path";

/**
 * @returns {Promise.<String>} path/to/executable
 */
export default async function getPath() {
	let clientSettings = await fetch("https://clientsettingscdn.roblox.com/v2/client-version/WindowsPlayer/channel/LIVE");
	if (clientSettings.ok) {
		const { clientVersionUpload } = await clientSettings.json();
		return path.join(process.env.LOCALAPPDATA, "Roblox\\Versions", clientVersionUpload, "RobloxPlayerBeta.exe");
	} else {
		throw new Error("clientsettingscdn.roblox.com returned", clientSettings.status);
	}
}
