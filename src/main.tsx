import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import App from './App.tsx';

import { createTheme, ThemeProvider } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: `'Times New Roman', serif`,
  },
});

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
);
