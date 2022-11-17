import { VictoryAreaProps } from "victory-area";
import { VictoryArea, VictoryChart, VictoryAxis } from "victory-native";
import { XYType } from "@Types/realtimescreen.types";
import formatTime from "@Utils/formatTime";
import COLORS from "@Constants/palette";
import { Dimensions } from "react-native";

import { LinearGradient, Defs, Stop } from "react-native-svg";

interface DomainType {
	y: number[];
}

interface ChartProps {
	data: XYType[];
	yUnit: string;
	paddingLeft?: number;
}

const Chart = ({ data, yUnit, paddingLeft = 50 }: ChartProps): JSX.Element => {
	// data = [
	// 	{ x: new Date("2022-06-14T18:00:27.126Z"), y: 11.51 },
	// 	{ x: new Date("2022-06-14T18:01:27.126Z"), y: 11.53 },
	// 	{ x: new Date("2022-06-14T18:02:27.126Z"), y: 11.57 },
	// 	{ x: new Date("2022-06-14T18:03:27.126Z"), y: 11.598 },
	// 	{ x: new Date("2022-06-14T18:04:27.126Z"), y: 11.52 },
	// 	{ x: new Date("2022-06-14T18:05:27.126Z"), y: 11.58 },
	// 	{ x: new Date("2022-06-14T18:06:27.126Z"), y: 12.05 },
	// 	{ x: new Date("2022-06-14T18:07:27.126Z"), y: 11.18 },
	// 	{ x: new Date("2022-06-14T18:08:27.126Z"), y: 11.45 },
	// 	{ x: new Date("2022-06-14T18:40:27.126Z"), y: 11.51 },
	// 	{ x: new Date("2022-06-14T18:41:27.126Z"), y: 11.17 },
	// 	{ x: new Date("2022-06-14T18:42:27.126Z"), y: 11.01 },
	// 	{ x: new Date("2022-06-14T18:43:27.126Z"), y: 11.51 },
	// 	{ x: new Date("2022-06-14T18:44:27.126Z"), y: 11.51 },
	// ];

	const getDomain = (): DomainType => {
		const min = data?.length && Math.min(...data.map((d) => d.y));
		const max = data?.length && Math.max(...data.map((d) => d.y));

		return { y: [min, max] };
	};

	const getAreaData = (): VictoryAreaProps["data"] => {
		return data.map((d) => {
			return {
				...d,
				y0: getDomain().y[0],
			};
		});
	};

	return (
		<VictoryChart
			scale={{ x: "time" }}
			width={Dimensions.get("window").width - 32}
			padding={{ left: paddingLeft, bottom: 30 }}
			height={220}
			style={{
				background: {
					fill: "url(#gradientFill)",
				},
			}}
			domainPadding={{ x: [10, 10], y: [5, 10] }}
		>
			<Defs>
				<LinearGradient id="gradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
					<Stop offset="0%" stopColor="#FCFDFD" />
					<Stop offset="100%" stopColor="#F8FAFB" />
				</LinearGradient>
			</Defs>
			<VictoryAxis
				dependentAxis
				crossAxis={false}
				style={{
					grid: {
						stroke: COLORS.NIGHT[10],
					},
					ticks: { stroke: "black", strokeWidth: 0 },
					tickLabels: { fontSize: 16, color: COLORS.NIGHT[100] },
					axis: { strokeWidth: 0 },
				}}
				tickFormat={(y) => `${y}${yUnit}`}
			/>

			{data?.length > 0 && (
				<VictoryAxis
					offsetY={30}
					tickFormat={(x) => formatTime(x, "h")}
					style={{
						axis: { strokeWidth: 0 },
						tickLabels: { fontSize: 14, color: COLORS.NIGHT[100] },
					}}
				/>
			)}
			{data?.length > 0 && (
				<VictoryArea
					style={{
						data: {
							fill: "transparent",
							stroke: COLORS.LAKE[100],
							strokeWidth: 3,
						},
					}}
					domain={getDomain() as VictoryAreaProps["domain"]}
					data={getAreaData()}
				/>
			)}
		</VictoryChart>
	);
};

export default Chart;
