const capitalize = (w: string): string => {
	return `${w?.charAt(0).toUpperCase()}${w?.toLowerCase().slice(1)}`;
};

export default capitalize;
