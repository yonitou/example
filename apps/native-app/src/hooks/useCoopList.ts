import { getCoops } from "@Api/hygoApi";
import { coopType } from "@Types/coop.types";
import { useEffect, useState } from "react";

interface UseCoopsListReturnType {
	coops: coopType[];
}
export const useCoopsList = (): UseCoopsListReturnType => {
	const [coops, setCoops] = useState<coopType[]>([]);

	useEffect(() => {
		const getCoopsList = async (): Promise<void> => {
			const fetchedCoops = await getCoops();
			const fetchedCoopsSorted = fetchedCoops?.sort((a, b) => a.name.localeCompare(b.name));
			setCoops(fetchedCoopsSorted);
		};
		getCoopsList();
	}, []);
	return {
		coops,
	};
};
