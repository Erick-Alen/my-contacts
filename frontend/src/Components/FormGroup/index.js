import PropTypes from 'prop-types';
import React from 'react';
import * as S from './styled';
import Spinner from '../Spinner';
import Loader from '../Loader';

export default function FormGroup({ children, error, isLoading }) {
	return (
		<S.Container>
			<Loader isLoading={isLoading} />
			<div className="form-item">
				{children}
				{isLoading && <div className='loader'><Spinner size={14} /></div>}
			</div>

			{error && <small>{error}</small>}
		</S.Container>
	);
}

FormGroup.propTypes = {
	children: PropTypes.node.isRequired,
	error: PropTypes.string,
	isLoading: PropTypes.bool,
};

FormGroup.defaultProps = {
	error: null,
	isLoading: false,
};
