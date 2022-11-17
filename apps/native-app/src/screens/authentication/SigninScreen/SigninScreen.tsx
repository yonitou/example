import { ImageBackground, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SafeArea from "@Components/SafeArea";
import BaseButton from "@Components/BaseButton";
import { useTranslation } from "react-i18next";
import COLORS from "@Constants/palette";
import Input from "@Components/Input";
import Title from "@Components/Title";
import Header from "@Components/Header";
import backgroundImg from "@Assets/authentication/signin/background.png";
import { SigninScreenProps } from "./screen.types";

const SigninScreen = ({
	onNavBack,
	loading,
	handleSubmit,
	control,
	onSubmit,
	onPasswordForgotten,
	formState,
}: SigninScreenProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<ImageBackground source={backgroundImg} resizeMode="cover" style={styles.background}>
			<Header title={t("screens.signIn.title")} onBackPress={onNavBack} backgroundColor="transparent" />
			<SafeArea>
				<Input
					label={t("common.inputs.email.label")}
					placeholder={t("common.inputs.email.placeholder")}
					autoComplete="username"
					keyboardType="email-address"
					containerStyle={styles.inputContainer}
					textContentType="username"
					editable={!loading}
					name="email"
					control={control}
					rules={{
						required: {
							value: true,
							message: t("common.inputs.email.errors.required"),
						},
					}}
					error={formState.errors.email}
				/>

				<Input
					label={t("common.inputs.password.label")}
					placeholder="*****"
					control={control}
					name="password"
					containerStyle={styles.inputContainer}
					autoComplete="password"
					secureTextEntry
					textContentType="password"
					editable={!loading}
					rules={{
						required: {
							value: true,
							message: t("common.inputs.password.errors.required"),
						},
					}}
					error={formState.errors.password}
				/>

				<TouchableOpacity onPress={onPasswordForgotten} style={styles.passwordForgotten}>
					<Title style={styles.passwordForgottenText}>{t("screens.signIn.passwordForgotten")}</Title>
				</TouchableOpacity>
				<BaseButton
					color={COLORS.LAKE}
					onPress={handleSubmit(onSubmit)}
					loading={loading}
					disabled={!formState.isValid}
				>
					{t("screens.signIn.button")}
				</BaseButton>
			</SafeArea>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
	},
	inputContainer: {
		marginBottom: 16,
	},
	passwordForgotten: {
		marginBottom: 16,
	},
	passwordForgottenText: {
		color: COLORS.LAKE[100],
	},
});

export default SigninScreen;
