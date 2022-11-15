import { cropType } from "@Types/crops.types";
import styled from "styled-components";

interface CropIconProps {
	crop: cropType;
	fill: string;
	width?: number;
	height?: number;
}

const StyledCropIcon = styled.div<Omit<CropIconProps, "crop">>`
	height: ${(props) => props.height}px;
	width: ${(props) => props.width}px;
	margin-right: 0.8rem;
	svg {
		fill: ${(props) => props.fill};
		height: 100%;
		width: 100%;
	}
`;

const CropIcon = ({ crop, fill, width = 24, height = 24 }: CropIconProps): JSX.Element => {
	if (!crop?.svg) return null;
	return <StyledCropIcon fill={fill} width={width} height={height} dangerouslySetInnerHTML={{ __html: crop.svg }} />;
};

export default CropIcon;
