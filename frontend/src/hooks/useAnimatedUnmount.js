import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnmount(visible) {
	const [shouldrender, setShouldRender] = useState(visible);

	const animationRef = useRef(null);

	useEffect(() => {
		if (visible) {
			setShouldRender(true);
		}

		const handleAnimationEnd = () => {
			setShouldRender(false);
		};

		if (!visible && animationRef.current) {
			animationRef.current.addEventListener('animationend', () => {
				setShouldRender(false);
			});
		}

		return () => {
			if (animationRef.current) {
				animationRef.current.removeEventListener(
					'animationend',
					handleAnimationEnd,
				);
			}
		};
	}, [visible]);
	return {
		shouldrender,
		animationRef,
	};
}
