import styled from "styled-components";

const Skeleton = styled.div`
	background-color: var(--night-5);
	overflow: hidden;
	position: relative;
	width: 100%;
	height: 100%;
	border-radius: 0.8rem;
	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--gradient-skeleton);
		animation: loading 0.7s infinite linear;
	}

	@keyframes loading {
		0% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(0%);
		}
	}
`;

export default Skeleton;
