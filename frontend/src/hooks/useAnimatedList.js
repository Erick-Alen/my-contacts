import { createRef, useCallback, useRef, useState } from 'react';

export const useAnimatedList = (initialValue = []) => {
	const [items, setItems] = useState(initialValue);
	const [pendingRemovalItems, setPendingRemovalItems] = useState([]);
	const animatedRefs = useRef(new Map());

	const handleRemoveItem = useCallback((id) => {
		setPendingRemovalItems((prev) => [...prev, id]);
	}, []);

	const handleAnimationEnd = useCallback((id) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
		setPendingRemovalItems((prev) => prev.filter((itemId) => itemId !== id));
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

	const renderList = useCallback((renderItem) =>
		items.map((item) => {
			const isLeaving = pendingRemovalItems.includes(item.id);
			let animatedRef = animatedRefs.current.get(item.id);
			console.log(animatedRef);

			if (!animatedRef) {
				animatedRef = createRef();
				animatedRefs.current.set(item.id, animatedRef);
			}
			renderItem(
				item, {
					isLeaving,
					animatedRef
				}
			);
		}
		), [items, pendingRemovalItems]);

	return {
		items,
		setItems,
		handleRemoveItem,
		handleAnimationEnd,
		renderList
	};
};
