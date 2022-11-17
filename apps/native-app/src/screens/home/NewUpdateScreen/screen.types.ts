export interface NewUpdateContainerProps {
	onError: () => void;
}

export interface NewUpdateScreenProps {
	updating: boolean;
	doUpdate: () => Promise<void>;
}
