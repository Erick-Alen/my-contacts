import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button';
import * as S from './styled';

export default function Modal({ danger }) {
	return ReactDOM.createPortal(
		<S.Overlay>
			<S.Container danger={danger}>
				<h1>Modal Title</h1>
				<p>Modal Body</p>
				<S.Footer>
					<Button className="cancel-button" type="button">
						Cancel
					</Button>
					<Button danger={danger} type="button">
						Delete
					</Button>
				</S.Footer>
			</S.Container>
		</S.Overlay>,
		document.getElementById('modal-root'),
	);
}

Modal.propTypes = {
	danger: PropTypes.bool,
};
Modal.defaultProps = {
	danger: false,
};
