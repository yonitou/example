import styled from "styled-components";
import errorBackgroundImg from "@Assets/errors/error-background.png";

import Button from "@Components/Button";
import { useTranslation } from "react-i18next";

interface ErrorProps {
	type: 404 | 500;
}

const StyledError = styled.div`
	height: 100%;
	display: flex;
	.content {
		flex: 3;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 12rem;
		h1,
		h2 {
			margin-bottom: 2.4rem;
		}
		.error-type {
			color: var(--night-50);
		}
		button {
			width: 50%;
		}
	}
	.image-wrapper {
		flex: 2;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
`;

const Error = ({ type }: ErrorProps): JSX.Element => {
	const { t } = useTranslation();
	const content = {
		404: {
			title: t("components.error.404.title"),
			description: t("components.error.404.description"),
			btn: t("components.error.404.btn"),
			onClick: () => {
				window.location.href = "/";
			},
		},
		500: {
			title: t("components.error.500.title"),
			description: t("components.error.500.description"),
			btn: t("components.error.500.btn"),
			onClick: () => window.location.reload(),
		},
	};

	return (
		<StyledError>
			<div className="content">
				<h2 className="error-type">
					{t("components.error.errorLabel")} {type}
				</h2>
				<h1>{content[type].title}</h1>
				<h2>{content[type].description}</h2>
				<Button text={content[type].btn} color="tangerine" onClick={content[type].onClick} />
			</div>
			<div className="image-wrapper">
				<img src={errorBackgroundImg} alt={t("components.error.errorLabel")} />
			</div>
		</StyledError>
	);
};

export default Error;
