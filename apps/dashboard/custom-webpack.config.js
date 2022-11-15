const getWebpackConfig = require("@nrwl/react/plugins/webpack");

module.exports = (webpackConfig) => {
	const config = getWebpackConfig(webpackConfig);
	console.log(config.module.rules);
	return {
		...config,
		output: {
			...config.output,
			assetModuleFilename: "assets/[hash][ext]",
		},
		module: {
			...config.module,
			rules: [
				...config.module.rules,
				{
					test: /\.(woff(2)?|ttf|eot)$/,
					type: "asset/resource",
					generator: {
						filename: "./assets/fonts/[name][ext]",
					},
				},
			],
		},
	};
};
