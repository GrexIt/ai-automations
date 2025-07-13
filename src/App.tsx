import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import AIAutomationCreator from './components/AIAutomation/AIAutomationCreator';

function App() {
  // Create a theme with Hiver-like styling
  const theme = createTheme({
    palette: {
      primary: {
        main: '#5664d2',
      },
      background: {
        default: '#f9fafc',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <AIAutomationCreator />
      </div>
    </ThemeProvider>
  );
}

export default App;
