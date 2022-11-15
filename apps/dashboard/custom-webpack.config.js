const getWebpackConfig = require("@nrwl/react/plugins/webpack");
const path = require("path");

module.exports = (webpackConfig) => {
	const config = getWebpackConfig(webpackConfig);

	return {
		...config,
		output: {
			...config.output,
			assetModuleFilename: (pathData) => {
				const filepath = path.dirname(pathData.filename).split("/").slice(1).join("/");
				return `${filepath}/[name].[hash][ext][query]`;
			},
		},
		module: {
			...config.module,
			rules: [
				...config.module.rules,
				{
					test: /\.(woff(2)?|ttf|eot)$/,
					type: "asset/resource",
				},
			],
		},
	};
};
