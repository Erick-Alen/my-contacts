import { css, styled } from "styled-components";

export const StyledButton =  styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
	padding: 0 16px;
	height: 52px;
	box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
	border: none;
	border-radius: 4px;
	background: ${({ theme }) => theme.colors.primary.main};
	font-size: 16px;
	font-weight: bold;
	color: #fff;
	transition: background 0.2s ease-in-out;
	&:hover {
		background: ${({ theme }) => theme.colors.primary.light};
	}
	&:active {
		background: ${({ theme }) => theme.colors.primary.dark};
	}
	&[disabled] {
		background: #ccc !important;
		cursor: default;
	}

	${({ theme, danger }) =>
		danger &&
		css`
			background: ${theme.colors.danger.main};

			&:hover {
				background: ${theme.colors.danger.light};
			}

			&:active {
				background: ${theme.colors.danger.dark};
			}
		`};

`;
