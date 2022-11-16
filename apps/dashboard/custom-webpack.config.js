const getWebpackConfig = require("@nrwl/react/plugins/webpack");
const { merge } = require("webpack-merge");
const SentryCliPlugin = require("@sentry/webpack-plugin");

module.exports = (config, context) => {
	const newConfig = getWebpackConfig(config);
	console.log(process.env.NX_REACT_APP_ENV);
	return merge(newConfig, {
		plugins: [
			new SentryCliPlugin({
				authToken: process.env.NX_SENTRY_AUTH_TOKEN,
				configFile: "sentry.properties",
				org: "alvie",
				project: "dashboard",
				release: `${process.env.NX_REACT_APP_ENV} - ${process.env.NX_REACT_APP_VERSION}`,
				include: ["dist/apps/dashboard"],
				dryRun: process.env.NX_REACT_APP_ENV === "production" || process.env.NX_REACT_APP_ENV === "staging",
				ignore: ["node_modules"],
				urlPrefix: "dist/apps/dashboard",
				rewrite: false,
			}),
		],
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
