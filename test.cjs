#!/usr/bin/env node

import("./index.js").then(({ default: module }) => {
	module().then((path) => {
		console.log(path);
	});
});
