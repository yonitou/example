import BaseSkeleton from "@Components/BaseSkeleton";
import styled from "styled-components";
import { Wrapper } from "./PlanCard";

const NUM_ITEMS = 4;

const LoadingWrapper = styled(Wrapper)`
	gap: 1.6rem;
`;

const SmallItem = styled(BaseSkeleton)`
	height: 10rem;
`;

const BigItem = styled(BaseSkeleton)`
	height: 72rem;
`;

const MiddleItem = styled(BaseSkeleton)`
	height: 16rem;
`;

const Skeleton = (): JSX.Element => {
	return (
		<>
			{Array.from({ length: NUM_ITEMS }).map((_, i) => {
				const key = i;
				return (
					<LoadingWrapper key={key}>
						<SmallItem />
						<MiddleItem />
						<BigItem />
					</LoadingWrapper>
				);
			})}
		</>
	);
};

export default Skeleton;
