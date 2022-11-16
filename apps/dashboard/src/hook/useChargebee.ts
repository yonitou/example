import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@Context/AuthContext";
import { getChargebeePortalSession } from "@Api/api";

declare global {
	interface Window {
		// eslint-disable-next-line
		Chargebee: any;
	}
}

interface useChargebeeReturnType {
	openChargebeePortal: () => void;
}

const useChargebee = (): useChargebeeReturnType => {
	const navigate = useNavigate();
	const { user, setIsAuth, signout, signin } = useContext(AuthContext);

	// eslint-disable-next-line
	const [chargebee, setChargebee] = useState<any>();

	const waitAndRefetchPlan = useCallback(async (): Promise<void> => {
		setIsAuth(null);
		chargebee.closeAll();
		setTimeout(async () => {
			try {
				const token = localStorage.getItem("hygoCookie");
				navigate("/");
				signin(token);
			} catch (e) {
				signout();
			}
		}, 15000);
	}, [chargebee, navigate, setIsAuth, signin, signout]);

	useEffect(() => {
		const script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "https://js.chargebee.com/v2/chargebee.js";
		script.async = true;
		script.onload = () => {
			window.Chargebee.init({
				site: process.env.NX_REACT_APP_ENV === "production" ? "alvie" : "alvie-test",
			});
			window.Chargebee.registerAgain();
			const cbInstance = window.Chargebee.getInstance();
			setChargebee(cbInstance);
			cbInstance.setPortalSession(() => {
				return getChargebeePortalSession();
			});
			cbInstance.setCheckoutCallbacks(() => {
				return {
					success: () => waitAndRefetchPlan(),
				};
			});

			const cart = cbInstance.getCart();
			const customer = {
				first_name: user.firstName,
				last_name: user.lastName,
				email: user.email,
				billing_address: {
					first_name: user.firstName,
					last_name: user.lastName,
					email: user.email,
					country: "FR",
				},
			};
			cart.setCustomer(customer);
		};
		document.body.appendChild(script);
	}, [user, waitAndRefetchPlan]);

	const openChargebeePortal = (): void => {
		const portal = chargebee.createChargebeePortal();

		const callbacks = {
			subscriptionChanged: waitAndRefetchPlan,
			subscriptionCancelled: waitAndRefetchPlan,
			subscriptionReactivated: waitAndRefetchPlan,
			scheduledCancellationRemoved: waitAndRefetchPlan,
			close: () => chargebee.logout(),
		};

		portal.open(callbacks);
	};
	return { openChargebeePortal };
};

export default useChargebee;
