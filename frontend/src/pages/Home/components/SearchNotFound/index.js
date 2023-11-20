import React from 'react';
import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';
import * as S from './styled';
import PropTypes from 'prop-types'; 

const SearchNotFound = ({searchTerm}) => {
	return (
		<S.Container>
			<img src={magnifierQuestion} alt='magnifier question' />
			<div>
				<p>Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>.</p>
			</div>
		</S.Container>
	);
};

SearchNotFound.propTypes = {
	searchTerm: PropTypes.func.isRequired
};

export default SearchNotFound;
