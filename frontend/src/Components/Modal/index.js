import PropTypes from 'prop-types';
import React from 'react';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';
import Button from '../Button';
import ReactPortal from '../ReactPortal';
import * as S from './styled';


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

	const { shouldrender, animationRef } = useAnimatedUnmount(visible);

	if (!shouldrender) {
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
			<S.Overlay ref={animationRef} isLeaving={!visible}>
				<S.Container danger={danger} isLeaving={!visible}>
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
	cancel: PropTypes.string,
	visible: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool,
	confirm: PropTypes.string,
	danger: PropTypes.bool,
	title: PropTypes.string.isRequired,
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
