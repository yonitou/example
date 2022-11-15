import {
	createContext,
	Dispatch,
	RefObject,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	createRef,
} from "react";
import { deleteField, patchFields } from "@Api/api";
import { cropType } from "@Types/crops.types";
import { fieldType, updateFieldType } from "@Types/fields.types";
import { newFieldType } from "@Types/newFieldTypes";
import { UserContext } from "./UserContext";

export enum ModeEnum {
	FIELD_LIST = "FIELD_LIST",
	NEW_FIELD = "NEW_FIELD",
	UPDATE_FIELD = "UPDATE_FIELD",
	CROPS_LIST = "CROPS_LIST",
}

interface CropsScreenContextProps {
	selectedFields: fieldType[];
	fieldsRef: { [x: number]: RefObject<HTMLDivElement> };
	setSelectedFields: Dispatch<SetStateAction<fieldType[]>>;
	updateFields: (fieldsToUpdate: updateFieldType[]) => Promise<void>;
	crops: cropType[];
	selectedCrop: cropType;
	setSelectedCrop: Dispatch<SetStateAction<cropType>>;
	clickedCoordonates: number[][];
	setClickedCoordonates: Dispatch<SetStateAction<number[][]>>;
	fields: fieldType[];
	multiSelectionEnabled: boolean;
	setMultiSelectionEnabled: (b: boolean) => void;
	resetSelection: () => void;
	deleteFieldById: (fieldId: number) => Promise<void>;
	currentMode: ModeEnum;
	setCurrentMode: Dispatch<SetStateAction<ModeEnum>>;
	newCreatedFields: newFieldType[];
	setNewCreatedFields: Dispatch<SetStateAction<newFieldType[]>>;
	createNewFieldValues: newFieldType;
	setCreateNewFieldValues: Dispatch<SetStateAction<newFieldType>>;
	loading: boolean;
}

export const CropsScreenContext = createContext<CropsScreenContextProps>({} as CropsScreenContextProps);

export const CropsScreenProvider = ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element => {
	const [selectedFields, setSelectedFields] = useState<fieldType[]>([]);
	const [selectedCrop, setSelectedCrop] = useState<cropType>();
	const [clickedCoordonates, setClickedCoordonates] = useState<number[][]>(undefined);
	const [currentMode, setCurrentMode] = useState<ModeEnum>(ModeEnum.FIELD_LIST);
	const [newCreatedFields, setNewCreatedFields] = useState<newFieldType[]>([]);
	const [createNewFieldValues, setCreateNewFieldValues] = useState<newFieldType>();

	const { fields, crops, refetchFields, defaultFarm, loading } = useContext(UserContext);

	const [multiSelectionEnabled, setMultiSelectionEnabled] = useState<boolean>(false);
	const fieldsRef = fields.reduce((acc: { [x: number]: RefObject<HTMLDivElement> }, value) => {
		acc[value.id] = createRef();
		return acc;
	}, {});

	const updateFields = useCallback(
		async (newFields: updateFieldType[]): Promise<void> => {
			await patchFields(newFields, defaultFarm.id);
		},
		[defaultFarm]
	);

	const resetSelection = useCallback((): void => {
		setMultiSelectionEnabled(false);
		setSelectedFields([]);
		setCurrentMode(ModeEnum.FIELD_LIST);
	}, [setSelectedFields]);

	const deleteFieldById = useCallback(
		async (fieldId: number): Promise<void> => {
			await deleteField(defaultFarm.id, fieldId);
			resetSelection();
			await refetchFields();
		},
		[defaultFarm, refetchFields, resetSelection]
	);

	useEffect(() => {
		resetSelection();
	}, [defaultFarm, resetSelection]);

	const value = useMemo(
		() => ({
			selectedFields,
			setSelectedFields,
			updateFields,
			crops,
			selectedCrop,
			setSelectedCrop,
			fields,
			multiSelectionEnabled,
			setMultiSelectionEnabled,
			resetSelection,
			loading,
			fieldsRef,
			deleteFieldById,
			clickedCoordonates,
			setClickedCoordonates,
			currentMode,
			setCurrentMode,
			newCreatedFields,
			setNewCreatedFields,
			createNewFieldValues,
			setCreateNewFieldValues,
		}),
		[
			selectedFields,
			updateFields,
			fieldsRef,
			crops,
			selectedCrop,
			fields,
			multiSelectionEnabled,
			resetSelection,
			loading,
			deleteFieldById,
			clickedCoordonates,
			currentMode,
			newCreatedFields,
			createNewFieldValues,
		]
	);

	return <CropsScreenContext.Provider value={value}>{children}</CropsScreenContext.Provider>;
};
