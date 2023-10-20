import { useCallback, useEffect, useRef, useState } from 'react';

const useSafeAsyncState = (initialState) => {
	const [state, setState] = useState(initialState);
	const isMounted = useRef(false);
	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	const setSafeAsyncState = useCallback((data) => {
		if (isMounted.current) {
			setState(data);
		}
	}, []);
	return [state, setSafeAsyncState];
};

export default useSafeAsyncState;
