import { styled } from "styled-components";

export const Container = styled.div`
	& + & {
		margin: 16px 0;
	}
	small {
		display: block;
		margin-top: 8px;
		font-size: 12px;
		color: ${({ theme }) => theme.colors.danger.main};
	}
`;
