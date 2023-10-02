import { styled } from "styled-components";

export const HeaderList = styled.header`
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
export const ContainerList = styled.div`
	margin-top: 32px;
`;
export const OrderByName = styled.div`
	margin-top: 24px;
	margin-bottom: 8px;
	button {
		background: transparent;
		border: none;
		display: flex;
		align-items: center;
		span {
			margin-right: 8px;
			font-weight: bold;
			color: ${({ theme }) => theme.colors.primary.main};
		}
		img {
			transform: ${({ orderBy }) => orderBy === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)'};
			transition: transform 0.2s ease-in;

		}
	}
`;

export const Card = styled.div`
	background: #fff;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
	padding: 16px;
	border-radius: 4px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	& + & {
		margin: 16px 0;
	}

	.info {
		.contact-name {
			display: flex;
			align-items: center;
			small {
				background: ${({ theme }) => theme.colors.primary.lighter};
				color: ${({ theme }) => theme.colors.primary.main};
				font-weight: bold;
				text-transform: uppercase;
				padding: 4px;
				border-radius: 4px;
				margin-left: 8px;
			}
		}
		span {
			display: block;
			font-size: 14px;
			color: ${({ theme }) => theme.colors.gray[200]};
		}
	}
	.actions {
		button {
			background: transparent;
			border: none;
			margin-left: 8px;
		}
	}
`;

export const InputSearchContainer = styled.div`
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

export const ErrorContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  .details{
    margin-left: 24px;
    display: flex;
    flex-direction: column;
  }
  strong{
    margin-bottom: 8px;
    font-size: 22px;
    color: ${({theme})=> theme.colors.danger.main};
    display: block;
  }
`;

export const EmptyListContainer = styled.div`
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
export const SearchNotFoundContainer = styled.div`
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
