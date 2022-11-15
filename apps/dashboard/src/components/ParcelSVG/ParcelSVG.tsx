import SVGminifier from "@Utils/SVGMinifier";

interface ParcelSVGProps {
	height: string | number;
	width: string | number;
	color: string;
	path: string;
	stroke?: string;
	strokeWidth?: number;
	fillOpacity?: number;
	className?: string;
}
const ParcelSVG = ({
	path,
	height,
	width,
	color,
	stroke,
	strokeWidth,
	fillOpacity,
	className,
}: ParcelSVGProps): JSX.Element => {
	const minifiedSVG = new SVGminifier(path);
	return minifiedSVG.getViewportAsString() !== "" ? (
		<svg height={height} width={width} viewBox={minifiedSVG.getViewportAsString()} className={className}>
			<path
				d={minifiedSVG.getMinifiedPath()}
				stroke={stroke}
				strokeWidth={strokeWidth || 2}
				strokeOpacity={1}
				fill={color}
				fillOpacity={fillOpacity}
				vectorEffect="non-scaling-stroke"
			/>
		</svg>
	) : null;
};

export default ParcelSVG;
