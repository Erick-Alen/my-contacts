import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import * as S from './styled';

export default function ToastMessage({ message, onRemoveMessage }) {
	const { id, type, text, duration } = message;
	useEffect(() => {
		const timer = setTimeout(() => {
			onRemoveMessage(id);
		}, duration || 5000);
		return () => clearTimeout(timer);
	}, []);
	const handleRemoveToast = () => {
		onRemoveMessage(id);
	};
	return (
		<S.Container type={type} onClick={handleRemoveToast} tabIndex={0} role='button'>
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
};
