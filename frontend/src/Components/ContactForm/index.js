import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import Select from '../../Components/Select';
import { useErrors } from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';
import formatPhone from '../../utils/fomatPhone';
import isEmailValid from '../../utils/isEmailValid';
import FormGroup from '../FormGroup';
import Spinner from '../Spinner';
import * as S from './styled';

export default function ContactForm({ buttonLabel, onSubmit }) {
	//declaring controlled components
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [categories, setCategories] = useState([]);
	const [isLoadingcategories, setIsLoadingCategories] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { setError, removeError, getErrorMessageByFieldName, errors } = useErrors();

  const isFormValid = (name && errors.length === 0)
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesList = await CategoriesService.listCategories()
        setCategories(categoriesList)
      } catch { } finally {
        setIsLoadingCategories(false)
      }
    }
    loadCategories()
  }, [])

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
		setCategoryId(e.target.value)
	}

	const handleSubmit = async(e) => {
		e.preventDefault();
    setIsSubmitting(true)
    // console.log({ name, email, phone: phone.replace(/\D/g, ''), categoryId });
    await onSubmit({ name, email, phone, categoryId })

    setIsSubmitting(false)

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
        <Button type="submit" disabled={!isFormValid}>
          {!isSubmitting && buttonLabel}
          {isSubmitting && <Spinner size={16}/>}
        </Button>
			</S.ButtonContainer>
		</S.Form>
	);
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};
