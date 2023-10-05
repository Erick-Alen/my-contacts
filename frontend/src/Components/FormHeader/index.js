import React from 'react';
import arrow from '../../assets/images/icons/arrow.svg';
import PropTypes from 'prop-types';
import * as S from './styled';
export default function FormHeader({ title }) {
	return (
		<S.Container>
			<a href="/">
				<img src={arrow} alt="Back" />
				<span>Back</span>
			</a>
			<h1>{title}</h1>
		</S.Container>
	);
}

FormHeader.propTypes = {
	title: PropTypes.string.isRequired,
};
