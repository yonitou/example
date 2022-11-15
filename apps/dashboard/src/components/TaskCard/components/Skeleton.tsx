import BaseSkeleton from "@Components/BaseSkeleton";
import styled from "styled-components";

const SmallItem = styled(BaseSkeleton)`
	height: 2.4rem;
	width: 18rem;
`;

const Item = styled(BaseSkeleton)`
	height: 100%;
	flex: 1;
`;

const BottomWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 2.4rem;
	height: 35rem;
`;

const MiddleWrapper = styled(BottomWrapper)`
	height: 18em;
	margin-bottom: 2.4rem;
	margin-top: 0.8rem;
`;

const Skeleton = (): JSX.Element => {
	return (
		<>
			<SmallItem />
			<MiddleWrapper>
				<Item />
				<Item />
				<Item />
			</MiddleWrapper>
			<BottomWrapper>
				<Item />
				<Item />
				<Item />
			</BottomWrapper>
		</>
	);
};

export default Skeleton;
