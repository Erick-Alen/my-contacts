import { useState } from 'react';

export const useErrors = () => {
	const [errors, setErrors] = useState([]);

	const setError = ({ field, message }) => {
		const errorAlreadyExists = errors.find((error) => error.field === field);

		if (errorAlreadyExists) {
			return;
		}
		setErrors((prev) => [...prev, { field, message }]);
	};

	const removeError = (fieldName) => {
		setErrors((prev) => prev.filter((error) => error.field !== fieldName));
	};

	const getErrorMessageByFieldName = (fieldName) => {
		return errors.find((error) => error.field === fieldName)?.message;
	};
	return { setError, removeError, getErrorMessageByFieldName, errors };
};
