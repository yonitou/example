import Constants from "expo-constants";
// import { Amplitude } from "@amplitude/react-native";

import { userProperties } from "@Types/user.types";
import _ from "lodash";
import { fieldType } from "@Types/field.types";

// const ampInstance = Amplitude.getInstance();
// ampInstance.init(Constants.manifest.extra.amplitudeApiKey);

enum authFlow {
	login = "Connexion",
	logout = "Déconnexion",
	deletion = "Suppression de compte",
}

enum homeScreen {
	clickAddMixture = "Bouton 'Ajouter une bouillie' depuis l'Accueil",
	clickGoToModulation = "Bouton 'Nouvelle tâche' depuis l'Accueil",
	clickMeteo = "Clic sur la météo depuis l'Accueil",
	clickGoToRealTime = "Clic sur l'écran temps réel depuis l'Accueil",
	clickGoToRadar = "Clic sur l'écran radar depuis l'Accueil",
	clickInitTaskFromMixture = "Bouton planifier depuis une bouillie",
	clickDeleteMixture = "Supression d'une bouillie depuis l'accueil",
	clickUpdateMixture = "Modification des produits depuis une bouillie",
}

enum mixtureConditionsScreen {
	clickUpdateProductsMixture = "Modification des produits depuis les conditions détaillées",
}

enum drawerScreen {
	clickHelp = "Clic sur 'J'ai besoin d'aide' depuis l'Accueil",
}

enum modulationProductsScreen {
	validateProducts = "Validation des produits depuis le flow 'Nouvelle tâche'",
	editNozzle = "Modification de la buse depuis l'écran Sélection des produits dans le flow 'Nouvelle tâche'",
	editDebit = "Modification du debit depuis l'écran Sélection des produits dans le flow 'Nouvelle tâche'",
	navBack = "Clic sur le bouton retour depuis l'écran Sélection des produits dans le flow 'Nouvelle tâche'",
	clickOnRecommendedAdjuvants = "Clic sur 'Adjuvants conseillés'",
	clickOnRemoveAdjuvants = "Clic sur 'Attention à votre adjuventation'",
}

enum modulationFieldsScreen {
	validateFields = "Validation des parcelles depuis le flow 'Nouvelle tâche'",
}

enum modulationSlotScreen {
	validateSlot = "Validation du créneau depuis le flow 'Nouvelle tâche'",
}

enum comingTaskReportScreen {
	saveReport = "Validation d'une tâche prévue depuis l'écran Résumé de pulvérisation d'une tâche prévue",
	editModulation = "Activation/Désactivation de la modulation depuis l'écran Résumé de pulvérisation d'une tâche prévue",
	editSlot = "Modification du créneau depuis l'écran Résumé de pulvérisation d'une tâche prévue",
	editFields = "Modification des parcelles depuis l'écran Résumé de pulvérisation d'une tâche prévue",
	editNozzle = "Modification de la buse depuis l'écran Résumé de pulvérisation d'une tâche prévue",
	editDebit = "Modification du débit depuis l'écran Résumé de pulvérisation d'une tâche prévue",
	editProducts = "Modification des produits depuis l'écran Résumé de pulvérisation d'une tâche prévue",
	editTargets = "Modification des cibles depuis l'écran Résumé de pulvérisation d'une tâche prévue",
}

enum comingTaskScreen {
	clickComingTask = "Sélection d'une tâche prévue",
	markTaskAsDone = "Clic sur 'Fait' depuis une tâche prévue",
	rescheduleComingTask = "Clic sur 'Replanifier' depuis une tâche prévue",
}

enum doneTasksScreen {
	clickDoneTask = "Sélection d'une tâche réalisée",
}

enum createDoneTaskScreen {
	clickTaskCard = "Clic sur une détection depuis la création de tâche réalisée",
	clickSelectSlot = "Clic sur 'Choisir ce créneau' depuis la création de tâche réalisée",
}

enum fieldsScreen {
	updateCrops = "Mise à jour des parcelles depuis l'écran Mes Parcelles",
}

enum onboardingScreen {
	onboardingStart = "Début de l'onboarding",
	onboardingEnd = "Fin de l'onboarding",
}

enum tracabilityAndDoneTaskScreen {
	validateFields = "Validation des parcelles du flow Tracabilité",
	updateFields = "Modification des parcelles depuis le flow Tracabilité",
	editNozzle = "Modification de la buse depuis l'écran Résumé de pulvérisation d'une tâche réalisée",
	editDebit = "Modification du débit depuis l'écran Résumé de pulvérisation d'une tâche réalisée",
	updateNozzle = "Modification de la buse depuis le flow Tracabilité",
	updateDebit = "Modification du débit depuis le flow Tracabilité",
	updateProducts = "Modification des produits depuis le flow Tracabilité",
	validateProducts = "Validation des produits du flow Tracabilité",
	saveReport = "Validation d'une tâche réalisée depuis l'écran Résumé de pulvérisation d'une tâche réalisée",
}

enum equipmentScreen {
	firstSetup = "Première configuration de l'équipement réalisée (sol & buses)",
}

const events = {
	auth: authFlow,
	home: { homeScreen, drawerScreen },
	modulation: {
		modulationProductsScreen,
		modulationFieldsScreen,
		modulationSlotScreen,
		comingTaskReportScreen,
	},
	mixtureConditionsScreen,
	onboardingScreen: { onboardingScreen },
	equipmentScreen: { equipmentScreen },
	fieldsScreen: { fieldsScreen },
	tasksScreen: { comingTaskScreen, doneTasksScreen },
	tracability: { tracabilityAndDoneTaskScreen, createDoneTaskScreen },
};

export type analyticsEventEnum =
	| authFlow
	| homeScreen
	| mixtureConditionsScreen
	| drawerScreen
	| modulationProductsScreen
	| modulationFieldsScreen
	| modulationSlotScreen
	| comingTaskReportScreen
	| tracabilityAndDoneTaskScreen
	| comingTaskScreen
	| fieldsScreen
	| doneTasksScreen
	| createDoneTaskScreen
	| equipmentScreen
	| onboardingScreen;

const logAnalyticEvent = async (
	event: analyticsEventEnum,
	properties: {
		[name: string]: unknown;
	} = {}
): Promise<void> => {
	const formattedSelectedFields =
		(properties?.selectedFields as fieldType[])?.length > 0
			? (properties?.selectedFields as fieldType[])?.map((f) => _.omit(f, ["features", "svg"]))
			: null;
	const aggregatedProperties = { ...properties, selectedFields: formattedSelectedFields };
	// await Amplitude.getInstance().logEvent(event, aggregatedProperties);
};

const setAmplitudeUser = async (userId: string, props?: userProperties): Promise<void> => {
	// await Amplitude.getInstance().setUserId(userId);
	// const userProps = {
	// 	...props,
	// 	version: Constants.manifest.extra.version,
	// 	build: Constants.manifest.extra.build,
	// 	OTA: Constants.manifest.extra.OTA,
	// };
	// if (props) await Amplitude.getInstance().setUserProperties(userProps);
};

const clearUser = async (): Promise<void> => {
	// await Amplitude.getInstance().setUserId(null);
	// await Amplitude.getInstance().clearUserProperties();
};

const Analytics = {
	logAnalyticEvent,
	setAmplitudeUser,
	clearUser,
	events,
};

export default Analytics;
