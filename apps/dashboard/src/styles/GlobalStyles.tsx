import { createGlobalStyle } from "styled-components";
import { COLORS, GRADIENTS } from "@Constants/palette";

const styled = { createGlobalStyle };

const GlobalStyles = styled.createGlobalStyle`
	:root {
		--white: ${COLORS.WHITE};
		--lake-100: ${COLORS.LAKE[100]};
		--lake-hover: ${COLORS.LAKE[200]};
		--lake-50: ${COLORS.LAKE[50]};
		--lake-25: ${COLORS.LAKE[25]};
		--sky-100: ${COLORS.SKY[100]};
		--sky-50: ${COLORS.SKY[50]};
		--sky-25: ${COLORS.SKY[25]};
		--night-100: ${COLORS.NIGHT[100]};
		--night-50: ${COLORS.NIGHT[50]};
		--night-25: ${COLORS.NIGHT[25]};
		--night-10: ${COLORS.NIGHT[10]};
		--night-5: ${COLORS.NIGHT[5]};
		--tangerine-100: ${COLORS.TANGERINE[100]};
		--tangerine-hover: ${COLORS.TANGERINE[200]};
		--tangerine-50: ${COLORS.TANGERINE[50]};
		--tangerine-25: ${COLORS.TANGERINE[25]};
		--gaspacho-100: ${COLORS.GASPACHO[100]};
		--gaspacho-hover: ${COLORS.GASPACHO[200]};
		--gaspacho-50: ${COLORS.GASPACHO[50]};
		--gaspacho-25: ${COLORS.GASPACHO[25]};
		--sun-100: ${COLORS.SUN[100]};
		--sun-50: ${COLORS.SUN[50]};
		--sun-25: ${COLORS.SUN[25]};
		--grass-100: ${COLORS.GRASS[100]};
		--grass-50: ${COLORS.GRASS[50]};
		--grass-10: ${COLORS.GRASS[10]};
		--smoke-100: ${COLORS.SMOKE[100]};
		--gradient-light-grey: ${GRADIENTS.LIGHT_GREY};
		--gradient-light-grey-50: ${GRADIENTS.LIGHT_GREY50};
		--gradient-background-1: ${GRADIENTS.BACKGROUND_1};
		--gradient-background-2: ${GRADIENTS.BACKGROUND_2};
		--gradient-lake: ${GRADIENTS.LAKE_GRAD};
		--gradient-tangerine: ${GRADIENTS.TANGERINE_GRAD};
		--gradient-skeleton: ${GRADIENTS.SKELETON_GRAD};
	}
	/*
    1. Use a more-intuitive box-sizing model.
  */
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}
	/*
    2. Remove default margin
  */
	* {
		margin: 0;
	}
	/*
    3. Allow percentage-based heights in the application
  */
	html {
		font-size: 10px;
	}

	html,
	body,
	#root {
		height: 100%;
	}

	body {
		overflow: hidden;
	}
	/*
    Typographic tweaks!
    4. Add accessible line-height
    5. Improve text rendering
  */
	body {
		line-height: 1.5;
		-webkit-font-smoothing: antialiased;
		/* overflow: hidden; */
	}
	/*
    6. Improve media defaults
  */
	img,
	picture,
	video,
	canvas,
	svg {
		display: block;
		max-width: 100%;
	}
	/*
    7. Remove built-in form typography styles
  */
	input,
	button,
	textarea,
	select {
		font: inherit;
	}
	/*
    8. Avoid text overflows
  */
	p,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		overflow-wrap: break-word;
	}
	/*
    9. Create a root stacking context
  */
	#root {
		isolation: isolate;
		overflow: hidden;
	}

	.pac-logo::after {
		display: none;
	}

	.pac-item {
		padding: 0.4rem;
		span {
			font-family: "Nunito Regular";
			font-size: 1.4rem;
			color: var(--night-50);
			font-weight: normal;
		}
		.pac-item-query {
			font-family: "Nunito Bold";
			font-size: 1.4rem;
			color: var(--night-100);
			font-weight: normal;
			.pac-matched {
				font-family: "Nunito Bold";
				font-size: 1.4rem;
				color: var(--night-100);
				font-weight: normal;
			}
		}
	}
	/* @media (max-width: 740px) {
		body {
			overflow: hidden;
		}
	} */
`;

export default GlobalStyles;
