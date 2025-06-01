import styled, { css, keyframes } from 'styled-components';

const messageIn = keyframes`
	from {
		opacity: 0;
		transform: translateY(100px);
	}

	to {
		opacity: 1;
		transform: translateY(0px);
	}
	`;

const messageOut = keyframes`
	from {
		opacity: 1;
		transform: translateY(0px);
	}

	to {
		opacity: 0;
		transform: translateY(100px);
	}
	`;

const containerVariants = {
	danger: css`
    background: ${({ theme }) => theme.colors.danger.dark};
  `,

	default: css`
    background: ${({ theme }) => theme.colors.primary.main};
  `,

	success: css`
    background: ${({ theme }) => theme.colors.success.main};
  `,

};

export const Container = styled.div`
  ${({type})=> containerVariants[type] || containerVariants.default}
  padding: 16px 32px;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0px 20px 20px -16px #00000040;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

	animation: ${messageIn} 0.3s forwards;

	${({ isLeaving }) => isLeaving && css`
		animation: ${messageOut} 0.3s forwards;
		;`}

  & + & {
    margin-top: 12px;
  }

  img {
    margin-right: 4px;
  }
`;
