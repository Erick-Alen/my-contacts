import PropTypes from 'prop-types';
import React from 'react';
import * as S from './styled';

export default function FormGroup({ children, error }) {
	return (
		<S.Container>
			{children}
			{error && <small>{error}</small>}
		</S.Container>
	);
}

FormGroup.propTypes = {
	children: PropTypes.node.isRequired,
	error: PropTypes.string,
};

FormGroup.defaultProps = {
	error: null,
};
