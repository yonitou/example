import { useEffect, useCallback, useRef } from "react";

const useAbortController = (): (() => AbortSignal) => {
	const abortControllerRef = useRef<AbortController>();

	useEffect(() => {
		return () => {
			abortControllerRef.current?.abort();
		};
	}, []);

	const getSignal = useCallback(() => {
		if (!abortControllerRef.current) {
			abortControllerRef.current = new AbortController();
		}
		return abortControllerRef.current.signal;
	}, []);

	return getSignal;
};

export default useAbortController;
