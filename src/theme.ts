import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2f6fed',
      light: '#eaf1ff',
      dark: '#1a4fb5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7c5cff',
      light: '#f2eeff',
    },
    background: {
      default: '#f4f7fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#5b6473',
    },
    success: { main: '#1f9d7a' },
    warning: { main: '#d97706' },
    error: { main: '#dc2626' },
  },
  shape: {
    borderRadius: '32px',
  },
  typography: {
    fontFamily: 'Inter, "Noto Sans JP", "Segoe UI", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.04em' },
    h2: { fontWeight: 800, letterSpacing: '-0.04em' },
    h3: { fontWeight: 800, letterSpacing: '-0.04em' },
    h4: { fontWeight: 800, letterSpacing: '-0.04em' },
    h5: { fontWeight: 700, letterSpacing: '-0.02em' },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '32px',
          boxShadow: 'none',
          paddingInline: 18,
          minHeight: 42,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '32px',
          border: '1px solid rgba(47, 111, 237, 0.08)',
          boxShadow: '0 12px 32px rgba(35, 56, 90, 0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '32px',
          border: '1px solid rgba(47, 111, 237, 0.08)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});

export const pageShellSx = {
  maxWidth: 980,
  mx: 'auto',
  px: { xs: 2, md: 3 },
  py: { xs: 4, md: 5 },
};

export const pageHeaderSx = {
  mb: 4,
  px: { xs: 0, md: 1 },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2,
  flexWrap: 'wrap',
};
