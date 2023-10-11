import React, { useRef } from 'react';
import ContactForm from '../../Components/ContactForm';
import FormHeader from '../../Components/FormHeader';
import ContactsService from '../../services/ContactsService';
import notification from '../../utils/notification';
import ContactMapper from '../../services/mappers/ContactMapper';

export default function NewContact() {
  const contactFormRef = useRef(null)
  const handleSubmit = async(contact) => {
    //  console.log('handleSubmit do newContact', formData)
    try {
      await ContactsService.createContact(contact)
      contactFormRef.current.resetFields()
        notification({
          type: 'success',
          text: 'Contact created succesfully',
          duration: 3000,
        })
    } catch (e) {
      //event: não envia informações de acordo com o evento
      //event: envia informações adicionais de acordo com o evento
      // usar o Custom event sem passar informações tem o mesmo efeito
      notification({
        type: 'danger',
        text: 'An error ocurred while creating the contact',
        duration: 3000,
      })
     }
  }
	return (
		<>
			<FormHeader title="New Contact" />
			<ContactForm ref={contactFormRef} buttonLabel="Register" onSubmit={handleSubmit} />
		</>
	);
}
