import styled from "styled-components";
import { useState } from "react";
import { userType } from "@Types/user.types";
import BaseIcons from "@Icons/BaseIcons";
import { COLORS } from "@Constants/palette";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StyledUserMenu = styled.div`
	display: flex;
	align-items: center;
	.button-dropdown {
		display: flex;
		align-items: center;
		cursor: pointer;
		svg.right {
			transform: rotate(-90deg);
		}
		svg.right,
		.bottom {
			transition: transform 0.1s ease-in;
		}
		h3 {
			margin: 0 0.5rem;
		}
	}
	.dropdown {
		position: absolute;
		top: 68px;
		background-color: var(--white);
		z-index: 1;
		width: 25rem;
		right: 0;
		display: none;
		cursor: pointer;
		box-shadow: 0px 0.8px 1.5px rgba(0, 83, 94, 0.1), 0px 6px 12px rgba(0, 83, 94, 0.1);
		border-radius: 0.4rem;

		&.open {
			display: block;
		}

		div {
			display: flex;
			align-items: center;
			padding: 1rem;
			transition: background-color 0.1s ease-out;
			outline: none;
			svg {
				margin-right: 0.8rem;
			}
			&:hover {
				background-color: var(--night-5);
			}
		}
	}
	@media (max-width: 1140px) {
		.button-dropdown {
			h3 {
				display: none;
			}
		}
	}
`;

interface UserMenuProps {
	user: userType;
	admin: boolean;
	farmerSelected: boolean;
	signout: () => void;
}
const UserMenu = ({ farmerSelected, user, signout, admin }: UserMenuProps): JSX.Element => {
	const { t } = useTranslation();
	const [open, setOpen] = useState<boolean>(false);
	const navigate = useNavigate();

	const fullName = admin
		? `${user?.admin?.firstName} ${user?.admin?.lastName}`
		: `${user.firstName} ${user.lastName}`;

	const onClickDropdown = (): void => {
		setOpen(!open);
	};

	const onClickAccount = (): void => navigate("/account");

	return (
		<StyledUserMenu>
			<div
				className="button-dropdown"
				tabIndex={0}
				role="button"
				onClick={onClickDropdown}
				onKeyDown={onClickDropdown}
			>
				<BaseIcons.User fill={COLORS.NIGHT[100]} width={24} height={24} />
				<h3>{fullName}</h3>
				<BaseIcons.Chevron
					fill={COLORS.NIGHT[100]}
					width={19}
					height={19}
					className={open ? "bottom" : "right"}
				/>
			</div>
			<div className={`dropdown ${open ? "open" : null}`}>
				{farmerSelected && (
					<div onClick={onClickAccount} onKeyDown={onClickAccount} tabIndex={0} role="button">
						<BaseIcons.Pencil width={24} height={24} /> <h3>{t("components.userMenu.myAccount")}</h3>
					</div>
				)}
				<div onClick={signout} onKeyDown={signout} tabIndex={0} role="button">
					<BaseIcons.Logout width={24} height={24} /> <h3>{t("components.userMenu.logout")}</h3>
				</div>
			</div>
		</StyledUserMenu>
	);
};
export default UserMenu;
