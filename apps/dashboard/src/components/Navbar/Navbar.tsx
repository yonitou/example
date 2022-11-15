import { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@Context/AuthContext";
import BaseIcons from "@Icons/BaseIcons";
import UserSelector from "@Components/UserSelector";
import routes from "@Router/navbar.routes";
import UserMenu from "../UserMenu";
import NavItem from "./components/NavItem";

const StyledNavbar = styled.nav`
	width: 100%;
	height: 6.8rem;
	display: flex;
	justify-content: space-between;
	background-color: var(--white);
	position: relative;
	z-index: 1;
	padding-right: 2.4rem;
	.logo {
		margin-right: 0.4rem;
		width: 13.2rem;
		height: 6.9rem;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0px 0.8px 1.5px rgba(0, 83, 94, 0.1), 0px 6px 12px rgba(0, 83, 94, 0.1);
		border-bottom-right-radius: 0.8rem;
		cursor: pointer;
	}
	.links-wrapper {
		display: flex;
		padding-top: 1rem;
		flex: 1;
	}
	.user-selector-wrapper {
		display: flex;
		align-items: center;
		flex: 0.4;
		margin-right: 2.4rem;
	}
`;

const AppHeader = (): JSX.Element => {
	const navigate = useNavigate();
	const { user, signout, admin, farmerSelected } = useContext(AuthContext);

	return (
		<StyledNavbar>
			<div
				className="logo"
				onClick={() => navigate("/")}
				tabIndex={0}
				onKeyDown={() => navigate("/")}
				role="button"
			>
				<BaseIcons.Logo />
			</div>
			<div className="links-wrapper">
				{farmerSelected && routes.map((route) => <NavItem route={route} key={route.id} />)}
			</div>
			{admin && (
				<div className="user-selector-wrapper">
					<UserSelector />
				</div>
			)}
			<UserMenu user={user} admin={admin} signout={signout} farmerSelected={farmerSelected} />
		</StyledNavbar>
	);
};

export default AppHeader;
