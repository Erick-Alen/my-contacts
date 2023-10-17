import { styled } from 'styled-components';

export const Overlay = styled.div`
	background: rgba(0, 0, 0, 0.6);
	backdrop-filter: blur(3.5px);
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;

	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Container = styled.div`
	max-width: 450px;
	width: 100%;
	background: #fff;
	padding: 24px;
	border-radius: 4px;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

	h1 {
		font-size: 22px;
		color: ${({ theme, danger }) =>
		danger ? theme.colors.danger.main : theme.colors.gray[900]};
	}
  .modal-body{
    margin-top: 32px;
  }

`;

export const Footer = styled.footer`
	display: flex;
	align-items: center;
	justify-content: end;
	margin-top: 32px;


	.cancel-button {
  display: flex;
  align-items: center;
  justify-content: center;
	padding: 0 16px;
	height: 52px;
	box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
  margin-right: 16px;
	border: none;
	border-radius: 4px;
	background: #fff;
  color: ${({ theme }) => theme.colors.primary.main};
	font-size: 16px;
	font-weight: bold;
	transition: background 0.1s ease-in-out;


		&:hover {
			background: ${({ theme }) => theme.colors.primary.main};
			color: #fff;
		}

		&[disabled] {
			cursor: not-allowed;
		}
	}
`;
