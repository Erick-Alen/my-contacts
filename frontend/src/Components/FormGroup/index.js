import PropTypes from 'prop-types';
import React from 'react';
import Spinner from '../Spinner';
import * as S from './styled';

export default function FormGroup({ children, error, isLoading }) {
	return (
		<S.Container>
			{/* <Loader isLoading/> */}
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
