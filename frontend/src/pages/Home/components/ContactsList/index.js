import PropTypes from 'prop-types';
import React from 'react';
import arrow from '../../../../assets/images/icons/arrow.svg';
import edit from '../../../../assets/images/icons/edit.svg';
import trash from '../../../../assets/images/icons/trash.svg';

import * as S from './styled';

const ContactsList = ({
	orderBy,
	handleSortContacts,
	handleDeleteContact,
	filteredContacts,
}) => {
	return (
		<>{
			filteredContacts.length > 0 && <S.OrderByName orderBy={orderBy}>
				<button type="button" className="sort-button" onClick={handleSortContacts}>
					<span>Nome</span>
					<img src={arrow} alt="arrow" />
				</button>
			</S.OrderByName>
		}

		{
			filteredContacts.map((contact) => (
				<S.Card key={contact.id}>
					<div className="info">
						<div className="contact-name">
							<strong>{contact.name}</strong>
							{contact.category.name && <small>{contact.category.name}</small>}
						</div>
						<span>{contact.email}</span>
						<span>{contact.phone}</span>
					</div>
					<div className="actions">
						<a href={`/edit/${contact.id}`}>
							<img src={edit} alt="edit" />
						</a>
						<button onClick={()=>handleDeleteContact(contact)} type="button">
							<img src={trash} alt="trash" />
						</button>
					</div>
				</S.Card>
			))
		}
		</>
	);
};
export default ContactsList;


ContactsList.propTypes = {
	filteredContacts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			email: PropTypes.string,
			phone: PropTypes.string,
			category: PropTypes.shape({
				name: PropTypes.string,
			}).isRequired,
		})
	),
	orderBy: PropTypes.string.isRequired,
	handleSortContacts: PropTypes.func.isRequired,
	handleDeleteContact: PropTypes.func.isRequired,
};

ContactsList.defaultProps = {
	handleDeleteContact: null,
};
