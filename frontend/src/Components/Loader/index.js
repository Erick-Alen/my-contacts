import PropTypes from 'prop-types';
import React from 'react';
import ReactPortal from '../ReactPortal';
import Spinner from '../Spinner';
import * as S from './styled';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

export default function Loader({ isLoading }) {
	const { shouldrender, animationRef } = useAnimatedUnmount(isLoading);
	if (!shouldrender) {
		// If not loading or not rendered, return null
		return null;
	}
	return (
		<ReactPortal>
			<S.Overlay isLeaving={!isLoading} ref={animationRef}>
				<Spinner size={90} />
			</S.Overlay>,
		</ReactPortal>
	);
}
Loader.propTypes = {
	isLoading: PropTypes.bool.isRequired
};
