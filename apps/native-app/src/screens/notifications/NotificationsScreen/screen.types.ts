import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { notificationGroupType } from "@Types/notification.types";

export interface NotificationsContainerProps {
	navigation: NativeStackNavigationProp<ParamListBase>;
}
export interface NotificationsScreenProps {
	onNavBack: () => void;
	notifications: notificationGroupType[];
	handleDelete: (id: number) => void;
	loading: boolean;
}
