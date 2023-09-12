import React from 'react';
import FormHeader from '../../Components/FormHeader';

import ContactForm from '../../Components/ContactForm';

export default function EditContact() {
	return (
		<>
			<FormHeader title="Edit Erick Alen's info" />
			<ContactForm buttonLabel="Save changes" />
		</>
	);
}
