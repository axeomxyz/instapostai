import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import initFacebookSDK from "./initFacebookSDK";




const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#005ddc',
    },
    secondary: {
      main: '#7f49d1',
    },
    error: {
      main: '#ff134f',
    },
    warning: {
      main: '#ff5509',
    },
    info: {
      main: '#ca21b1',
    },
  },
  typography: {
    fontFamily: 'Graphik',
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient()

initFacebookSDK().then(() => {
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
          </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
