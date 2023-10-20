import { useCallback, useState } from 'react';

export const useErrors = () => {
	const [errors, setErrors] = useState([]);

	const setError = useCallback(({ field, message }) => {
		const errorAlreadyExists = errors.find((error) => error.field === field);

		if (errorAlreadyExists) {
			return;
		}
		setErrors((prev) => [...prev, { field, message }]);
	}, [errors]);

	const removeError = useCallback((fieldName) => {
		setErrors((prev) => prev.filter((error) => error.field !== fieldName));
	}, []);

	const getErrorMessageByFieldName = useCallback((fieldName) => {
		return errors.find((error) => error.field === fieldName)?.message;
	}, []);

	return { setError, removeError, getErrorMessageByFieldName, errors };
};
