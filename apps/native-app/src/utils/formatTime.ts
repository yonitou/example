const formatTime = (dt: Date, separator: string): string => {
	const d = new Date(dt);
	return `${d.getHours()}${separator || ":"}${`0${d.getMinutes()}`.slice(-2)}`;
};

export default formatTime;
