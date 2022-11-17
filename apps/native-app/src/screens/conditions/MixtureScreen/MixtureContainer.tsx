import { createMixture, getMixtureById, updateMixture } from "@Api/hygoApi";
import { UserContext } from "@Context/UserContext";
import useSelectedProducts from "@Hooks/useSelectedProducts";
import { activeProductType } from "@Types/activeProduct.types";
import { mixtureType } from "@Types/mixture.types";
import { useContext, useEffect, useState } from "react";
import MixtureScreen from "./MixtureScreen";
import { MixtureContainerProps } from "./screen.types";

const MixtureContainer = ({ navigation, route }: MixtureContainerProps): JSX.Element => {
	const { defaultFarm } = useContext(UserContext);
	const [loading, setLoading] = useState<boolean>(false);
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [mixture, setMixture] = useState<mixtureType>();

	const mixtureId = route?.params?.mixtureId;

	const {
		products,
		selectedProducts,
		tankIndications,
		addProduct,
		removeProduct,
		setSelectedTargets,
		selectedTargets,
	} = useSelectedProducts({
		fromReportScreen: false,
		initialProducts: mixture?.selectedProducts,
		initialTargets: mixture?.selectedTargets,
	});
	const onSubmit = async (): Promise<void> => {
		try {
			setSubmitting(true);
			const mixtureParams = {
				farmId: defaultFarm.id,
				mixture: { ...mixture, selectedProducts, selectedTargets },
			};
			mixture?.id ? await updateMixture(mixtureParams) : await createMixture(mixtureParams);
		} finally {
			setSubmitting(false);
			onNavBack();
		}
	};

	const onAddProduct = (prod: activeProductType): void => addProduct(prod, false);
	const onNavBack = (): void => navigation.goBack();

	useEffect(() => {
		const fetchMixture = async (): Promise<void> => {
			setLoading(true);
			const fetchedMixture = await getMixtureById({ farmId: defaultFarm.id, id: mixtureId });
			setMixture(fetchedMixture);
			setLoading(false);
		};
		if (mixtureId) fetchMixture();
	}, [mixtureId, defaultFarm]);

	return (
		<MixtureScreen
			onNavBack={onNavBack}
			onSubmit={onSubmit}
			onAddProduct={onAddProduct}
			loading={loading}
			products={products}
			selectedProducts={selectedProducts}
			tankIndications={tankIndications}
			removeProduct={removeProduct}
			updateTargetsList={setSelectedTargets}
			selectedTargets={selectedTargets}
			submitting={submitting}
			mixtureId={mixtureId}
		/>
	);
};

export default MixtureContainer;
