import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../assets/styles/globals';
import _default from '../../assets/styles/themes/default';
import Routes from '../../routes';
import Header from '../Header';
import * as S from './styled';

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={_default}>
				<GlobalStyles />
				<S.Container>
					<Header />
					<Routes />
					{/* <ContactsList/> */}
				</S.Container>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
