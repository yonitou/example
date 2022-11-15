import styled from "styled-components";
import desktopImg from "@Assets/errors/desktop-only.png";
import computerImg from "@Assets/errors/computer-man.png";
import webAddressImg from "@Assets/errors/web-address.png";
import { Trans, useTranslation } from "react-i18next";

const StyledOnlyDesktop = styled.div`
	display: none;
	height: 100%;
	background: var(--gradient-background-1);
	flex-direction: column;
	.img-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 2;
		margin: 0 1.6rem;
	}
	.content {
		flex: 1;
		background-color: var(--white);
		border-radius: 1.6rem 1.6rem 0 0;
		padding: 1.6rem;
		h2 {
			margin-bottom: 0.8rem;
		}
		h3.no-mobile-sentence {
			color: var(--night-50);
			margin-bottom: 2.4rem;
		}
		.steps {
			display: flex;
			align-items: center;
			margin-bottom: 2.4rem;
			img {
				margin-right: 1.7rem;
				width: 4rem;
				height: 4rem;
			}
			.lake {
				color: var(--lake-100);
			}
		}
	}

	@media (max-width: 740px) {
		display: flex;
	}
`;

const OnlyDesktop = (): JSX.Element => {
	const { t } = useTranslation();
	return (
		<StyledOnlyDesktop>
			<div className="img-wrapper">
				<img src={desktopImg} alt="Application sur ordinateur" />
			</div>
			<div className="content">
				<h2>{t("components.onlyDesktop.title")}</h2>
				<h3 className="no-mobile-sentence">{t("components.onlyDesktop.subtitle")}</h3>
				<h3 className="steps">
					<img src={computerImg} alt="Personne sur son ordinateur" />
					{t("components.onlyDesktop.steps.1")}
				</h3>
				<div className="steps">
					<img src={webAddressImg} alt="app.alvie.fr" />
					<Trans i18nKey="components.onlyDesktop.steps.2">
						<h3>
							Login from <span className="lake">app.alvie.fr</span> with your email and your password
						</h3>
					</Trans>
				</div>
			</div>
		</StyledOnlyDesktop>
	);
};

export default OnlyDesktop;
