const getWebpackConfig = require("@nrwl/react/plugins/webpack");
const { merge } = require("webpack-merge");

module.exports = (config, context) => {
	const newConfig = getWebpackConfig(config);
	return merge(newConfig, {
		module: {
			rules: [
				{
					test: /\.(woff(2)?|ttf|eot)$/,
					type: "asset/resource",
				},
			],
		},
	});
};
