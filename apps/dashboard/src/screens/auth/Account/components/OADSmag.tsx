import BaseIcons from "@Icons/BaseIcons";
import { useContext } from "react";
import oadImage from "@Assets/account/oad-smag.png";
import styled from "styled-components";
import Button from "@Components/Button";
import { ModalsContext } from "@Context/ModalContext";
import { useTranslation } from "react-i18next";
import { OADContext } from "@Context/OADContext";
import { AuthContext } from "@Context/AuthContext";

const StyledOADSmag = styled.div`
	border: 1px solid var(--night-25);
	border-radius: 0.4rem;
	padding: 0.8rem;
	.name {
		display: flex;
		align-items: center;

		svg {
			margin-right: 0.8rem;
		}
	}
	.logged-in {
		display: flex;
		align-items: center;
		.green-dot {
			width: 1rem;
			margin: 0.8rem 0;
			height: 1rem;
			border-radius: 50%;
			background-color: var(--grass-100);
			margin-right: 0.8rem;
		}
		h3 {
			color: var(--night-50);
		}
	}
	.illustration {
		background-color: var(--night-5);
		border-radius: 0.4rem;
		height: 10rem;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 1.6rem 0;
		img {
			height: 7.5rem;
		}
	}
	p {
		margin-bottom: 1.6rem;
	}
`;

const OADSmag = (): JSX.Element => {
	const { t } = useTranslation();
	const { setSmagLoginModalProps, setSmagLogoutModalProps } = useContext(ModalsContext);
	const { user } = useContext(AuthContext);
	const { loggedInSmag } = useContext(OADContext);
	const openSmagLoginModal = (): void => {
		setSmagLoginModalProps({
			visibility: true,
			props: {},
		});
	};

	const openSmagLogoutModal = (): void => {
		setSmagLogoutModalProps({
			visibility: true,
			props: {},
		});
	};

	return (
		<StyledOADSmag>
			<div className="name">
				<BaseIcons.Smag />
				<h3>Smag Farmer</h3>
			</div>
			{loggedInSmag && (
				<div className="logged-in">
					<div className="green-dot" />
					<h3>{t("screens.account.myOad.smag.indicator", { name: user?.email })}</h3>
				</div>
			)}
			{!loggedInSmag && (
				<>
					<div className="illustration">
						<img src={oadImage} alt="Smag illustration" />
					</div>
					<h3>{t("screens.account.myOad.smag.title")}</h3>
					<p>{t("screens.account.myOad.smag.subtitle")}</p>
				</>
			)}

			<Button
				text={
					loggedInSmag ? t("screens.account.myOad.smag.logoutBtn") : t("screens.account.myOad.smag.loginBtn")
				}
				onClick={loggedInSmag ? openSmagLogoutModal : openSmagLoginModal}
				color="tangerine"
			/>
		</StyledOADSmag>
	);
};

export default OADSmag;
