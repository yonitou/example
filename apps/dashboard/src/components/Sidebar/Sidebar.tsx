import styled from "styled-components";
import routes, { AdminRoutesProps } from "@Router/admin.routes";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StyledSidebar = styled.div`
	height: 100%;
	box-shadow: 0px 0.8px 1.5px rgba(0, 83, 94, 0.1), 0px 6px 12px rgba(0, 83, 94, 0.1);
	width: 30rem;
	padding: 4rem 0;
	overflow: auto;
`;

const StyledNavLink = styled(NavLink)`
	text-decoration: none;
	display: block;
	padding: 1.6rem;
	margin-left: 2.8rem;
	h3 {
		color: var(--night-100);
	}
	&:hover,
	&[aria-current] {
		h3 {
			color: var(--tangerine-100);
		}
	}
	&[aria-current] {
		background-color: var(--sun-25);
		border-right: 0.5rem solid var(--tangerine-100);
	}
`;

const NavItem = ({ path, id }: AdminRoutesProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<StyledNavLink to={path}>
			<h3>{t(`routes.adminSidebar.${id}`)}</h3>
		</StyledNavLink>
	);
};

const Sidebar = (): JSX.Element => {
	return (
		<StyledSidebar>
			{routes.map((route) => {
				return <NavItem path={route.path} id={route.id} key={route.path} />;
			})}
		</StyledSidebar>
	);
};

export default Sidebar;
