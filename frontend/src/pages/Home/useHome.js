import { useCallback, useEffect, useMemo, useState } from 'react';
import ContactsService from '../../services/ContactsService';
import notification from '../../utils/notification';

const useHome = () => {
	const [contacts, setContacts] = useState([]);
	const [orderBy, setOrderBy] = useState('asc');
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
	const [isLoadingDelete, setIsLoadingDelete] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [contactToBeDeleted, setContactToBeDeleted] = useState(null);

	const filteredContacts = useMemo(() => contacts.filter((contact) => (
		contact.name.toLowerCase().includes(searchTerm.toLowerCase())
	)), [contacts, searchTerm]);

	const loadContacts = useCallback( async () => {
		setIsLoading(true);
		try {
			const contactsList = await ContactsService.listContacts(orderBy);
			setContacts(contactsList);
			setHasError(false);
		} catch (err) {
			setHasError(true);
			setContacts([]);
			console.log(err.name);
			console.log(err.message);
			console.log(err.response);
		} finally {
			setIsLoading(false);
		}
	}, [orderBy]);

	useEffect(() => {
		loadContacts();
	}, [loadContacts]);

	const handleSortContacts = () => {
		setOrderBy((prev) => (prev === 'asc' ? 'desc' : 'asc'));
	};

	const onSearchTerm = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleTryAgain = () => {
		loadContacts();
	};
	const handleDeleteContact = (contact) => {
		setContactToBeDeleted(contact);
		setIsDeleteModalVisible(true);
	};
	const handleCloseDeleteModal = () => {
		setIsDeleteModalVisible(false);
		setContactToBeDeleted(null);
	};
	const handleConfirmDeleteContact = async () => {
		setIsLoadingDelete(true);
		try {
			await ContactsService.deleteContact(contactToBeDeleted.id);
			notification({
				type: 'success',
				text: 'Contact deleted succesfully',
				duration: 3000,
			});
			handleCloseDeleteModal();
			setContacts((prev) => prev.filter(
				(contact) => contact.id !== contactToBeDeleted.id)
			);
		} catch {
			notification({
				type: 'danger',
				text: 'An error ocurred while deleting the contact',
				duration: 3000,
			});
		} finally {
			setIsLoadingDelete(false);
		}
	};
	return {
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
	};
};

export default useHome;
