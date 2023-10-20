import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import Select from '../../Components/Select';
import FormGroup from '../FormGroup';
import Spinner from '../Spinner';
import * as S from './styled';
import useContactForm from './useContactForm';
/* eslint-disable react/display-name */
const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
	const {
		name,
		email,
		phone,
		categoryId,
		categories,
		isLoadingcategories,
		isSubmitting,
		getErrorMessageByFieldName,
		isFormValid,
		handleNameChange,
		handleEmailChange,
		handlePhoneChange,
		handleCategoryChange,
		handleSubmit
	} = useContactForm(onSubmit, ref);
	return (
		<S.Form noValidate onSubmit={handleSubmit}>
			<FormGroup error={getErrorMessageByFieldName('name')}>
				<Input
					error={getErrorMessageByFieldName('name')}
					value={name}
					autoFocus
					type="text"
					placeholder="Name*"
					onChange={handleNameChange}
					disabled={isSubmitting}
				/>
			</FormGroup>

			<FormGroup error={getErrorMessageByFieldName('email')}>
				<Input
					type="email"
					error={getErrorMessageByFieldName('email')}
					value={email}
					placeholder="E-mail"
					onChange={handleEmailChange}
					disabled={isSubmitting}
				/>
			</FormGroup>

			<FormGroup>
				<Input
					value={phone}
					type="text"
					placeholder="Phone"
					onChange={handlePhoneChange}
					disabled={isSubmitting}
				/>
			</FormGroup>

			<FormGroup isLoading={isLoadingcategories}>
				<Select
					onChange={handleCategoryChange}
					value={categoryId}
					placeholder="Categoria"
					disabled={isLoadingcategories || isSubmitting}
				>
					<option selected>
						No Category
					</option>
					{categories.map((item) => (
						<option key={item.id} value={item.id}>
							{item.name}
						</option>

					))}
				</Select>
			</FormGroup>
			<S.ButtonContainer>
				<Button type="submit" disabled={!isFormValid | isSubmitting}>
					{!isSubmitting && buttonLabel}
					{isSubmitting && <Spinner size={16}/>}
				</Button>
			</S.ButtonContainer>
		</S.Form>
	);
});


ContactForm.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default ContactForm;
