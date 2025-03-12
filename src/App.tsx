import React from 'react'
import RouteProvider from './router/Router'
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from './theme'
import { Provider } from 'react-redux';
import store from './state/redux/store';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';

const App: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouteProvider />
      </ThemeProvider>
    </Provider>
    </LocalizationProvider>
  )
}

export default App
