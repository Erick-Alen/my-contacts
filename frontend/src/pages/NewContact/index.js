import React from 'react';
import ContactForm from '../../Components/ContactForm';
import FormHeader from '../../Components/FormHeader';

export default function NewContact() {
	return (
		<>
			<FormHeader title="New Contact" />
			<ContactForm buttonLabel="Register" />
		</>
	);
}
