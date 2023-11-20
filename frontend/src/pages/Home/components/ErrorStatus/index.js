import PropTypes from 'prop-types';
import React from 'react';
import * as S from './styled';
import sad from '../../../../assets/images/sad.svg';
import Button from '../../../../Components/Button';

const ErrorStatus = ({ onTryAgain }) => {
	return (
		<S.Container>
			<img src={sad} alt='sad'/>
			<div className='details'>
				<strong>Ocorreu um erro ao obter seus contatos!</strong>
				<Button type='button' onClick={onTryAgain}>Tentar novamente</Button>
			</div>
		</S.Container>
	);
};


ErrorStatus.propTypes = {
	onTryAgain: PropTypes.func.isRequired
};

export default ErrorStatus;
