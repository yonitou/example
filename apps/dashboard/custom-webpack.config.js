const getWebpackConfig = require("@nrwl/react/plugins/webpack");

module.exports = (webpackConfig) => {
	const config = getWebpackConfig(webpackConfig);

	return {
		...config,
		output: {
			...config.output,
			assetModuleFilename: "assets/[name][ext]",
		},
		module: {
			...config.module,
			rules: [
				...config.module.rules,
				{
					test: /\.(woff(2)?|ttf|eot)$/,
					type: "asset/resource",
					generator: {
						filename: "./fonts/[name][ext]",
					},
				},
			],
		},
	};
};
