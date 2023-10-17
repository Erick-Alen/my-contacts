import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
import * as S from './styled';
import ReactPortal from '../ReactPortal';

export default function Modal({
	cancel,
	visible,
	isLoading,
	confirm,
	danger,
	title,
	children,
	onCancel,
	onConfirm
}) {
	if (!visible) {
		return null;
	}

	let container = document.getElementById('modal-root');
	if (!container) {
		container = document.createElement('div');
		container.setAttribute('id', 'modal-root');
		document.body.appendChild(container);
	}

	return (
		<ReactPortal containerId={'modal-root'}>
			<S.Overlay>
				<S.Container danger={danger}>
					<h1>{title}</h1>
					<div className="modal-body">{children}</div>
					<S.Footer>
						<button disabled={isLoading} onClick={onCancel} className='cancel-button' type="button">
							{cancel}
						</button>
						<Button isLoading={isLoading} onClick={onConfirm} danger={danger} type="button">
							{confirm}
						</Button>
					</S.Footer>
				</S.Container>
			</S.Overlay>
		</ReactPortal>
	);
}

Modal.propTypes = {
	danger: PropTypes.bool,
	isLoading: PropTypes.bool,
	visible: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	cancel: PropTypes.string.isRequired,
	confirm: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	onCancel: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
	danger: false,
	isLoading: false,
	cancel: 'Cancel',
	confirm: 'Confirm',
};
