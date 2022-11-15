import BaseSkeleton from "@Components/BaseSkeleton";
import styled from "styled-components";

const WithMarginItem = styled(BaseSkeleton)`
	margin-bottom: 1.6rem;
`;

const SmallItem = styled(WithMarginItem)`
	height: 1.4rem;
	width: 10%;
`;

const BigItem = styled(WithMarginItem)`
	height: 3.8rem;
	width: 100%;
	border-radius: 0.8rem;
`;

const Skeleton = (): JSX.Element => {
	return (
		<>
			<SmallItem />
			<BigItem />
			<BigItem />
			<SmallItem />
			<BigItem />
			<BigItem />
			<BigItem />
			<SmallItem />
			<BigItem />
		</>
	);
};

export default Skeleton;
