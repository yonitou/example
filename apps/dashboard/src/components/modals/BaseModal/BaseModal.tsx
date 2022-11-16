import styled from "styled-components";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import Button from "../../Button";

const StyledModal = styled(Dialog)`
	border-radius: 1.6rem;
	padding: 3.2rem 6.4rem;
	h2 {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	.content {
		margin: 1.6rem 0;
	}
	.ctas {
		display: flex;
		align-items: center;
		button {
			flex: 1;
		}

		&.full-width {
			width: 100%;
			button:first-child {
				margin-right: 1rem;
			}
			button:last-child {
				margin-left: 1rem;
			}
		}
	}
`;

interface BaseModalPropsType {
	modalVisible: boolean;
	hideModal: () => void;
	title: string;
	confirmBtnText: string;
	colorConfirmBtn: "tangerine" | "lake" | "gaspacho";
	confirmBtnLoading?: boolean;
	onConfirm?: () => void;
	confirmBtnIcon?: JSX.Element;
	cancelBtnText?: string;
	colorCancelBtn?: "tangerine" | "lake" | "gaspacho";
	onCancel?: () => void;
	customBtnText?: string;
	colorCustomBtn?: "tangerine" | "lake" | "gaspacho";
	onCustom?: () => void;
	customBtnIcon?: JSX.Element;
	btnConfirmFullWidth?: boolean;
	closeAfterConfirm?: boolean;
	confirmBtnDisabled?: boolean;
	sideBySideButtons?: boolean;
	children: JSX.Element | JSX.Element[];
}
const BaseModal = ({
	modalVisible,
	hideModal,
	title,
	onCancel,
	onConfirm,
	confirmBtnDisabled = false,
	closeAfterConfirm = true,
	confirmBtnText,
	customBtnText,
	onCustom,
	cancelBtnText,
	children,
	btnConfirmFullWidth,
	colorCustomBtn = "lake",
	colorCancelBtn = "tangerine",
	colorConfirmBtn,
	confirmBtnLoading,
	sideBySideButtons = false,
	customBtnIcon,
	confirmBtnIcon,
}: BaseModalPropsType): JSX.Element => {
	const onClickCancel = (): void => {
		onCancel && onCancel();
		hideModal();
	};
	const onClickConfirm = (): void => {
		onConfirm && onConfirm();
		if (closeAfterConfirm) hideModal();
	};

	const onClickOnCenterButton = (): void => {
		onCustom && onCustom();
		hideModal();
	};

	const getWidthConfirmBtn = (): string => {
		if (sideBySideButtons) return "48%";
		if (btnConfirmFullWidth) return "100%";
		return "auto";
	};

	return (
		<StyledModal
			isOpen={modalVisible}
			aria-labelledby="alert-dialog-title"
			onDismiss={hideModal}
			initialFocusRef={undefined}
		>
			<h2>{title}</h2>
			<div className="content">{children}</div>
			<div className={`ctas ${btnConfirmFullWidth || sideBySideButtons ? "full-width" : undefined}`}>
				{cancelBtnText && onCancel && (
					<Button outlined color={colorCancelBtn} onClick={onClickCancel} text={cancelBtnText} />
				)}
				{customBtnText && onCustom && (
					<Button
						color={colorCustomBtn}
						onClick={onClickOnCenterButton}
						text={customBtnText}
						icon={customBtnIcon}
					/>
				)}
				<Button
					disabled={confirmBtnDisabled}
					width={getWidthConfirmBtn()}
					loading={confirmBtnLoading}
					color={colorConfirmBtn}
					onClick={onClickConfirm}
					text={confirmBtnText}
					icon={confirmBtnIcon}
				/>
			</div>
		</StyledModal>
	);
};

export default BaseModal;
