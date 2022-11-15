import styled from "styled-components";
import Button from "@Components/Button";

const StyledEmptyState = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0 3rem;
	position: relative;

	text-align: center;
	img {
		margin-bottom: 1.8rem;
	}
	.subtitle {
		color: var(--night-50);
		margin: 1rem 0;
	}
	button:last-child {
		margin-top: 1.8rem;
	}
`;

interface EmptyStateProps {
	image: "string";
	altImage: string;
	title: string;
	subtitle: string;
	onClickBtn?: () => void;
	onClickSecondaryBtn?: () => void;
	btnText?: string;
	secondaryBtnText?: string;
	btnIcon?: JSX.Element;
	secondaryBtnIcon?: JSX.Element;
	children?: JSX.Element | JSX.Element[];
}

const EmptyState = ({
	image,
	altImage,
	title,
	subtitle,
	onClickBtn,
	btnText,
	children,
	onClickSecondaryBtn,
	secondaryBtnText,
	btnIcon,
	secondaryBtnIcon,
}: EmptyStateProps): JSX.Element => {
	return (
		<StyledEmptyState>
			<img src={image} width={200} alt={altImage} />
			<h3>{title}</h3>
			<h3 className="subtitle">{subtitle}</h3>
			{/* </Box> */}
			{btnText && <Button color="lake" onClick={onClickBtn} icon={btnIcon} text={btnText} />}
			{secondaryBtnText && (
				<Button
					color="lake"
					outlined
					onClick={onClickSecondaryBtn}
					icon={secondaryBtnIcon}
					text={secondaryBtnText}
				/>
			)}
			{children}
		</StyledEmptyState>
	);
};

export default EmptyState;
