import PropTypes from 'prop-types';
import React from 'react';
import * as S from './styled';

const HeaderList = ({ hasError, numberOfContacts, numberOfFilteredContacts }) => {
	const alignment =
		hasError ? 'flex-end'
			: (
				numberOfContacts > 0
					? 'space-between'
					: 'center'
			);
	return (
		<S.Container justifyContent={
			alignment
		}>
			{(!hasError && numberOfContacts > 0) && (<strong>
				{numberOfFilteredContacts === 0 ? 'Ops.. No contacts here!' : numberOfFilteredContacts}
				{numberOfFilteredContacts > 1 ? ' Contact(s)' : <></>}
			</strong>)}
			<a href="/new">New Contact</a>
		</S.Container>
	);
};


HeaderList.propTypes = {
	hasError:PropTypes.bool.isRequired,
	numberOfContacts:PropTypes.number.isRequired,
	numberOfFilteredContacts:PropTypes.number.isRequired,
};

export default HeaderList;
