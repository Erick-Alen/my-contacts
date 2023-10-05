import React from 'react';
import ContactForm from '../../Components/ContactForm';
import FormHeader from '../../Components/FormHeader';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

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
       const response = await ContactsService.createContact(contact)
        console.log(response)
        toast({
          type: 'Success',
          text: 'Contact created succesfully',
          duration: 3000,
        })
    } catch (e) {
      //event: não envia informações de acordo com o evento
      //event: envia informações adicionais de acordo com o evento
      // usar o Custom event sem passar informações tem o mesmo efeito
      toast({
        type: 'danger',
        text: 'An error ocurred while creating the contact',
        duration: 3000,
      })
     }
  }
	return (
		<>
			<FormHeader title="New Contact" />
			<ContactForm buttonLabel="Register" onSubmit={handleSubmit} />
		</>
	);
}
