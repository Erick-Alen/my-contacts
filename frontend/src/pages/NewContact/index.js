import React from 'react';
import ContactForm from '../../Components/ContactForm';
import FormHeader from '../../Components/FormHeader';
import useNewContact from './useNewContact';

export default function NewContact() {
	const {
		contactFormRef,
		handleSubmit
	} = useNewContact();

	return (
		<>
			<FormHeader title="New Contact" />
			<ContactForm ref={contactFormRef} buttonLabel="Register" onSubmit={handleSubmit} />
		</>
	);
}
