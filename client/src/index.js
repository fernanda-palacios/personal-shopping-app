
import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core';
import { QueryClientProvider } from 'react-query';
import App from './App';
import theme from './theme';
import queryClient from './query-client';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ThemeProvider>,
  document.querySelector('#root'),
);