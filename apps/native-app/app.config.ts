import "dotenv/config";
import { ExpoConfig, ConfigContext } from "@expo/config";

enum ENV_ENUM {
	PRODUCTION = "production",
	STAGING = "staging",
	DEVELOPMENT = "development",
}

const bundleConfig = {
	amplitudeApiKey: "5e1972799e8e01ecf44860aeb6525240",
	appEnv: ENV_ENUM.STAGING,
	apiUrl: "https://api-test.alvie.fr",
	logRocketAppId: "zklmfz/hygo-team",
	name: "Hygo (Team)",
	bundleId: "com.alvie.hygo.preview",
	simpleLocalizeURL: "https://cdn.simplelocalize.io/3e08ddc9fe4f48a38e06505208ddca4e/_latest/{{lng}}",
	iconPath: "./src/assets/icon-team.png",
	buildNumber: "469",
	version: "5.1.0",
	sentryDSN: "https://17b2de60ae4644a8937235c9a5d8d8da@o1077021.ingest.sentry.io/6254181",
	sentryProject: "hygo-team",
	dashboardUrl: "test.alvie.fr",
};

if (process.env.NX_ENV === ENV_ENUM.DEVELOPMENT) {
	bundleConfig.appEnv = ENV_ENUM.DEVELOPMENT;
	bundleConfig.name = "Hygo (Dev)";
	bundleConfig.bundleId = "com.alvie.hygo.dev";
	bundleConfig.iconPath = "./src/assets/icon-dev.png";
}

if (process.env.NX_ENV === ENV_ENUM.PRODUCTION) {
	bundleConfig.amplitudeApiKey = "966957b9e0216e6f14089b53205473ff";
	bundleConfig.logRocketAppId = "zklmfz/hygo";
	bundleConfig.appEnv = ENV_ENUM.PRODUCTION;
	bundleConfig.apiUrl = "https://api-prod-blue.alvie.fr";
	bundleConfig.simpleLocalizeURL =
		"https://cdn.simplelocalize.io/3e08ddc9fe4f48a38e06505208ddca4e/_production/{{lng}}";
	bundleConfig.name = "Hygo";
	bundleConfig.bundleId = "com.alvie.hygo";
	bundleConfig.iconPath = "./src/assets/icon.png";
	bundleConfig.sentryDSN = "https://5a5b1dabe0be4df5b7483892bfb466fd@o1077021.ingest.sentry.io/6079598";
	bundleConfig.sentryProject = "hygo";
	bundleConfig.dashboardUrl = "app.alvie.fr";
}

const {
	apiUrl,
	version,
	buildNumber,
	name,
	bundleId,
	iconPath,
	sentryDSN,
	logRocketAppId,
	sentryProject,
	simpleLocalizeURL,
	appEnv,
	amplitudeApiKey,
	dashboardUrl,
} = bundleConfig;

const OTA = "221109";

export default ({ config }: ConfigContext): ExpoConfig => {
	return {
		...config,
		extra: {
			apiUrl,
			appEnv,
			build: buildNumber,
			version,
			dashboardUrl,
			logRocketAppId,
			sentryDSN,
			OTA,
			simpleLocalizeURL,
			amplitudeApiKey,
			googleMapsApiKey: process.env.NX_GOOGLE_MAPS_NATIVE_API,
			eas: {
				projectId: "243e7b9b-baee-4d8b-9f3c-4502ee0cd6ac",
			},
		},
		name,
		slug: "hygo",
		owner: "alvie1",
		privacy: "public",
		platforms: ["ios", "android", "web"],
		version,
		orientation: "portrait",
		icon: iconPath,
		plugins: ["sentry-expo"],
		splash: {
			image: "./src/assets/splash.png",
			resizeMode: "cover",
			backgroundColor: "#2C6465",
		},
		updates: {
			checkAutomatically: "ON_ERROR_RECOVERY",
		},
		runtimeVersion: buildNumber,
		assetBundlePatterns: ["**/*"],
		hooks: {
			postPublish: [
				{
					file: "sentry-expo/upload-sourcemaps",
					config: {
						organization: "alvie",
						project: sentryProject,
						authToken: "f6dcd456d9e14cfeb8b5687a7cb6e9e45b902b512551445ea0b0dcea1be5ee9b",
						release: OTA,
					},
				},
			],
		},
		ios: {
			buildNumber,
			supportsTablet: true,
			bundleIdentifier: bundleId,
			associatedDomains: [`webcredentials:${dashboardUrl}`],
			infoPlist: {
				CFBundleAllowMixedLocalizations: true,
			},
			config: {
				googleMapsApiKey: process.env.NX_GOOGLE_MAPS_NATIVE_API,
			},
		},
		locales: {
			fr: "./src/i18n/pListTranslations/fr.json",
			en: "./src/i18n/pListTranslations/en.json",
			es: "./src/i18n/pListTranslations/es.json",
			pt: "./src/i18n/pListTranslations/pt.json",
			cs: "./src/i18n/pListTranslations/cs.json",
		},
		androidStatusBar: {
			hidden: false,
			translucent: true,
			barStyle: "dark-content",
			backgroundColor: "#FFFFFF",
		},
		notification: {
			icon: iconPath,
			color: "#67dee1",
		},
		android: {
			package: bundleId,
			versionCode: parseInt(buildNumber, 10),
			googleServicesFile: "./google-services.json",
			config: {
				googleMaps: {
					apiKey: process.env.NX_GOOGLE_MAPS_NATIVE_API,
				},
			},
			useNextNotificationsApi: true,
			permissions: [
				"CAMERA",
				"NOTIFICATIONS",
				"READ_EXTERNAL_STORAGE",
				"USE_FINGERPRINT",
				"VIBRATE",
				"WAKE_LOCK",
				"WRITE_EXTERNAL_STORAGE",
				"ACCESS_FINE_LOCATION",
				"ACCESS_COARSE_LOCATION",
				"com.anddoes.launcher.permission.UPDATE_COUNT",
				"com.android.launcher.permission.INSTALL_SHORTCUT",
				"com.google.android.c2dm.permission.RECEIVE",
				"com.google.android.gms.permission.ACTIVITY_RECOGNITION",
				"com.google.android.providers.gsf.permission.READ_GSERVICES",
				"com.htc.launcher.permission.READ_SETTINGS",
				"com.htc.launcher.permission.UPDATE_SHORTCUT",
				"com.majeur.launcher.permission.UPDATE_BADGE",
				"com.sec.android.provider.badge.permission.READ",
				"com.sec.android.provider.badge.permission.WRITE",
				"com.sonyericsson.home.permission.BROADCAST_BADGE",
			],
		},
	};
};
