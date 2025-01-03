const path = require("path");
const fs = require("fs");

module.exports = {
	meta: {
		type: "suggestion",
		docs: {
			description: "Enforce hexagonal architecture folder structure for marked modules",
			category: "Architecture",
			recommended: true,
		},
		schema: [
			{
				type: "object",
				properties: {
					srcPath: { type: "string" },
					markerFile: { type: "string" },
					requiredLayers: {
						type: "array",
						items: { type: "string" },
					},
				},
			},
		],
	},

	create(context) {
		const options = context.options[0] || {};
		const srcPath = options.srcPath || "src";
		const markerFile = options.markerFile || ".hexagonal";
		const requiredLayers = options.requiredLayers || ["application", "domain", "infrastructure"];

		function validateHexagonalStructure(filePath) {
			const absoluteSrcPath = path.resolve(process.cwd(), srcPath);

			if (!fs.existsSync(absoluteSrcPath)) {
				return;
			}

			const modules = fs.readdirSync(absoluteSrcPath).filter((file) => {
				const modulePath = path.join(absoluteSrcPath, file);
				return fs.statSync(modulePath).isDirectory() && fs.existsSync(path.join(modulePath, markerFile));
			});

			// Rest of the validation logic remains the same
			// ... (previous validation code)
		}

		return {
			Program(node) {
				validateHexagonalStructure(context.getFilename());
			},
		};
	},
};
