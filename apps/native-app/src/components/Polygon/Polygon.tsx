import { useState, useEffect } from "react";

import { Polygon as NativePolygon } from "react-native-maps";

interface PolygonProps {
	strokeWidth: number;
	strokeColor: string;
	fillColor: string;
	onLayout: () => void;
	onPress?: () => void;
	tappable: boolean;
	coordinates: { latitude: number; longitude: number }[];
}

const Polygon = ({
	strokeWidth,
	strokeColor,
	fillColor,
	onLayout,
	tappable,
	onPress,
	coordinates,
}: PolygonProps): JSX.Element => {
	const [_fillColor, setFillColor] = useState(fillColor);
	const [_strokeColor, setStrokeColor] = useState(strokeColor);

	useEffect(() => {
		setFillColor(fillColor);
		setStrokeColor(strokeColor);
	}, [fillColor, strokeColor]);

	return (
		<NativePolygon
			strokeWidth={strokeWidth}
			strokeColor={_strokeColor}
			fillColor={_fillColor}
			onLayout={onLayout}
			tappable={tappable}
			onPress={onPress}
			coordinates={coordinates}
		/>
	);
};

export default Polygon;
