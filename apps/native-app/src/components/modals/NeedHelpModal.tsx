import { StyleSheet, View, Linking, Image } from "react-native";

import Constants from "expo-constants";
import COLORS from "@Constants/palette";

import clara from "@Assets/home/clara.png";
import { useTranslation } from "react-i18next";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import BaseButton from "@Components/BaseButton";
import ParagraphSB from "@Components/ParagraphSB";
import Modal, { ModalPropsType } from "./Modal";

const csPeople = [
	{
		name: "Clara",
		phone: "06 74 82 99 04",
		mail: "clarafdj@alvie.fr",
		image: clara,
	},
];

const NeedHelpModal = ({ modalVisible, hideModal }: ModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	const sendEmail = (mail: string): void => {
		const subject = t("modals.needHelp.emailSubject");
		const body = `
   \r ----\r
    ${t("common.identifiers.version", { version: Constants.manifest.extra.version })}\r
    ${t("common.identifiers.build", { build: Constants.manifest.extra.build })}\r
    `;
		Linking.openURL(`mailto:${mail}?subject=${subject}&body=${body}`);
	};

	const sendCall = (phone: string): Promise<void> => Linking.openURL(`tel:${phone}`);

	return (
		<Modal title={t("modals.needHelp.title")} modalVisible={modalVisible} hideModal={hideModal}>
			<View style={styles.container}>
				{csPeople.map((person) => (
					<View style={styles.subContainer} key={person.name}>
						<Image source={person.image} style={styles.image} />
						<ParagraphSB style={styles.content}>
							<ParagraphSB>{t("modals.needHelp.tel", { name: person.name })}</ParagraphSB>
							<ParagraphSB style={styles.links} onPress={() => sendCall(person.phone)}>
								{" "}
								{person.phone}{" "}
							</ParagraphSB>
							<ParagraphSB>{t("modals.needHelp.mail")}</ParagraphSB>
							<ParagraphSB onPress={() => sendEmail(person.mail)} style={styles.links}>
								{" "}
								{person.mail}
							</ParagraphSB>
						</ParagraphSB>
					</View>
				))}
				<BaseButton color={COLORS.LAKE} onPress={hideModal} style={styles.btn}>
					{t("common.button.understood")}
				</BaseButton>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	subContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	btn: {
		marginTop: 16,
	},
	content: {
		flex: 1,
	},
	links: {
		color: COLORS.LAKE[100],
	},
	image: {
		width: 60,
		height: 60,
		marginRight: 16,
	},
});

export default NeedHelpModal;
