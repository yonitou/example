import { useContext } from "react";
import { Route, Routes, BrowserRouter, Outlet, Navigate } from "react-router-dom";
import { OADContext } from "@Context/OADContext";
import { AuthContext } from "@Context/AuthContext";
import Crops from "@Screens/dashboard/Crops";
import ImportTelepac from "@Screens/import/ImportTelepac";
import ImportSmag from "@Screens/import/ImportSmag";
import SignIn from "@Screens/auth/Signin";
import SignupLanding from "@Screens/auth/SignupLanding";
import SignupAgri from "@Screens/auth/SignupAgri";
import ImportLanding from "@Screens/import/ImportLanding";
import EmailPasswordValidation from "@Screens/auth/EmailPasswordValidation";
import ResetPassword from "@Screens/auth/ResetPassword";
import BaseLoader from "@Components/Loader";
import Tracability from "@Screens/admin/Tracability";
import Pricing from "@Screens/account/Pricing";
import Error from "@Components/Error";
import Tasks from "@Screens/interventions/Tasks";
import Account from "@Screens/auth/Account";
import DeviceManagement from "@Screens/devices/DeviceManagement";
import { featuresEnum } from "@Types/feature.types";
import AdminRoutes from "./components/AdminRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import FarmerRoutes from "./components/FarmerRoutes";

interface AppRouterProps {
	i18nReady: boolean;
}

export const AppRouter = ({ i18nReady }: AppRouterProps): JSX.Element => {
	const { loading } = useContext(AuthContext);
	const { loggedInSmag } = useContext(OADContext);

	return loading || !i18nReady ? (
		<BaseLoader />
	) : (
		<BrowserRouter>
			<Routes>
				{/* Routes when user is not authenticated */}
				<Route element={<PublicRoutes allowedMobilePaths={["reset-password"]} />}>
					<Route path="/" element={<SignIn />} />
					<Route path="reset-password">
						<Route index element={<EmailPasswordValidation />} />
						<Route path="new/:token" element={<ResetPassword />} />
					</Route>
					<Route path="signup" element={<Outlet />}>
						<Route index element={<SignupLanding />} />
						<Route path="agri" element={<SignupAgri />} />
					</Route>
				</Route>
				{/* Routes only accessible for authenticated users */}
				<Route path="pricing" element={<ProtectedRoutes />}>
					<Route index element={<Pricing />} />
				</Route>
				<Route path="account" element={<ProtectedRoutes />}>
					<Route index element={<Account />} />
				</Route>
				{/* Routes only accessible to premium users */}
				<Route path="dashboard" element={<FarmerRoutes feature={featuresEnum.FARM_WEATHER} />}>
					<Route index element={<Crops />} />
				</Route>
				<Route path="import" element={<FarmerRoutes feature={featuresEnum.FARM_WEATHER} />}>
					<Route index element={<ImportLanding />} />
					<Route path="telepac" element={<ImportTelepac />} />
					<Route path="smag" element={loggedInSmag ? <ImportSmag /> : <Navigate to="/" />} />
				</Route>
				<Route path="interventions" element={<FarmerRoutes feature={featuresEnum.TASKS} />}>
					<Route index element={<Tasks />} />
				</Route>
				<Route path="devices" element={<FarmerRoutes feature={featuresEnum.TRACABILITY} />}>
					<Route index element={<DeviceManagement />} />
				</Route>
				{/* Routes only accessible to admins  */}
				<Route path="admin" element={<AdminRoutes />}>
					<Route index element={<Tracability />} />
				</Route>
				<Route path="*" element={<Error type={404} />} />
			</Routes>
		</BrowserRouter>
	);
};
