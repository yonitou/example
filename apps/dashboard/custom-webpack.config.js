const getWebpackConfig = require("@nrwl/react/plugins/webpack");
const path = require("path");

module.exports = (webpackConfig) => {
	const config = getWebpackConfig(webpackConfig);

	return {
		...config,
		output: {
			...config.output,
		},
		module: {
			...config.module,
			rules: [
				...config.module.rules.filter((r) => r.type !== "asset"),
				{
					test: /\.(woff(2)?|ttf|eot)$/,
					type: "asset/resource",
					generator: {
						filename: "./assets/fonts/[name].[hash][ext]",
					},
				},
				{
					test: /\.(bmp|png|jpe?g|gif|webp|avif)$/,
					type: "asset",
					parser: { dataUrlCondition: { maxSize: 10000 } },
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
