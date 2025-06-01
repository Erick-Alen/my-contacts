import { createRef, useCallback, useEffect, useRef, useState } from 'react';

export const useAnimatedList = (initialValue = []) => {
	const [items, setItems] = useState(initialValue);
	const [pendingRemovalItems, setPendingRemovalItems] = useState([]);

	const animatedRefs = useRef(new Map()); // This will hold refs for each animated item
	const animationEndListeners = useRef(new Map());// This will hold listeners for animation end events

	const handleRemoveItem = useCallback((id) => {
		setPendingRemovalItems((prev) => [...prev, id]);
	}, []);

	const handleAnimationEnd = useCallback((id) => {
		const removeListener = animationEndListeners.current.get(id);
		removeListener();

		animationEndListeners.current.delete(id);
		animatedRefs.current.delete(id);

		setItems((prev) => prev.filter((item) => item.id !== id));
		setPendingRemovalItems((prev) => prev.filter((itemId) => itemId !== id));
	}, []);

	useEffect(() => {
		pendingRemovalItems.forEach((itemId) => {
			const animatedRef = animatedRefs.current.get(itemId);
			const animatedElement = animatedRef?.current;
			const alreadyHasListener = animationEndListeners.current.has(itemId);

			if (animatedElement && !alreadyHasListener) {
				const onAnimationEnd = () => handleAnimationEnd(itemId);
				const removeListener = () => {
					animatedElement.removeEventListener('animationend', onAnimationEnd);
				};

				animatedElement.addEventListener('animationend', onAnimationEnd);
				animationEndListeners.current.set(itemId, removeListener);
			}
		});

	}, [pendingRemovalItems, handleAnimationEnd]);

	useEffect(() => {
		return () => {
			animationEndListeners.current.forEach((removeListener) => {
				removeListener();
			});
		};
	}, []);

	// const animatedRef = useRef(null);

	// useEffect(() => {
	// 	const handleAnimationEnd = () => {
	// 		onAnimationEnd(id);
	// 	};

	// 	const elementRef = animatedRef.current;
	// 	if (isLeaving) {
	// 		elementRef.addEventListener('animationEnd', handleAnimationEnd);
	// 	}

	// 	return () => {
	// 		elementRef.removeEventListener('animationEnd', handleAnimationEnd);
	// 	};
	// }, [isLeaving, message.id, onAnimationEnd]);

	const getAnimatedRef = useCallback((id) => {
		let animatedRef = animatedRefs.current.get(id);
		if (!animatedRef) {
			animatedRef = createRef();
			animatedRefs.current.set(id, animatedRef);
		}
		return animatedRef;
	}, []);

	const renderList = useCallback(
		(renderItem) =>
			items.map((item) => {
				const isLeaving = pendingRemovalItems.includes(item.id);
				const animatedRef = getAnimatedRef(item.id);

				return renderItem(item, {
					isLeaving,
					animatedRef
				});
			}),
		[items, pendingRemovalItems, getAnimatedRef]
	);

	return {
		items,
		setItems,
		handleRemoveItem,
		renderList
	};
};
