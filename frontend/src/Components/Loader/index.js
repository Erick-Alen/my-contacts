import PropTypes from 'prop-types';
import React from 'react';
import ReactPortal from '../ReactPortal';
import Spinner from '../Spinner';
import * as S from './styled';

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
