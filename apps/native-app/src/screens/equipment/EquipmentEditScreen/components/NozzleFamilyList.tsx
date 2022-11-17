import { ScrollView } from "react-native";
import { nozzleFamilyEnum, nozzleFamilyList } from "@Types/nozzle.types";
import NozzleFamilyButton from "./NozzleFamilyButton";

interface NozzleFamilyListProps {
	familySelected: nozzleFamilyEnum;
	onPress: (f: nozzleFamilyEnum) => void;
}
const NozzleFamilyList = ({ familySelected, onPress }: NozzleFamilyListProps): JSX.Element => (
	<ScrollView showsHorizontalScrollIndicator={false} horizontal>
		{nozzleFamilyList.map((family) => {
			return (
				<NozzleFamilyButton
					key={family}
					family={family}
					selected={family === familySelected}
					onPress={onPress}
				/>
			);
		})}
	</ScrollView>
);

export default NozzleFamilyList;
