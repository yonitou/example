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
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: "asset/resource",
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: "asset/resource",
				},
			],
		},
	};
};
