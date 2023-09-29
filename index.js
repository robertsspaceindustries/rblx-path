import fetch from "node-fetch";
import path from "node:path";

const hosts = ["https://setup.rbxcdn.com", "https://setup-ak.rbxcdn.com", "https://s3.amazonaws.com/setup.roblox.com"];

/**
 * @returns {Promise.<String>} path/to/executable
 */
export default async function getPath() {
	let version;
	for (const host of hosts) {
		const response = await fetch(host + "/version");
		if (response.ok) {
			version = await response.text();
			break;
		}
	}
	if (!version) {
		throw new Error("No provider available");
	}
	return path.join(process.env.LOCALAPPDATA, "Roblox\\Versions", version, "RobloxPlayerBeta.exe");
}
