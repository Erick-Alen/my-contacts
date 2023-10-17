import { styled } from 'styled-components';

export const Container = styled.div`
	/* margin-top: 74px;
	flex-direction: column;*/
	padding-bottom: 24px;
	//styling Link tag (Generates an "a" anchor)
	a {
		display: flex;
		align-items: center;
		text-decoration: none;
		span {
			color: ${({ theme }) => theme.colors.primary.main};
			font-weight: bold;
		}
		img {
			margin-right: 8px;
			transform: rotate(-90deg);
		}
	}

	h1 {
		font-size: 24px;
	}
`;
