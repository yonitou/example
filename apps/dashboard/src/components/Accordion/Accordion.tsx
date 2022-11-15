import BaseIcons from "@Icons/BaseIcons";
import classNames from "classnames";
import { useEffect, useState } from "react";
import styled from "styled-components";

const TRANSITION_DURATION = 500;

const StyledAccordion = styled.div`
	background-color: var(--white);
	border-radius: 0.4rem;
	&.need-check {
		border: 1px solid var(--gaspacho-100);
	}
	.accordion-title {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.6rem;
		border-radius: 0.4rem;
		svg.chevron {
			transform: rotate(-90deg);
			transition: transform ${TRANSITION_DURATION}ms ease-out;
		}
		&.open {
			border-radius: 0.4rem 0.4rem 0 0;
			svg.chevron {
				transform: rotate(0deg);
			}
		}
		&:hover {
			background-color: var(--night-10);
		}
	}
	.accordion-content {
		overflow: hidden;
		max-height: 1000rem;
		border-radius: 0 0 0.4rem 0.4rem;
		transition: max-height ${TRANSITION_DURATION}ms ease-in-out;
		.content-wrapper {
			padding: 1.6rem;
		}
	}

	.accordion-content[aria-expanded="true"] {
		margin-top: 0;
		max-height: 0;
		transition: max-height ${TRANSITION_DURATION}ms cubic-bezier(0, 1, 0, 1);
	}
`;

interface AccordionProps {
	summary: JSX.Element;
	children: JSX.Element | JSX.Element[];
	chevronColor: string;
	needCheck?: boolean;
	className?: string;
	onOpen?: () => void;
	opened?: boolean;
}

const Accordion = ({
	opened,
	summary,
	children,
	className,
	chevronColor,
	onOpen,
	needCheck,
}: AccordionProps): JSX.Element => {
	const [open, setOpen] = useState(opened);

	const onClick = (): void => {
		setOpen(!open);
		setTimeout(() => {
			if (!open) onOpen && onOpen();
		}, TRANSITION_DURATION);
	};

	useEffect(() => {
		setOpen(opened);
	}, [opened]);

	return (
		<StyledAccordion className={classNames(className, needCheck ? "need-check" : null)}>
			<div
				className={`accordion-title ${open ? "open" : null}`}
				onClick={onClick}
				role="button"
				onKeyDown={onClick}
				tabIndex={0}
			>
				{summary}
				<BaseIcons.Chevron className="chevron" width={24} height={24} fill={chevronColor} />
			</div>

			<div className="accordion-content" aria-expanded={!open}>
				<div className="content-wrapper">{children}</div>
			</div>
		</StyledAccordion>
	);
};

export default Accordion;
