import sunImage from "@Assets/meteo/sunny.png";
import cloudImage from "@Assets/meteo/cloudy.png";
import stormImage from "@Assets/meteo/stormy.png";
import rainImage from "@Assets/meteo/rainy.png";
import snowImage from "@Assets/meteo/snowy.png";

export const PICTO_MAP: Record<string, HTMLImageElement> = {
	SUN: sunImage,
	CLOUD: cloudImage,
	STORM: stormImage,
	RAIN: rainImage,
	SNOW: snowImage,
};
export const PICTO_TO_IMG: Record<string, string> = {
	"1": "SUN",
	"2": "SUN",
	"3": "SUN",
	"4": "SUN",
	"5": "SUN",
	"6": "SUN",
	"7": "SUN",
	"8": "SUN",
	"9": "SUN",
	"10": "CLOUD",
	"11": "CLOUD",
	"12": "CLOUD",
	"13": "SUN",
	"14": "SUN",
	"15": "SUN",
	"16": "CLOUD",
	"17": "CLOUD",
	"18": "CLOUD",
	"19": "CLOUD",
	"20": "CLOUD",
	"21": "CLOUD",
	"22": "CLOUD",
	"23": "RAIN",
	"24": "SNOW",
	"25": "RAIN",
	"26": "SNOW",
	"27": "STORM",
	"28": "STORM",
	"29": "SNOW",
	"30": "STORM",
	"31": "RAIN",
	"32": "SNOW",
	"33": "RAIN",
	"34": "SNOW",
	"35": "RAIN",
};
