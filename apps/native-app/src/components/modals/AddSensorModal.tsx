import { StyleSheet, View, Image } from "react-native";
import COLORS from "@Constants/palette";
import { useTranslation } from "react-i18next";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import BaseButton from "@Components/BaseButton";
import BigTitle from "@Components/BigTitle";
import step1Img from "@Assets/home/plan-step-1.png";
import step2Img from "@Assets/home/plan-step-2.png";
import step3Img from "@Assets/home/plan-step-3-sensor.png";
import Title from "@Components/Title";
import Modal, { ModalPropsType } from "./Modal";

const AddSensorModal = ({ modalVisible, hideModal }: ModalPropsType): JSX.Element => {
	const { t } = useTranslation();
	return (
		<Modal
			modalVisible={modalVisible}
			hideModal={hideModal}
			customTitle={<BigTitle style={styles.title}>{t("modals.addSensor.title")}</BigTitle>}
		>
			<View style={styles.container}>
				<Title style={styles.subline}>{t("modals.addSensor.subtitle")}</Title>
				<View style={styles.step}>
					<Image source={step1Img} style={styles.image} />
					<Title style={styles.stepLabel}>{t("modals.addSensor.steps.1")}</Title>
				</View>
				<View style={styles.step}>
					<Image source={step2Img} style={styles.image} />
					<Title style={styles.stepLabel}>
						{t("modals.addSensor.steps.2a")} <Title style={styles.link}>app.alvie.fr</Title>{" "}
						{t("modals.addSensor.steps.2b")}
					</Title>
				</View>
				<View style={styles.step}>
					<Image source={step3Img} style={styles.image} />
					<Title style={styles.stepLabel}>{t("modals.addSensor.steps.3")}</Title>
				</View>
				<BaseButton color={COLORS.LAKE} onPress={hideModal}>
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
	stepLabel: {
		flex: 1,
	},
	link: {
		color: COLORS.LAKE[100],
	},
	title: {
		paddingBottom: 16,
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	step: {
		marginBottom: 16,
		flexDirection: "row",
		alignItems: "center",
	},
	image: {
		marginRight: 16,
		width: 40,
		height: 40,
	},
	subline: {
		color: COLORS.NIGHT[50],
		marginBottom: 24,
	},
});

export default AddSensorModal;
