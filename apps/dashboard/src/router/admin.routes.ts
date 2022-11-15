export interface AdminRoutesProps {
	path: string;
	id: string;
}

const routes: AdminRoutesProps[] = [
	{
		id: "tracability",
		path: "/admin",
	},
];

export default routes;
