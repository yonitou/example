export const sortArrayByAlphabet = (property?: string): ((a: unknown, b: unknown) => number) => {
	const arrayOfString = (prop1: string, prop2: string): number => {
		const nameA = prop1.toUpperCase(); // ignore upper and lowercase
		const nameB = prop2.toUpperCase(); // ignore upper and lowercase
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		// names must be equal
		return 0;
	};
	const arrayOfObject = (prop1: Record<string, string>, prop2: Record<string, string>): number => {
		const nameA = prop1[property].toUpperCase(); // ignore upper and lowercase
		const nameB = prop2[property].toUpperCase(); // ignore upper and lowercase
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		// names must be equal
		return 0;
	};
	return property ? arrayOfObject : arrayOfString;
};
