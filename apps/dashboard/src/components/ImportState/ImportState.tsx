import styled from "styled-components";
import Button from "@Components/Button";

const StyledImportStateContainer = styled.div`
	text-align: center;
	svg {
		margin: 0 auto 3.2rem auto;
	}
	h5 {
		color: var(--night-50);
	}
	button {
		margin-top: 1.6rem;
	}
`;

interface ImportStateProps {
	title: string;
	primaryBtnText: string;
	onClick: () => void;
	onCancel?: () => void;
	subtitle?: string;
	secondaryBtnText?: string;
	Icon: JSX.Element;
}
const ImportState = ({
	onClick,
	onCancel,
	title,
	subtitle,
	primaryBtnText,
	secondaryBtnText,
	Icon,
}: ImportStateProps): JSX.Element => {
	return (
		<StyledImportStateContainer>
			{Icon}
			<h3>{title}</h3>
			{subtitle && <h5>{subtitle}</h5>}
			<Button color="tangerine" onClick={onClick} text={primaryBtnText} />
			{secondaryBtnText && onCancel && (
				<Button color="tangerine" onClick={onCancel} text={secondaryBtnText} outlined />
			)}
		</StyledImportStateContainer>
	);
};

export default ImportState;
