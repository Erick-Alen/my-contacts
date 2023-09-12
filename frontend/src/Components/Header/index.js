import React from 'react';
import Logo from '../../assets/images/Logo.svg';
import * as S from './styled';
export default function Header() {
	return (
		<S.Header>
			<img src={Logo} alt="my contacts" />
		</S.Header>
	);
}
