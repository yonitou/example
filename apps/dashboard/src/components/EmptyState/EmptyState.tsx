import Button from "@Components/Button";
import styled from "styled-components";

interface EmptyStateProps {
	illustration: JSX.Element;
	title: string;
	description: string;
	grey?: boolean;
	onClick?: () => void;
	btnIcon?: JSX.Element;
	btnText?: string;
}

const StyledEmptyState = styled.div`
	display: flex;
	align-items: center;
	.text-wrapper {
		margin-left: 1.6rem;
	}
	.grey-text {
		color: var(--night-50);
	}
	button {
		margin-top: 1.6rem;
	}
`;

const EmptyState = ({
	illustration,
	title,
	description,
	grey,
	onClick,
	btnIcon,
	btnText,
}: EmptyStateProps): JSX.Element => {
	return (
		<StyledEmptyState>
			{illustration}
			<div className="text-wrapper">
				<h2 className={grey ? `grey-text` : null}>{title}</h2>
				<h4 className={grey ? `grey-text` : null}>{description}</h4>
				{onClick && <Button color="tangerine" text={btnText} onClick={onClick} icon={btnIcon} />}
			</div>
		</StyledEmptyState>
	);
};

export default EmptyState;
