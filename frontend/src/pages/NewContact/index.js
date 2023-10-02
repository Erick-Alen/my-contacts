import React from 'react';
import ContactForm from '../../Components/ContactForm';
import FormHeader from '../../Components/FormHeader';
import ContactsService from '../../services/ContactsService';

export default function NewContact() {
  const handleSubmit = async(formData) => {
    //  console.log('handleSubmit do newContact', formData)
    try {
       const contact = {
         name: formData.name,
         email: formData.email,
         phone: formData.phone,
         category_id: formData.categoryId,
       }
       console.log(contact)
       const response = await ContactsService.createContact(contact)
       console.log(response)
     } catch (e) {
       alert(e)
     }
  }
	return (
		<>
			<FormHeader title="New Contact" />
			<ContactForm buttonLabel="Register" onSubmit={handleSubmit} />
		</>
	);
}
