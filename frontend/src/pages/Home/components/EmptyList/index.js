import React from 'react';
import emptyBox from '../../../../assets/images/empty-box.svg';
import * as S from './styled';

const EmptyList = () => {
	return (
		<S.Container>
			<img src={emptyBox} alt='empty box' />
			<div>
				<p>Você ainda não tem nenhum contato cadastrado! Clique no botão <strong>”Novo contato”</strong> acima para cadastrar o seu primeiro!</p>
			</div>
		</S.Container>
	);
};

export default EmptyList;
