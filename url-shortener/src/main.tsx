import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './App';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

const THEME = createTheme({
  typography: {
    fontFamily: 'Sans-serif',
    fontSize: 13,
  },
});

const renderApp = () => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={THEME}>
            <App />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </StrictMode>
  );
};

renderApp();
