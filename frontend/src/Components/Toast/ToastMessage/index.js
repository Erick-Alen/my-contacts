/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import * as S from './styled';

export default function ToastMessage({ message, onRemoveMessage, isLeaving, animatedRef }) {
	const { id, type, text, duration } = message;

	useEffect(() => {
		const timer = setTimeout(() => {
			onRemoveMessage(id);
		}, duration || 7000);
		return () => clearTimeout(timer);
	}, []);

	const handleRemoveToast = () => {
		onRemoveMessage(id);
	};

	return (
		<S.Container
			isLeaving={isLeaving}
			ref={animatedRef}
			type={type}
			onClick={handleRemoveToast}
			tabIndex={0}
			role='button'
		>
			{type === 'danger' && <img src={xCircleIcon} alt='X'/>}
			{type === 'success' && <img src={checkCircleIcon} alt='Check'/>}
			<strong>
				{text}
			</strong>
		</S.Container>
	);
}

ToastMessage.propTypes = {
	message: PropTypes.shape({
		id: PropTypes.number.isRequired,
		text: PropTypes.string.isRequired,
		duration: PropTypes.number,
		type: PropTypes.oneOf(['success', 'danger', 'default']),
	}).isRequired,
	onRemoveMessage: PropTypes.func.isRequired,
	isLeaving: PropTypes.bool.isRequired,
	animatedRef: PropTypes.shape({
		current: PropTypes.instanceOf(Element),
	}),
};
