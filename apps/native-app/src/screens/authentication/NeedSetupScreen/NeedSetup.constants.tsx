import HygoIcons from "@Icons/HygoIcons";
import needUpdateVersionStep1Img from "@Assets/authentication/activation-error/needUpdateVersion-step1.png";
import needUpdateVersionStep2Img from "@Assets/authentication/activation-error/needUpdateVersion-step2.png";
import noPlanImg from "@Assets/authentication/activation-error/noPlan.png";
import noDefaultFarmImg from "@Assets/authentication/activation-error/noDefaultFarm.png";
import defaultFarmWithoutFieldsImg from "@Assets/authentication/activation-error/defaultFarmWithoutFields.png";
import desktopStep1Img from "@Assets/home/plan-step-1.png";
import desktopStep2Img from "@Assets/home/plan-step-2.png";
import { Image, StyleSheet } from "react-native";
import { ErrorsEnum } from "@Types/auth.types";

const styles = StyleSheet.create({
	stepImg: {
		width: 40,
		height: 40,
	},
	desktopImg: {
		width: 340,
		height: 260,
	},
});

export const errors: {
	[key in ErrorsEnum]: {
		asset: JSX.Element;
		body: {
			steps: { asset: JSX.Element }[];
		};
	};
} = {
	[ErrorsEnum.needUpdateVersion]: {
		asset: <HygoIcons.UpdateDrop width={95} height={108} />,
		body: {
			steps: [
				{
					asset: <Image source={needUpdateVersionStep1Img} style={styles.stepImg} />,
				},
				{
					asset: <Image source={needUpdateVersionStep2Img} style={styles.stepImg} />,
				},
			],
		},
	},
	[ErrorsEnum.noPlan]: {
		asset: <Image source={noPlanImg} style={styles.desktopImg} />,
		body: {
			steps: [
				{
					asset: <Image source={desktopStep1Img} style={styles.stepImg} />,
				},
				{
					asset: <Image source={desktopStep2Img} style={styles.stepImg} />,
				},
			],
		},
	},
	[ErrorsEnum.noDefaultFarm]: {
		asset: <Image source={noDefaultFarmImg} style={styles.desktopImg} />,
		body: {
			steps: [
				{
					asset: <Image source={desktopStep1Img} style={styles.stepImg} />,
				},
				{
					asset: <Image source={desktopStep2Img} style={styles.stepImg} />,
				},
			],
		},
	},
	[ErrorsEnum.defaultFarmWithoutFields]: {
		asset: <Image source={defaultFarmWithoutFieldsImg} style={styles.desktopImg} />,
		body: {
			steps: [
				{
					asset: <Image source={desktopStep1Img} style={styles.stepImg} />,
				},
				{
					asset: <Image source={desktopStep2Img} style={styles.stepImg} />,
				},
			],
		},
	},
};
