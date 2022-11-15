const getWebpackConfig = require("@nrwl/react/plugins/webpack");

module.exports = (webpackConfig) => {
	const config = getWebpackConfig(webpackConfig);

	return {
		...config,
		module: {
			...config.module,
			rules: [
				...config.module.rules,
				{
					test: /\.svg$/,
					use: "url-loader",
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					loader: "file-loader",
				},
			],
		},
	};
};
