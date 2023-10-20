import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContactForm from '../../Components/ContactForm';
import FormHeader from '../../Components/FormHeader';
import Loader from '../../Components/Loader';
import useIsMounted from '../../hooks/useIsMounted';
import ContactsService from '../../services/ContactsService';
import notification from '../../utils/notification';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function EditContact() {
	const [isLoading, setIsLoading] = useState(true);
	const [contactName, setContactName] = useState('');
	const contactFormRef = useRef(null);

	const { id } = useParams();
	const safeAsyncAction = useSafeAsyncAction();
	// const isMounted = useIsMounted()
	useEffect(() => {

		const loadContact = async () => {
			try {
				const contact = await ContactsService.getContactById(id);
				// if (isMounted()) {
				// 	setContactName(contact.name)
				// 	contactFormRef.current.setFieldsValues(contact)
				// 	setIsLoading(false)
				// }
				safeAsyncAction(()=> {
					setContactName(contact.name);
					contactFormRef.current.setFieldsValues(contact);
					setIsLoading(false);
				});

			} catch {
				// if (isMounted()) {
				// 	window.location.href = '/';
				// 	notification({
				// 		type: 'danger',
				// 		text: 'Contact not found'
				// 	})
				// }

				safeAsyncAction(()=> {
					window.location.href = '/';
					notification({
						type: 'danger',
						text: 'Contact not found'
					});
				});

			}
		};
		loadContact();
	}, [id, safeAsyncAction]);


	const handleSubmit = async (formData) => {
		try {
			const contact = {
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				category_id: formData.categoryId,
			};
			const response = await ContactsService.updateContact(id, contact);
			setContactName(response.name);
			notification({
				type: 'success',
				text: 'Contact updated succesfully',
				duration: 3000,
			});
		} catch (e) {
			notification({
				type: 'danger',
				text: 'An error ocurred while updating the contact',
				duration: 3000,
			});
		}
	};
	return (
		<>
			<Loader isLoading={isLoading} />
			<FormHeader title={isLoading ? 'Loading...' : `Edit ${contactName}'s info`} />
			<ContactForm ref={contactFormRef} onSubmit={handleSubmit} buttonLabel="Save changes" />
		</>
	);
}
