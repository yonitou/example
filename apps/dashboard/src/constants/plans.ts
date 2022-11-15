import conditionsImage from "@Assets/pricing/features/conditions.png";
import farmWeatherImage from "@Assets/pricing/features/farm_weather.png";
import localWeatherImage from "@Assets/pricing/features/local_weather.png";
import optimizeImage from "@Assets/pricing/features/optimize.png";
import realtimeImage from "@Assets/pricing/features/realtime.png";
import tasksImage from "@Assets/pricing/features/tasks.png";
import tracabilityImage from "@Assets/pricing/features/tracability.png";
import weatherDeviceImage from "@Assets/pricing/features/weather_device.png";
import gpsTrackerImage from "@Assets/pricing/equipments/gps_tracker.png";
import gpsTrackerWithWeatherDeviceImage from "@Assets/pricing/equipments/gps_tracker_with_weather_device.png";
import { featuresEnum } from "@Types/feature.types";
import { equipmentEnum } from "@Types/plan.types";

export const featureDetails = {
	[featuresEnum.LOCAL_WEATHER]: localWeatherImage,
	[featuresEnum.CONDITIONS]: conditionsImage,
	[featuresEnum.FARM_WEATHER]: farmWeatherImage,
	[featuresEnum.REALTIME]: realtimeImage,
	[featuresEnum.TASKS]: tasksImage,
	[featuresEnum.OPTIMIZE]: optimizeImage,
	[featuresEnum.WEATHER_DEVICE]: weatherDeviceImage,
	[featuresEnum.TRACABILITY]: tracabilityImage,
};

export const equipmentPackDetails = {
	[equipmentEnum.GPS_TRACKER_ONLY]: gpsTrackerImage,
	[equipmentEnum.GPS_TRACKER_WITH_WEATHER_DEVICE]: gpsTrackerWithWeatherDeviceImage,
};
