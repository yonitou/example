import { targetType } from "@Types/target.types";
import styled from "styled-components";

interface TargetIconProps {
	target: targetType;
	fill: string;
	width?: number;
	height?: number;
}

const StyledTargetIcon = styled.div<Omit<TargetIconProps, "target">>`
	height: ${(props) => props.height}px;
	width: ${(props) => props.width}px;
	margin-right: 0.8rem;
	svg {
		fill: ${(props) => props.fill};
		height: 100%;
		width: 100%;
	}
`;

const TargetIcon = ({ target, fill, width = 24, height = 24 }: TargetIconProps): JSX.Element => {
	if (!target?.svg) return null;
	return (
		<StyledTargetIcon fill={fill} width={width} height={height} dangerouslySetInnerHTML={{ __html: target.svg }} />
	);
};

export default TargetIcon;
