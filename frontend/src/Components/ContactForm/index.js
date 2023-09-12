import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import Select from '../../Components/Select';
import { useErrors } from '../../hooks/useErrors';
import formatPhone from '../../utils/fomatPhone';
import isEmailValid from '../../utils/isEmailValid';
import FormGroup from '../FormGroup';
import * as S from './styled';

export default function ContactForm({ buttonLabel }) {
	//declarating controlled components
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [category, setCategory] = useState('');
	const { setError, removeError, getErrorMessageByFieldName, errors } = useErrors();

	const isFormValid = (name && errors.length === 0)

	const handleNameChange = (e) => {
		setName(e.target.value);
		if (!e.target.value) {
			setError({ field: 'name', message: 'Name is required' });
		} else {
			removeError('name');
		}
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
		if (e.target.value && isEmailValid(e.target.value)) {
			setError({ field: 'email', message: 'Invalid e-mail' });
		} else {
			removeError('email');
		}
	};

	const handlePhoneChange = (e) => {
		setPhone(formatPhone(e.target.value));
	}
	const handleCategoryChange = (e) => {
		setCategory(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({ name, email, phone: phone.replace(/\D/g, '') });
	};

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
				/>
			</FormGroup>

			<FormGroup error={getErrorMessageByFieldName('email')}>
				<Input
					type="email"
					error={getErrorMessageByFieldName('email')}
					value={email}
					placeholder="E-mail"
					onChange={handleEmailChange}
				/>
			</FormGroup>

			<FormGroup>
				<Input value={phone} type="text" placeholder="Phone" onChange={handlePhoneChange} />
			</FormGroup>

			<FormGroup>
				<Select defaultValue='0' onChange={handleCategoryChange} value={category} placeholder="Categoria">
					<option value="0" disabled selected>
						Category
					</option>
					<option value="1">Instagram</option>
				</Select>
			</FormGroup>
			<S.ButtonContainer>
				<Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
			</S.ButtonContainer>
		</S.Form>
	);
}

ContactForm.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
};
