import { useContext } from "react";
import Constants from "expo-constants";
import { DrawerContentScrollView, DrawerContentComponentProps } from "@react-navigation/drawer";
import { Linking, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { AuthContext } from "@Context/AuthContext";
import { ModalsContext } from "@Context/ModalContext";
import HygoIcons from "@Icons/HygoIcons";
import SafeArea from "@Components/SafeArea";
import Analytics from "@Analytics";
import COLORS from "@Constants/palette";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import Title from "@Components/Title";
import ParagraphSB from "@Components/ParagraphSB";
import { UserContext } from "@Context/UserContext";
import { Feature } from "flagged";
import { featuresEnum } from "@Types/feature.types";

const { logAnalyticEvent, events } = Analytics;

const DrawerCustom = ({ navigation }: DrawerContentComponentProps): JSX.Element => {
	const { t } = useTranslation();
	const { logout, user } = useContext(AuthContext);
	const { defaultFarm, plans } = useContext(UserContext);
	const plan = plans?.find((p) => p.planId === user?.plan?.name);
	const { setNeedHelpModalProps, setDeleteAccountModalProps } = useContext(ModalsContext);
	const goToEquipment = (): void => navigation.navigate("EquipmentScreen");

	const goToFields = (): void => navigation.navigate("FieldsScreen");

	const clickHelp = (): void => {
		logAnalyticEvent(events.home.drawerScreen.clickHelp, {});

		setNeedHelpModalProps({
			visibility: true,
			props: {},
		});
	};

	const goToSettings = (): void => navigation.navigate("SettingsScreen");

	const deleteAccount = async (): Promise<void> => {
		setDeleteAccountModalProps({
			visibility: true,
			props: {},
		});
	};

	const sendEmail = (): void => {
		const email = "clarafdj@alvie.fr";
		const subject = t("components.drawer.emailSubject");
		const body = `
   \r ----\r
    ${t("common.identifiers.version", { version: Constants.manifest.extra.version })}\r
    ${t("common.identifiers.build", { build: Constants.manifest.extra.build })}\r
    `;
		Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
	};

	return (
		<SafeArea withHorizontalPadding={false}>
			<DrawerContentScrollView>
				<View style={styles.userDetails}>
					<HygoIcons.User width={32} height={32} fill={COLORS.NIGHT[100]} />
					<View style={styles.username}>
						<Title>
							{user?.firstName} {user?.lastName}
						</Title>
						<ParagraphSB>{defaultFarm?.name}</ParagraphSB>
					</View>
				</View>
				<Feature name={featuresEnum.FARM_WEATHER}>
					<TouchableOpacity style={styles.route} onPress={goToFields}>
						<View style={styles.labelWrapper}>
							<HygoIcons.Parcelles width={24} height={24} fill={COLORS.LAKE[100]} />
							<Title style={styles.label}>{t("components.drawer.fields")}</Title>
						</View>
						<HygoIcons.ChevronRight fill={COLORS.NIGHT[25]} height={24} width={24} />
					</TouchableOpacity>
				</Feature>
				<TouchableOpacity style={styles.route} onPress={goToEquipment}>
					<View style={styles.labelWrapper}>
						<HygoIcons.PulvEquipment width={24} height={24} fill={COLORS.LAKE[100]} />
						<Title style={styles.label}>{t("components.drawer.equipment")}</Title>
					</View>
					<HygoIcons.ChevronRight fill={COLORS.NIGHT[25]} height={24} width={24} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.route} onPress={sendEmail}>
					<View style={styles.labelWrapper}>
						<HygoIcons.Contact width={24} height={24} fill={COLORS.LAKE[100]} />
						<Title style={styles.label}>{t("components.drawer.contact")}</Title>
					</View>
					<HygoIcons.ChevronRight fill={COLORS.NIGHT[25]} height={24} width={24} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.route} onPress={clickHelp}>
					<View style={styles.labelWrapper}>
						<HygoIcons.Help width={24} height={24} fill={COLORS.LAKE[100]} />
						<Title style={styles.label}>{t("components.drawer.help")}</Title>
					</View>
					<HygoIcons.ChevronRight fill={COLORS.NIGHT[25]} height={24} width={24} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.route} onPress={goToSettings}>
					<View style={styles.labelWrapper}>
						<HygoIcons.Settings width={24} height={24} fill={COLORS.LAKE[100]} />
						<Title style={styles.label}>{t("components.drawer.settings")}</Title>
					</View>
					<HygoIcons.ChevronRight fill={COLORS.NIGHT[25]} height={24} width={24} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.route} onPress={deleteAccount}>
					<View style={styles.labelWrapper}>
						<HygoIcons.Trash width={24} height={24} fill={COLORS.GASPACHO[100]} />
						<Title style={[styles.label, styles.redLabel]}>{t("components.drawer.accountDeletion")}</Title>
					</View>
					<HygoIcons.ChevronRight fill={COLORS.NIGHT[25]} height={24} width={24} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.route} onPress={logout}>
					<View style={styles.labelWrapper}>
						<HygoIcons.Logout width={24} height={24} fill={COLORS.LAKE[100]} />
						<Title style={styles.label}>{t("components.drawer.logout")}</Title>
					</View>
					<HygoIcons.ChevronRight fill={COLORS.NIGHT[25]} height={24} width={24} />
				</TouchableOpacity>

				<View style={styles.versionWrapper}>
					<ParagraphSB>{`${t("common.identifiers.version", {
						version: Constants.manifest.extra.version,
					})}`}</ParagraphSB>
					<ParagraphSB>
						{`${t("common.identifiers.build", {
							build: Constants.manifest.extra.build,
						})}`}
						-{Constants.manifest.extra.OTA}
					</ParagraphSB>
					<ParagraphSB>Abonnement : {t(`plans.${plan?.i18nId}.name`)}</ParagraphSB>
				</View>
			</DrawerContentScrollView>
		</SafeArea>
	);
};

const styles = StyleSheet.create({
	userDetails: {
		paddingBottom: 16,
		paddingHorizontal: HORIZONTAL_PADDING,
		flexDirection: "row",
		borderColor: COLORS.NIGHT[5],
		borderBottomWidth: 1,
		alignItems: "center",
	},
	username: {
		marginLeft: 8,
	},
	route: {
		padding: 16,
		borderColor: COLORS.NIGHT[5],
		borderBottomWidth: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	labelWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	label: {
		marginLeft: 8,
	},
	redLabel: {
		color: COLORS.GASPACHO[100],
	},
	versionWrapper: {
		padding: 16,
	},
});

export default DrawerCustom;
