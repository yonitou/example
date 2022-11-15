import { createGlobalStyle } from "styled-components";

import nunitoBoldWoff2 from "@Assets/fonts/Nunito-Bold.woff2";
import nunitoBoldWoff from "@Assets/fonts/Nunito-Bold.woff";

import nunitoRegularWoff2 from "@Assets/fonts/Nunito-Regular.woff2";
import nunitoRegularWoff from "@Assets/fonts/Nunito-Regular.woff";

import nunitoSemiBoldWoff2 from "@Assets/fonts/Nunito-SemiBold.woff2";
import nunitoSemiBoldWoff from "@Assets/fonts/Nunito-SemiBold.woff";

import avenirBlackWoff2 from "@Assets/fonts/Avenir-Black.woff2";
import avenirBlackWoff from "@Assets/fonts/Avenir-Black.woff";

const styled = { createGlobalStyle };

const Typography = styled.createGlobalStyle`
	@font-face {
		font-family: "Nunito Bold";
		src: url(${nunitoBoldWoff2}) format("woff2"), url(${nunitoBoldWoff}) format("woff");
		font-weight: normal;
		font-style: normal;
		font-display: swap;
	}

	@font-face {
		font-family: "Nunito Regular";
		src: url(${nunitoRegularWoff2}) format("woff2"), url(${nunitoRegularWoff}) format("woff");
		font-weight: normal;
		font-style: normal;
		font-display: swap;
	}

	@font-face {
		font-family: "Nunito SemiBold";
		src: url(${nunitoSemiBoldWoff2}) format("woff2"), url(${nunitoSemiBoldWoff}) format("woff");
		font-weight: normal;
		font-style: normal;
		font-display: swap;
	}

	@font-face {
		font-family: "Avenir Black";
		src: url(${avenirBlackWoff2}) format("woff2"), url(${avenirBlackWoff}) format("woff");
		font-weight: normal;
		font-style: normal;
		font-display: swap;
	}

	html {
		font-family: Nunito Regular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
			"Open Sans", "Helvetica Neue", sans-serif;
		color: var(--night-100);
	}

	h1 {
		font-family: "Avenir Black";
		font-size: 3.6rem;
	}

	h2 {
		font-family: "Avenir Black";
		font-size: 2.4rem;
	}

	h3 {
		font-family: "Nunito Bold";
		font-size: 1.4rem;
	}

	h4 {
		font-family: "Nunito Regular";
		font-size: 1.4rem;
	}

	h5 {
		font-family: "Nunito SemiBold";
		font-size: 1.2rem;
	}

	p {
		font-family: "Nunito Regular";
		font-size: 1.2rem;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-weight: normal;
	}

	@media (max-width: 740px) {
		h1 {
			font-size: 2.4rem;
		}
		h2 {
			font-size: 2rem;
		}
		h3 {
			font-size: 1.6rem;
		}
		h4 {
			font-size: 1.6rem;
		}
		h5 {
			font-size: 1.4rem;
		}
		h6 {
			font-size: 1.4rem;
		}
		p {
			font-size: 1.4rem;
		}
	}
`;

export default Typography;
