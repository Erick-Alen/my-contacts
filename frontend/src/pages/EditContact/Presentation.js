import React from 'react';
import ContactForm from '../../Components/ContactForm';
import FormHeader from '../../Components/FormHeader';
import Loader from '../../Components/Loader';
import PropTypes from 'prop-types'

export default function Presentation({
	isLoading, contactName, contactFormRef, onSubmit
}) {
	return (
    <>
      <Loader isLoading={isLoading} />
			<FormHeader title={isLoading ? 'Loading...' : `Edit ${contactName}'s info`} />
			<ContactForm ref={contactFormRef} onSubmit={onSubmit} buttonLabel="Save changes" />
		</>
	);
}
Presentation.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	contactName: PropTypes.string.isRequired,
	contactFormRef: PropTypes.shape().isRequired,
	onSubmit: PropTypes.func.isRequired,
}
