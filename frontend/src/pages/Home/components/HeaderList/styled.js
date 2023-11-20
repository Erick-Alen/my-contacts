import { styled } from 'styled-components';

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: ${({justifyContent}) => justifyContent};
	margin-top: 32px;
  padding-bottom: 16px;
  border-bottom: 2px solid ${({theme}) => theme.colors.gray[100]};
	strong {
		color: #222;
		font-size: 24px;
	}
	a {
		color: ${({ theme }) => theme.colors.primary.main};
		text-decoration: none;
		font-weight: bold;
		border: 2px solid ${({ theme }) => theme.colors.primary.main};
		padding: 8px 16px;
		border-radius: 4px;
		transition: all 0.15s ease-in-out;

		&:hover {
			background: ${({ theme }) => theme.colors.primary.main};
			color: #fff;
		}
	}
`;
