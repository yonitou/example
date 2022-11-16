import styled from "styled-components";
import { useCallback, MouseEvent } from "react";
import { useDropzone } from "react-dropzone";
import BaseIcons from "@Icons/BaseIcons";
import { Trans, useTranslation } from "react-i18next";

const StyledDropzoneWrapper = styled.div`
	> div {
		border: 1px solid var(--lake-100);
		border-radius: 0.4rem;
		min-height: 10rem;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 1rem;
		background-color: var(--gradient-background-2);
		cursor: pointer;
		.placeholder {
			text-align: center;
			color: var(--lake-100);
		}
		.file-wrapper {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex: 1;
			.filename {
				display: flex;
				align-items: center;
				color: var(--lake-100);
				svg {
					margin-right: 1rem;
				}
			}
		}
	}
	.error {
		margin-top: 0.8rem;
		color: var(--gaspacho-100);
	}
`;
interface ImportDropzoneProps {
	onChange: (file?: File) => void;
	file?: File;
	className?: string;
}
const ImportDropzone = ({ onChange, file, className }: ImportDropzoneProps): JSX.Element => {
	const { t } = useTranslation();
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			onChange(acceptedFiles[0]);
		},
		[onChange]
	);
	const validator = (testedFile: File): { code: string; message: string } => {
		const acceptedExtensions = /^[^.]+.(edi|xml|dap)$/;
		return acceptedExtensions.test(testedFile.name)
			? null
			: {
					code: "fileType",
					message: t("screens.importTelepac.dropzone.fileTypeError"),
			  };
	};
	const { fileRejections, getRootProps, getInputProps } = useDropzone({
		onDrop,
		multiple: false,
		validator,
	});
	const clearInput = (event: MouseEvent<SVGSVGElement>): void => {
		event.stopPropagation();
		event.preventDefault();
		onChange(undefined);
	};

	return (
		<StyledDropzoneWrapper {...getRootProps({ style: { outline: "none" } })} className={className}>
			<div>
				<input {...getInputProps()} />
				{file ? (
					<div className="file-wrapper">
						<p className="filename">
							<BaseIcons.File width={24} height={24} /> {file?.name}
						</p>
						<BaseIcons.Clear onClick={clearInput} width={24} height={24} />
					</div>
				) : (
					<h3 className="placeholder">
						<Trans i18nKey="screens.importTelepac.dropzone.placeholder">
							Déposez votre fichier parcellaire ou cliquez ici ! <br />
							(fichier .xml ou .edi ou .dap)
						</Trans>
					</h3>
				)}
			</div>
			{fileRejections.length > 0 && <p className="error">{fileRejections[0].errors[0].message}</p>}
		</StyledDropzoneWrapper>
	);
};

export default ImportDropzone;
