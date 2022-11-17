import ParagraphSB from "@Components/ParagraphSB";
import COLORS from "@Constants/palette";
import HygoIcons from "@Icons/HygoIcons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";

interface PasswordStrengthProps {
	password: string;
}

const PasswordStrength = ({ password }: PasswordStrengthProps): JSX.Element => {
	const { t } = useTranslation();
	const [containsUppercase, setContainsUppercase] = useState<boolean>(false); // uppercase letter
	const [containsLowercase, setContainsLowercase] = useState<boolean>(false); // lowercase letter
	const [containsDigit, setContainsDigit] = useState<boolean>(false); // number
	const [contains8Chars, setContains8Chars] = useState<boolean>(false); // min 8 characters

	const rules = [
		[t("components.passwordStrength.uppercase"), containsUppercase],
		[t("components.passwordStrength.lowercase"), containsLowercase],
		[t("components.passwordStrength.digit"), containsDigit],
		[t("components.passwordStrength.minChars"), contains8Chars],
	];

	useEffect(() => {
		const validatePassword = (): void => {
			setContainsUppercase(password.toLowerCase() !== password);
			setContainsLowercase(password.toUpperCase() !== password);
			setContainsDigit(/\d/.test(password));
			setContains8Chars(password.length >= 8);
		};
		if (password) validatePassword();
		else {
			setContainsUppercase(false);
			setContainsLowercase(false);
			setContainsDigit(false);
			setContains8Chars(false);
		}
	}, [password, containsUppercase, containsLowercase, contains8Chars, containsDigit]);

	return (
		<View style={styles.container}>
			{rules.map((data, i) => {
				const marginBottom = i < 2 ? 8 : 0;
				const key = `${data[0]}-${i}`;
				return (
					<View key={key} style={{ ...styles.checkWrapper, marginBottom }}>
						<HygoIcons.CheckRounded
							fill={data[1] ? COLORS.GRASS[100] : COLORS.NIGHT[50]}
							stroke={data[1] ? COLORS.GRASS[100] : COLORS.NIGHT[50]}
						/>
						<ParagraphSB style={[styles.label, data[1] && styles.successLabel]}>{data[0]}</ParagraphSB>
					</View>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexWrap: "wrap",
		flexDirection: "row",
		alignItems: "center",
	},
	checkWrapper: {
		flexDirection: "row",
		marginBottom: 8,
		flexBasis: "50%",
		alignItems: "center",
	},
	label: {
		color: COLORS.NIGHT[50],
		marginLeft: 8,
	},
	successLabel: {
		color: COLORS.GRASS[100],
	},
});

export default PasswordStrength;
