#!/usr/bin/env node

import("./index.js").then((module) => module.default().then(console.log));
