import React, { useRef, useState, useEffect} from 'react';
import ContactsService from '../../services/ContactsService';
import Loader from '../../Components/Loader';
import toast from '../../utils/toast'
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ContactForm from '../../Components/ContactForm';
import FormHeader from '../../Components/FormHeader';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true)
  const [contactName, setContactName] = useState('')
  const contactFormRef = useRef(null)

  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    const loadContact = async () => {
      try {
        const contact = await ContactsService.getContactById(id)
        setContactName(contact.name)
        contactFormRef.current.setFieldsValues(contact)
        console.log(contactFormRef.current)
        setIsLoading(false)
      } catch {
        history.push('/')
        toast({
          type: 'danger',
          text: 'Contact not found'
        })
      }
    }
    loadContact();
  }, [id, history])
  const handleSubmit = async (formData) => {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      }
      const response = await ContactsService.updateContact(id, contact)
      setContactName(response.name)
      toast({
        type: 'success',
        text: 'Contact updated succesfully',
        duration: 3000,
      })
    } catch (e) {
      toast({
        type: 'danger',
        text: 'An error ocurred while updating the contact',
        duration: 3000,
      })
    }
  }
	return (
    <>
      <Loader isLoading={isLoading} />
			<FormHeader title={isLoading ? 'Loading...' : `Edit ${contactName}'s info`} />
			<ContactForm ref={contactFormRef} onSubmit={handleSubmit} buttonLabel="Save changes" />
		</>
	);
}
