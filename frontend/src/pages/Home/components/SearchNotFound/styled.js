import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 16px;
  font-weight: normal;
  p{
    margin-top: 16px;
    color: ${({ theme }) => theme.colors.gray[200]};
    margin-left: 24px;
    word-break: break-word;
  }
  strong{
    color: ${({theme})=> theme.colors.gray[900]};
  }
`;
