import React from 'react';
import ContactForm from '../../Components/ContactForm';
import FormHeader from '../../Components/FormHeader';
import Loader from '../../Components/Loader';
import useEditContact from './useEditContact';

export default function EditContact() {
	const {
		isLoading,
		contactName,
		contactFormRef,
		handleSubmit
	} = useEditContact();

	return (
		<>
			<Loader isLoading={isLoading} />
			<FormHeader title={isLoading ? 'Loading...' : `Edit ${contactName}'s info`} />
			<ContactForm ref={contactFormRef} onSubmit={handleSubmit} buttonLabel="Save changes" />
		</>
	);
}
