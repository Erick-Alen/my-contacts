import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  font-weight: normal;
  p{
    color: ${({ theme }) => theme.colors.gray[200]};
    text-align: center;
    margin-top: 8px;
  }
  strong{
    color: ${({theme})=> theme.colors.primary.main};
  }
`;
