import Constants from "expo-constants";
import * as Localization from "expo-localization";
import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

type ModuleType = "backend" | "logger" | "languageDetector" | "postProcessor" | "i18nFormat" | "formatter" | "3rdParty";

const languageDetector = {
	type: "languageDetector" as ModuleType,
	async: true,
	detect: (callback: (locale: string) => void) => {
		callback(Localization.locale.split("-")[0]);
	},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	init: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	cacheUserLanguage: () => {},
};

export const initTranslations = async (): Promise<void> => {
	await i18n
		.use(Backend)
		.use(languageDetector)
		.use(initReactI18next)
		.init({
			fallbackLng: "en",
			backend: {
				loadPath: Constants.manifest.extra.simpleLocalizeURL,
			},
			react: {
				useSuspense: false,
			},
		});
};
