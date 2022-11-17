import Svg, { Path } from "react-native-svg";
import SVGminifier from "@Utils/SVGMinifier";

interface ParcelSVGProps {
	path: string;
	width: string | number;
	height: string | number;
	stroke?: string;
	fill?: string;
}
const ParcelSVG = ({ path, height, width, stroke, fill }: ParcelSVGProps): JSX.Element => {
	const minifiedSVG = new SVGminifier(path);
	return (
		minifiedSVG.getViewportAsString() !== "" && (
			<Svg height={height} width={width} viewBox={minifiedSVG.getViewportAsString()}>
				<Path
					d={minifiedSVG.getMinifiedPath()}
					strokeWidth={1}
					stroke={stroke}
					fill={fill}
					vectorEffect="nonScalingStroke"
				/>
			</Svg>
		)
	);
};

export default ParcelSVG;
