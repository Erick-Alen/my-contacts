import { useEffect, useImperativeHandle, useState } from 'react';
import { useErrors } from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';
import formatPhone from '../../utils/fomatPhone';
import isEmailValid from '../../utils/isEmailValid';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

const useContactForm = (onSubmit, ref) => {
//declaring controlled components
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [categories, setCategories] = useSafeAsyncState([]);
	const [isLoadingcategories, setIsLoadingCategories] = useSafeAsyncState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { setError, removeError, getErrorMessageByFieldName, errors } = useErrors();

	useImperativeHandle(ref, () => ({
		setFieldsValues: (contact) => {
			setName(contact.name ?? '');
			setEmail(contact.email ?? '');
			setPhone(formatPhone(contact.phone ?? ''));
			setCategoryId(contact.category.id ?? '');
		},
		resetFields: () => {
			setName('');
			setEmail('');
			setPhone('');
			setCategoryId('');
		}
	}), []);

	const isFormValid = (name && errors.length === 0);
	useEffect(() => {
		const loadCategories = async () => {
			try {
				const categoriesList = await CategoriesService.listCategories();
				setCategories(categoriesList);
			} catch {
				//
			} finally {
				setIsLoadingCategories(false);
			}
		};
		loadCategories();
	}, []);

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
		if (e.target.value && !isEmailValid(e.target.value)) {
			setError({ field: 'email', message: 'Invalid e-mail' });
		} else {
			removeError('email');
		}
	};

	const handlePhoneChange = (e) => {
		setPhone(formatPhone(e.target.value));
	};

	const handleCategoryChange = (e) => {
		setCategoryId(e.target.value);
	};

	const handleSubmit = async(e) => {
		e.preventDefault();
		setIsSubmitting(true);
		// console.log({ name, email, phone: phone.replace(/\D/g, ''), categoryId });
		await onSubmit({ name, email, phone, categoryId });

		// setName('');
		// setEmail('');
		// setPhone('');
		// setCategoryId('');

		setIsSubmitting(false);

	};
	return {
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
		handleSubmit,
	};
};
export default useContactForm;
