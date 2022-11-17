import { StyleSheet, View } from "react-native";
import HygoIcons from "@Icons/HygoIcons";
import COLORS, { GRADIENTS } from "@Constants/palette";
import { useTranslation } from "react-i18next";
import { mixtureType } from "@Types/mixture.types";
import { HORIZONTAL_PADDING } from "@Constants/styleValues";
import WeekTab from "@Screens/modulation/ModulationSlotScreen/components/WeekTab";
import { useContext, useMemo } from "react";
import _ from "lodash";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import Title from "@Components/Title";
import productFamilies from "@Constants/productFamilies";
import ParagraphLight from "@Components/ParagraphLight";
import BaseButton from "@Components/BaseButton";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "@Context/UserContext";
import { ModulationContext } from "@Context/ModulationContext";
import { deleteMixture } from "@Api/hygoApi";
import { addDays, getTodayDateAsJSDate } from "@Utils/time";
import capitalize from "@Utils/capitalize";
import { Feature, useFeature } from "flagged";
import { featuresEnum } from "@Types/feature.types";
import { TourGuideZone } from "rn-tourguide";
import Analytics from "@Analytics";
import ConditionalWrapper from "@Components/ConditionalWrapper";

interface MixtureCardProps {
	mixture: mixtureType;
	fetchMixtures: () => void;
	isOnboardingItem: boolean;
	disabled: boolean;
}
const MixtureCard = ({ mixture, fetchMixtures, disabled, isOnboardingItem }: MixtureCardProps): JSX.Element => {
	const { t } = useTranslation();
	const { events, logAnalyticEvent } = Analytics;
	const hasOptimize = useFeature(featuresEnum.OPTIMIZE);

	const { setSelectedProducts, setSelectedTargets } = useContext(ModulationContext);
	const { defaultFarm } = useContext(UserContext);

	const navigation = useNavigation();
	const ProductIcon = productFamilies[mixture.productFamily];
	const productNamesList = mixture.selectedProducts.map((p) => capitalize(p.name)).join(", ");
	const cardTitle =
		mixture.selectedProducts.length > 1
			? t(`products.${mixture.productFamily}`).toUpperCase()
			: mixture.selectedProducts[0].name.toUpperCase();
	const weeklyConditions = useMemo(
		() =>
			_(mixture?.conditions)
				?.groupBy((m) => {
					const d = new Date(m.timestamp);

					d.setHours(0, 0, 0, 0);
					return d.toISOString();
				})
				.values()
				.sortBy((m) => new Date(m[0].timestamp).getTime())
				.map((hours) => _.sortBy(hours, (h) => new Date(h.timestamp).getTime()).map((x) => x.globalCond))
				.value(),
		[mixture]
	);

	const onPressUpdateMixture = (): void => {
		if (disabled) return;
		logAnalyticEvent(events.home.homeScreen.clickUpdateMixture, { mixture });
		navigation.navigate("MixtureScreen" as never, { mixtureId: mixture.id } as never);
	};

	const onPressInitTask = (): void => {
		if (disabled) return;
		logAnalyticEvent(events.home.homeScreen.clickInitTaskFromMixture, { mixture });
		const newSelectedProducts = mixture.selectedProducts.map((p) => ({
			...p,
			dose: p.minDose,
			modulationActive: !!hasOptimize,
		}));
		setSelectedProducts(newSelectedProducts);
		setSelectedTargets(mixture.selectedTargets);
		navigation.navigate("ModulationProductsScreen" as never);
	};

	const onPressDelete = async (): Promise<void> => {
		if (disabled) return;
		logAnalyticEvent(events.home.homeScreen.clickDeleteMixture, { mixture });
		await deleteMixture({ id: mixture.id, farmId: defaultFarm.id });
		fetchMixtures();
	};

	const onTabPress = (i: number): void => {
		if (disabled) return;
		const newDate = addDays(getTodayDateAsJSDate(), i);
		navigation.navigate(
			"MixtureConditionsScreen" as never,
			{ mixtureId: mixture.id, defaultDay: newDate.toISOString() } as never
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.actions}>
				<TouchableOpacity containerStyle={styles.detailsProducts} onPress={onPressUpdateMixture}>
					<View style={styles.productFamilyWrapper}>
						<ProductIcon width={24} height={24} fill={COLORS.NIGHT[100]} style={styles.icon} />
						<ConditionalWrapper
							condition={isOnboardingItem}
							wrapper={(children) => (
								<TourGuideZone
									zone={14}
									keepTooltipPosition
									text={t("screens.onboarding.steps.mixture.update")}
								>
									{children}
								</TourGuideZone>
							)}
						>
							<Title numberOfLines={1} style={styles.title}>
								{cardTitle}
							</Title>
						</ConditionalWrapper>
					</View>
					{mixture.selectedProducts?.length > 1 && (
						<ParagraphLight numberOfLines={1} style={styles.productsNameList}>
							{productNamesList}
						</ParagraphLight>
					)}
				</TouchableOpacity>
				<View style={styles.buttons}>
					{/* <TourGuideZone
						zone={15}
						keepTooltipPosition
						text={t("screens.onboarding.steps.mixture.recommandations")}
					>
						<BaseButton color={COLORS.SMOKE} borderRadius={4} style={styles.cta}>
							<HygoIcons.ProductInfos fill={COLORS.NIGHT[100]} width={24} height={24} />
						</BaseButton>
					</TourGuideZone> */}
					<Feature name={featuresEnum.TASKS}>
						<ConditionalWrapper
							condition={isOnboardingItem}
							wrapper={(children) => (
								<TourGuideZone
									zone={16}
									text={t("screens.onboarding.steps.mixture.task")}
									keepTooltipPosition
								>
									{children}
								</TourGuideZone>
							)}
						>
							<BaseButton
								color={COLORS.TANGERINE}
								borderRadius={4}
								style={[styles.cta]}
								onPress={onPressInitTask}
							>
								<HygoIcons.PulveAdd fill={COLORS.WHITE[100]} width={24} height={24} />
							</BaseButton>
						</ConditionalWrapper>

						<View style={styles.separator} />
					</Feature>
					<ConditionalWrapper
						condition={isOnboardingItem}
						wrapper={(children) => (
							<TourGuideZone
								zone={17}
								keepTooltipPosition
								text={t("screens.onboarding.steps.mixture.delete")}
							>
								{children}
							</TourGuideZone>
						)}
					>
						<BaseButton color={COLORS.GASPACHO} borderRadius={4} style={styles.cta} onPress={onPressDelete}>
							<HygoIcons.Minus fill={COLORS.WHITE[100]} width={24} height={24} />
						</BaseButton>
					</ConditionalWrapper>
				</View>
			</View>
			<LinearGradient colors={GRADIENTS.LIGHT_GREY} style={styles.linearGradientBackground}>
				<View style={styles.weekTabWrapper}>
					<WeekTab
						onTabChange={onTabPress}
						conditions={weeklyConditions}
						snapped
						withTourGuideZone={isOnboardingItem}
					/>
				</View>
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.WHITE[100],
		paddingVertical: 8,
		paddingHorizontal: HORIZONTAL_PADDING,
	},
	detailsProducts: {
		marginRight: 16,
		flex: 1,
	},
	buttons: {
		flexDirection: "row",
		alignItems: "center",
	},
	separator: {
		width: 16,
	},
	title: {
		flex: 1,
	},
	cta: {
		height: 40,
		width: 40,
	},
	productsNameList: {
		color: COLORS.LAKE[100],
		flex: 1,
	},
	productFamilyWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	actions: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	linearGradientBackground: {
		marginTop: 8,
	},
	icon: {
		marginRight: 8,
	},
	weekTabWrapper: {
		padding: 4,
	},
});

export default MixtureCard;
