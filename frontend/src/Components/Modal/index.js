import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button';
import * as S from './styled';

export default function Modal({ cancel, confirm, danger, title, children, onCancel, onConfirm }) {
	return ReactDOM.createPortal(
		<S.Overlay>
			<S.Container danger={danger}>
				<h1>Do you want to delete the contact {title} ?</h1>
        <div className="modal-body">{children}</div>
				<S.Footer>
					<button onClick={onCancel} className='cancel-button' type="button">
						{cancel}
					</button>
					<Button onClick={onConfirm} danger={danger} type="button">
						{confirm}
					</Button>
				</S.Footer>
			</S.Container>
		</S.Overlay>,
		document.getElementById('modal-root'),
	);
}

Modal.propTypes = {
	danger: PropTypes.bool,
	title: PropTypes.string.isRequired,
	cancel: PropTypes.string.isRequired,
	confirm: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  danger: false,
  cancel: 'Cancel',
	confirm: 'Confirm',
};
