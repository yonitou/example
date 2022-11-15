import { SNACKBAR_COLORS } from "@Constants/palette";
import { createContext, useState, useCallback, useMemo } from "react";
import styled from "styled-components";

export enum snackbarTypeEnum {
	ERROR = "ERROR",
	SUCCESS = "SUCCESS",
	INFO = "INFO",
}
interface SnackbarContextProps {
	showSnackbar?: (text: string, type: snackbarTypeEnum, duration?: number) => void;
}

const StyledSnackbar = styled.div<{ color: string; duration: number }>`
	visibility: hidden;
	background-color: ${(props) => props.color};
	padding: 0.8rem 1.6rem;
	color: var(--white);
	text-align: center;
	border-radius: 0.4rem;
	text-align: center;
	position: fixed;
	z-index: 10;
	right: 10rem;
	bottom: 3rem;
	h3 {
		white-space: pre-wrap;
	}
	&.show {
		visibility: visible !important;
		animation: fadein 0.5s, fadeout 0.5s ${(props) => props.duration - 0.5}s;
	}

	@keyframes fadein {
		from {
			bottom: 0;
			opacity: 0;
		}
		to {
			bottom: 3rem;
			opacity: 1;
		}
	}

	@keyframes fadeout {
		from {
			bottom: 3rem;
			opacity: 1;
		}
		to {
			bottom: 0;
			opacity: 0;
		}
	}
`;

export const SnackbarContext = createContext<SnackbarContextProps>({});

const SnackbarProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
	const [show, setShow] = useState<boolean>(false);
	const [text, setText] = useState<string>();
	const [type, setType] = useState<snackbarTypeEnum>();
	const [duration, setDuration] = useState<number>();
	const showSnackbar = useCallback((snackText: string, snackType: snackbarTypeEnum, durationValue = 6): void => {
		setShow(false);
		setText(snackText);
		setType(snackType);
		setDuration(durationValue);
		setShow(true);
		setTimeout(() => {
			setShow(false);
		}, durationValue * 1000);
	}, []);

	const value = useMemo(
		() => ({
			showSnackbar,
		}),
		[showSnackbar]
	);

	return (
		<SnackbarContext.Provider value={value}>
			{children}
			<StyledSnackbar color={SNACKBAR_COLORS[type]} className={show ? "show" : null} duration={duration}>
				<h3>{text}</h3>
			</StyledSnackbar>
		</SnackbarContext.Provider>
	);
};

export default SnackbarProvider;
