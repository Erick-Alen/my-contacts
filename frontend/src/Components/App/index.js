import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../assets/styles/globals';
import _default from '../../assets/styles/themes/default';
import Routes from '../../routes';
import Header from '../Header';
import * as S from './styled';
import ToastContainer from '../Toast/ToastContainer';

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={_default}>
        <GlobalStyles />
        <ToastContainer/>
				<S.Container>
					<Header />
					<Routes />
				</S.Container>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
