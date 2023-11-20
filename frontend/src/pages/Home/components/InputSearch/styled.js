import { styled } from 'styled-components';

export const Container = styled.div`
	width: 100%;
	input {
		padding: 0 1rem;
		width: 100%;
		border-radius: 25px;
		height: 50px;
		background: #fff;
		border: none;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		outline: 0;

		&::placeholder {
			color: #bcbcbc;
		}
	}
`;
