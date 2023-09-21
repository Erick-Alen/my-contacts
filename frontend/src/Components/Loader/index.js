import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as S from './styled';

export default function Loader({ isLoading }) {
	if (!isLoading) {
		return null;
	}
	return ReactDOM.createPortal(
		<S.Overlay>
			<div className="loader"></div>
		</S.Overlay>,
		document.getElementById('loader-root'),
	);
}
Loader.propTypes = {
	isLoading: PropTypes.bool.isRequired
}
