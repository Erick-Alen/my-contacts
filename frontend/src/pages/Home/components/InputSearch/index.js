import React from 'react';
import * as S from './styled';
import PropTypes from 'prop-types';

const InputSearch = ({ value, onChange }) => {
	return (
		<S.Container>
			<input value={value} onChange={onChange} placeholder="Search contact's name" type="text" />
		</S.Container>
	);
};


InputSearch.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

export default InputSearch;
