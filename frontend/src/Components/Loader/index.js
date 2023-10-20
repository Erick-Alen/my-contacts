import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Spinner from '../Spinner';
import * as S from './styled';
import ReactPortal from '../ReactPortal';

export default function Loader({ isLoading }) {
	if (!isLoading) {
		return null;
	}
	
	return (
		<ReactPortal>
			<S.Overlay>
				<Spinner size={90} />
			</S.Overlay>,
		</ReactPortal>
	);
}
Loader.propTypes = {
	isLoading: PropTypes.bool.isRequired
};
