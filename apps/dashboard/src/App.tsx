import { useEffect, useState } from "react";
import * as Sentry from "@sentry/react";
import Error from "@Components/Error";
import Modals from "@Components/modals";
import AuthProvider from "@Context/AuthContext";
import UserProvider from "@Context/UserContext";
import SnackbarProvider from "@Context/SnackbarContext";
import ModalsProvider from "@Context/ModalContext";
import { initTranslations } from "@I8n/i18n";
import { CropsScreenProvider } from "@Context/CropScreenContext";
import GlobalStyles from "@Styles/GlobalStyles";
import { AppRouter } from "@Router/AppRouter";
import Typography from "@Styles/Typography";
import OADProvider from "@Context/OADContext";

const App = (): JSX.Element => {
	const [i18nReady, setI18nReady] = useState<boolean>(false);

	useEffect(() => {
		const init = async (): Promise<void> => {
			await initTranslations();
			setI18nReady(true);
		};

		init();
	}, []);

	return (
		<>
			<GlobalStyles />
			<Typography />
			<Sentry.ErrorBoundary fallback={<Error type={500} />}>
				<AuthProvider>
					<SnackbarProvider>
						<UserProvider>
							<OADProvider>
								<CropsScreenProvider>
									<ModalsProvider>
										<AppRouter i18nReady={i18nReady} />
										<Modals />
									</ModalsProvider>
								</CropsScreenProvider>
							</OADProvider>
						</UserProvider>
					</SnackbarProvider>
				</AuthProvider>
			</Sentry.ErrorBoundary>
		</>
	);
};

export default App;
