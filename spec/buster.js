var config = module.exports;

config["My tests"] = {
	"deps": ["lib/object.js", "lib/buster-extend.js"],

	"environment": "browser",
	"rootPath": "..",
	"sources": [
		"lib/tree.js"
	],

	"tests": [
		"spec/*-test.js"
	]
};