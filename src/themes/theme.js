import { createMuiTheme } from '@material-ui/core';

export function themeConfig({ isDarkMode }) {
  return createMuiTheme({
    palette: {
      type: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#2A9D6F',
      },
      secondary: {
        main: '#e74764',
      },
      warning: {
        light: '#ffb74d',
        main: '#ff9800',
        dark: '#f57c00',
      },
      background: {
        paper: isDarkMode ? '#303030' : '#ffffff',
        default: isDarkMode ? '#424242' : '#efefef',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      fontSize: 14,
    },
  });
}
