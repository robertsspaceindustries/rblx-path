import fetch from "node-fetch";
import path from "node:path";

const mirrors = ["https://setup.rbxcdn.com", "https://setup-ak.rbxcdn.com", "https://s3.amazonaws.com/setup.roblox.com"];

/**
 * @returns {Promise.<String>} path/to/executable
 */
export default async function getPath() {
	let version;
	for (const mirror of mirrors) {
		const response = await fetch(mirror + "/version");
		if (response.ok) {
			version = await response.text();
			break;
		}
	}
	if (!version) {
		throw new Error("No mirror available");
	}
	return path.join(process.env.LOCALAPPDATA, "Roblox\\Versions", version, "RobloxPlayerBeta.exe");
}
