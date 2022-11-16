import BaseIcons from "@Icons/BaseIcons";
import { featuresEnum } from "@Types/feature.types";

export interface NavbarRoutesProps {
	path: string;
	id: string;
	icon: JSX.Element;
	admin?: boolean;
	feature?: featuresEnum;
}

const routes: NavbarRoutesProps[] = [
	{
		id: "dashboard",
		icon: <BaseIcons.Parcelle width={24} height={24} />,
		path: "/dashboard",
		feature: featuresEnum.FARM_WEATHER,
	},
	{
		id: "import",
		icon: <BaseIcons.EditCrop width={24} height={24} />,
		path: "/import",
		feature: featuresEnum.FARM_WEATHER,
	},
	{
		id: "admin",
		icon: <BaseIcons.User width={24} height={24} />,
		path: "/admin",
		admin: true,
	},
	{
		id: "tasks",
		path: "/interventions",
		icon: <BaseIcons.Tractor width={24} height={24} />,
		feature: featuresEnum.TASKS,
	},
	{
		id: "devices",
		path: "/devices",
		icon: <BaseIcons.Sensor width={24} height={24} />,
		feature: featuresEnum.TRACABILITY,
	},
];

export default routes;
