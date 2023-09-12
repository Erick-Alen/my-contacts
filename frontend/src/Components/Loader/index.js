import React from 'react';
import ReactDOM from 'react-dom';
import * as S from './styled';

export default function Loader() {
	return ReactDOM.createPortal(
		<S.Overlay>
			<div className="loader"></div>
		</S.Overlay>,
		document.getElementById('loader-root'),
	);
}
