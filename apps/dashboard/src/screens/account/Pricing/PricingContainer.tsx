import { UserContext } from "@Context/UserContext";
import useChargebee from "@Hook/useChargebee";

import { useContext } from "react";
import Pricing from "./Pricing";

const PricingContainer = (): JSX.Element => {
	const { openChargebeePortal } = useChargebee();
	const { plans } = useContext(UserContext);

	return (
		<Pricing
			openChargebeePortal={openChargebeePortal}
			plans={plans?.filter((p) => p.status === "active").sort((a, b) => a.price - b.price)}
			loading={!(plans?.length > 0)}
		/>
	);
};

export default PricingContainer;
