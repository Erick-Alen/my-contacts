import React from 'react';

import Loader from '../../Components/Loader';
import Modal from '../../Components/Modal';

import * as S from '../../pages/Home/styled';
import ContactsList from './components/ContactsList';
import EmptyList from './components/EmptyList';
import ErrorStatus from './components/ErrorStatus';
import HeaderList from './components/HeaderList';
import InputSearch from './components/InputSearch';
import SearchNotFound from './components/SearchNotFound';
import useHome from './useHome';


export default function Home() {
	const {
		contacts,
		orderBy,
		searchTerm,
		isLoading,
		isDeleteModalVisible,
		isLoadingDelete,
		hasError,
		contactToBeDeleted,
		filteredContacts,
		handleSortContacts,
		onSearchTerm,
		handleTryAgain,
		handleDeleteContact,
		handleCloseDeleteModal,
		handleConfirmDeleteContact
	} = useHome();

	const hasContacts = contacts.length > 0;
	const isEmptyList = !hasError && !hasContacts && !isLoading;
	const isSearchEmpty = !hasError && hasContacts && filteredContacts.length < 1;

	return (
		<>
			<Loader isLoading={isLoading} />

			{hasContacts && (
				<InputSearch value={searchTerm} onChange={onSearchTerm} />
			)}

			<S.ContainerList>
				<HeaderList hasError={hasError} contacts={contacts.length} numberOfFilteredContacts={filteredContacts.length} />

				{hasError && (
					<ErrorStatus onTryAgain={handleTryAgain}/>
				)}
				{
					(isEmptyList) && (
						<EmptyList/>
					)
				}
				{
					(isSearchEmpty) && (
						<SearchNotFound searchTerm={searchTerm} />
					)
				}

				{hasContacts && (
					<>
						{<ContactsList
							orderBy={orderBy}
							handleSortContacts={handleSortContacts}
							handleDeleteContact={handleDeleteContact}
							filteredContacts={filteredContacts}
						/>}

						<Modal
							danger
							title={`Do you want to delete the contact ${contactToBeDeleted?.name} ?`}
							confirm='Delete'
							isLoading={isLoadingDelete}
							visible={isDeleteModalVisible}
							onCancel={handleCloseDeleteModal}
							onConfirm={handleConfirmDeleteContact}
						>
							<p>This action cannot be undone</p>
						</Modal>

					</>
				)}

			</S.ContainerList>
		</>
	);
}
