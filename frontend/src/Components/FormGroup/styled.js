import styled from "styled-components";

export const Container = styled.div`
	& + & {
		margin: 16px 0;
	}
	small {
		display: block;
		margin-top: 8px;contact
		font-size: 12px;
		color: ${({ theme }) => theme.colors.danger.main};
	}

  .form-item{
    position: relative;
    .loader{
      position: absolute;
      right: 20px;
      top: 20px;
    }
  }
`;
