const formatPaddingNumber = (value = 0): string => {
	const str = value.toString();
	return str.padStart(2, "0");
};

export default formatPaddingNumber;
