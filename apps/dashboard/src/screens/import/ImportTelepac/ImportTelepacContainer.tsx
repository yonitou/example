import { useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { sendFileToS3AndWaitForImportToFinish } from "@Utils/s3";
import { UserContext } from "@Context/UserContext";
import { ModalsContext } from "@Context/ModalContext";
import ImportTelepac from "./ImportTelepac";

const ImportContainer = (): JSX.Element => {
	const { refetchFields, fields, defaultFarm } = useContext(UserContext);
	const { setConfirmOverwriteModalProps } = useContext(ModalsContext);

	const navigate = useNavigate();

	const [isImporting, setIsImporting] = useState<boolean>(false);
	const [inputFile, setInputFile] = useState<File>();
	const [error, setError] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const [overwrite, setOverwrite] = useState<boolean>(true);
	const isMounted = useRef(true);
	const methods = useForm();

	const handleChangeDropzone = (file?: File): void => setInputFile(file);

	const doImport = async (overwriteValue: boolean): Promise<void> => {
		try {
			await sendFileToS3AndWaitForImportToFinish({
				farmId: defaultFarm.id,
				overwrite: overwriteValue,
				file: inputFile,
			});
			if (isMounted.current) {
				setSuccess(true);
				await refetchFields();
			}
		} catch (e) {
			setError(true);
			throw e;
		}
		setIsImporting(false);
	};

	const onCancelOverwrite = (): void => setIsImporting(false);

	const backFromError = (): void => setError(false);

	const retryImport = (): void => {
		backFromError();
		setIsImporting(true);
		doImport(overwrite);
	};

	const showAddOrOverwriteModal = (): void => {
		setConfirmOverwriteModalProps({
			visibility: true,
			props: {
				onConfirmClick: () => {
					setOverwrite(false);
					doImport(false);
				},
				onCancelClick: onCancelOverwrite,
				onClickCenterButton: () => {
					setOverwrite(true);
					doImport(true);
				},
			},
		});
	};

	const handleImportWithExistingUser = async (): Promise<void> => {
		setIsImporting(true);
		if (fields.length === 0) {
			setOverwrite(true);
			doImport(true);
		} else {
			showAddOrOverwriteModal();
		}
	};

	const goBack = (): void => navigate(-1);

	const goToDashboard = (): void => navigate("/");

	return (
		<ImportTelepac
			error={error}
			success={success}
			enableButton={Boolean(inputFile)}
			handleImport={handleImportWithExistingUser}
			isImporting={isImporting}
			handleChangeDropzone={handleChangeDropzone}
			inputFile={inputFile}
			backFromError={backFromError}
			retryImport={retryImport}
			goToDashboard={goToDashboard}
			goBack={goBack}
			defaultFarm={defaultFarm}
			methods={methods}
		/>
	);
};

export default ImportContainer;
