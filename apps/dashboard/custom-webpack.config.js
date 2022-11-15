const getWebpackConfig = require("@nrwl/react/plugins/webpack");
const path = require("path");

module.exports = (webpackConfig) => {
	const config = getWebpackConfig(webpackConfig);
	console.log("test", config.ouput);
	return {
		...config,
		output: {
			...config.output,
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
				{
					test: /\.(png|jpg|svg|gif)/,
					type: "asset/resource",
					generator: {
						filename: (pathData) => {
							const filepath = path.dirname(pathData.filename).split("/").slice(1).join("/");
							return `${filepath}/[name].[hash][ext][query]`;
						},
					},
				},
			],
		},
	};
};
