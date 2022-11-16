import { AuthContext } from "@Context/AuthContext";
import { NavbarRoutesProps } from "@Router/navbar.routes";
import { useFeature } from "flagged";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
	text-align: center;
	text-decoration: none;
	padding: 0.3rem 2.4rem 0 2.4rem;
	height: 100%;
	justify-content: space-around;
	svg {
		margin: auto;
	}
	h4 {
		color: var(--night-50);
	}
	.fillIcon path,
	.strokeIcon path {
		fill: var(--night-50);
	}
	&:hover,
	&[aria-current] {
		h4 {
			color: var(--tangerine-100);
		}
		.fillIcon path,
		.strokeIcon path {
			fill: var(--tangerine-100);
		}
	}
	&[aria-current] {
		background-color: var(--sun-25);
		border-bottom: 0.5rem solid var(--tangerine-100);
	}
`;

interface NavItemProps {
	route: NavbarRoutesProps;
}

const NavItem = ({ route }: NavItemProps): JSX.Element => {
	const { superAdmin } = useContext(AuthContext);
	const hasFeature = useFeature(route.feature || "empty");
	const showRoute = (): boolean => {
		if (route.admin) return superAdmin;
		if (route.feature) return !!hasFeature;
		return null;
	};
	const { t } = useTranslation();
	if (!showRoute()) return null;
	return (
		<StyledNavLink to={route.path}>
			{route.icon}
			<h4>{t(`routes.navbar.${route.id}`)}</h4>
		</StyledNavLink>
	);
};

export default NavItem;
