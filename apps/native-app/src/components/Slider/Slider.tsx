import { FC } from "react";
import MultiSlider, { MarkerProps } from "@ptomasroos/react-native-multi-slider";
import HygoIcons from "@Icons/HygoIcons";
import COLORS from "@Constants/palette";

interface SliderProps {
	min: number;
	max: number;
	onValuesChange: (value: number[]) => void;
	values: number[];
	sliderLength?: number;
	customMarker?: FC<MarkerProps>;
	height?: number;
	markerSize: number;
}
const Slider = ({
	min,
	max,
	onValuesChange,
	values,
	markerSize,
	sliderLength,
	customMarker,
	height,
}: SliderProps): JSX.Element => {
	return (
		<MultiSlider
			min={min}
			max={max}
			onValuesChange={onValuesChange}
			values={values}
			allowOverlap
			markerSize={markerSize}
			sliderLength={sliderLength}
			customMarker={customMarker || (() => <HygoIcons.DropOutlined width={32} height={39} />)}
			trackStyle={{
				backgroundColor: COLORS.NIGHT[25],
				height: height || 3,
			}}
			selectedStyle={{ backgroundColor: COLORS.LAKE[100] }}
		/>
	);
};

export default Slider;
