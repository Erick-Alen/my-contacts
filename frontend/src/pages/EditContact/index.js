import React, { useRef, useState, useEffect, useRef} from 'react';
import ContactsService from '../../services/ContactsService';
import Loader from '../../Components/Loader';
import toast from '../../utils/toast'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import ContactForm from '../../Components/ContactForm';
import FormHeader from '../../Components/FormHeader';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true)
  const contactFormRef = useRef(null)
  const history = useHistory()
  const { id } = useParams()
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const contact = await ContactsService.getContactById(id)
        contactFormRef.current.setFieldsValues(contact)
        console.log(contact)
        setIsLoading(false)
      } catch {
        history.push('/')
        toast({
          type: 'danger',
          text: 'Contact not found'
        })
      }
    }
    loadContacts();
  }, [id, history])
  const handleSubmit = async (formData) => {

  }
	return (
    <>
      <Loader isLoading={isLoading} />
			<FormHeader title={`Edit ${contact.name}'s info`} />
			<ContactForm ref={contactFormRef} onSubmit={handleSubmit} buttonLabel="Save changes" />
		</>
	);
}
