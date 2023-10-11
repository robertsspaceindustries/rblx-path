import fetch from "node-fetch";
import path from "node:path";
import fs from "node:fs";

/**
 * @param {Boolean} checkExistance Error if the executable does not exist
 * @returns {Promise.<String>} path/to/executable
 */
export default async function getPath(checkExistance) {
	let clientSettings = await fetch("https://clientsettingscdn.roblox.com/v2/client-version/WindowsPlayer/channel/LIVE");
	if (clientSettings.ok) {
		const { clientVersionUpload } = await clientSettings.json();
		const executablePath = path.join(process.env.LOCALAPPDATA, "Roblox\\Versions", clientVersionUpload, "RobloxPlayerBeta.exe");

		if (checkExistance && !fs.existsSync(executablePath)) {
			throw new Error(`${executablePath} does not exist`);
		}

		return executablePath;
	} else {
		throw new Error("clientsettingscdn.roblox.com returned", clientSettings.status);
	}
}
