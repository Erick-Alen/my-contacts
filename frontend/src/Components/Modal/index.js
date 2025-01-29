import React, { useEffect, useRef, useState } from 'react';
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

	const [shouldrender, setShouldRender] = useState(visible);

	const overlayref = useRef(null);

	useEffect(() => {
		if (visible) {
			setShouldRender(true);
		}

		const handleAnimationEnd = () => {
			setShouldRender(false);
		}

		if (!visible && overlayref.current) {
			overlayref.current.addEventListener('animationend', () => {
				setShouldRender(false);
			});
		}

		return () => {
			if (overlayref.current) {
				overlayref.current.removeEventListener('animationend', handleAnimationEnd);
			}
		}

	}, [visible])

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
			<S.Overlay isLeaving={!visible}>
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


Modal.defaultProps = {
	danger: false,
	isLoading: false,
	cancel: 'Cancel',
	confirm: 'Confirm',
};
