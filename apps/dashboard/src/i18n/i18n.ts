import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const simpleLocalizeEnvironment = process.env.NX_ENV === "production" ? "production" : "latest";

const loadPath = `https://cdn.simplelocalize.io/3e7cd336972f440686163f572b185aa7/_${simpleLocalizeEnvironment}/{{lng}}`;

export const initTranslations = async (): Promise<void> => {
	await i18n
		.use(Backend)
		.use(LanguageDetector)
		.use(initReactI18next)
		.init({
			fallbackLng: "en",
			backend: {
				loadPath,
			},
			interpolation: { escapeValue: false },
		});
};
