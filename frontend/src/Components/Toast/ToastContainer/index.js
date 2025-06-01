/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { useAnimatedList } from '../../../hooks/useAnimatedList';
import { toastEventManager } from '../../../utils/notification';
import ToastMessage from '../ToastMessage';
import * as S from './styled';

export default function ToastContainer() {
	const {
		renderList,
		setItems,
		handleRemoveItem,
	} = useAnimatedList([]);

	useEffect(() => {
		const handleAddToast = ({ type, text, duration }) => {
			setItems((prev) => [
				...prev,
				{ id: Math.random(), type, text, duration },
			]);
		};
		toastEventManager.on('addtoast', handleAddToast);

		return () => {
			toastEventManager.removeListener('addtoast', handleAddToast);
		};
	}, [setItems]);



	return (
		<S.Container>
			{renderList((message, { isLeaving, animatedRef } ) =>
				<ToastMessage
					key={message.id}
					message={message}
					onRemoveMessage={handleRemoveItem}
					isLeaving={isLeaving}
					animatedRef={animatedRef}
				/>
			)}
		</S.Container>
	);
}
