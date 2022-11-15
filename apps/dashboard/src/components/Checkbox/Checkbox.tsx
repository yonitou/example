import { MouseEvent } from "react";
import { COLORS } from "@Constants/palette";
import BaseIcons from "@Icons/BaseIcons";

import styled from "styled-components";

interface CheckboxProps {
	className?: string;
	checked: boolean;
	isIndeterminate?: boolean;
	onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const StyledCheckboxContainer = styled.div`
	cursor: pointer;
`;

const StyledHiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
	border: 0;
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean; isIndeterminate: boolean }>`
	width: 2.4rem;
	height: 2.4rem;
	background-color: var(--${(props) => (props.isIndeterminate || props.checked ? "tangerine-100" : "white")});
	border-radius: 0.1rem;
	border: ${(props) => (props.isIndeterminate || props.checked ? "none" : "2px solid var(--night-50)")};
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Checkbox = ({ className, checked, isIndeterminate, onClick }: CheckboxProps): JSX.Element => {
	const getCheckboxIcon = (): JSX.Element => {
		if (checked) return <BaseIcons.CheckboxChecked fill={COLORS.WHITE} width={18} height={14} />;
		if (isIndeterminate) return <BaseIcons.CheckboxIndeterminate fill={COLORS.WHITE} width={18} height={3} />;
		return null;
	};

	return (
		<StyledCheckboxContainer className={className} onClick={onClick}>
			<StyledHiddenCheckbox defaultChecked={checked} />
			<StyledCheckbox checked={checked} isIndeterminate={isIndeterminate}>
				{getCheckboxIcon()}
			</StyledCheckbox>
		</StyledCheckboxContainer>
	);
};

export default Checkbox;
