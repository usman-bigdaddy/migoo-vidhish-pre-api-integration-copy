import { createTheme } from "@mui/material/styles";
import typography from "./Typography";
import { shadows } from "./Shadows";

const createBaseLightTheme = (direction = 'ltr') =>
// const baselightTheme =
 createTheme({
  direction: 'ltr',
  palette: {
    primary: {
      main: '#5D87FF',
      light: '#ECF2FF',
      dark: '#4570EA',
      contrastText: '#ffffff',
      transparent: "#ffffff00"
    },
    secondary: {
      main: '#49BEFF',
      light: '#E8F7FF',
      dark: '#23afdb',
      contrastText: '#ffffff',
    },
    success: {
      main: '#13DEB9',
      light: '#E6FFFA',
      dark: '#02b3a9',
      contrastText: '#ffffff',
    },
    info: {
      main: '#539BFF',
      light: '#EBF3FE',
      dark: '#1682d4',
      contrastText: '#ffffff',
    },
    error: {
      main: '#FA896B',
      light: '#FDEDE8',
      dark: '#f3704d',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FFAE1F',
      light: '#FEF5E5',
      dark: '#ae8e59',
      contrastText: '#ffffff',
    },
    purple: {
      A50: '#EBF3FE',
      A100: '#6610f2',
      A200: '#557fb9',
    },
    grey: {
      100: '#F2F6FA',
      200: '#EAEFF4',
      300: '#DFE5EF',
      400: '#7C8FAC',
      500: '#5A6A85',
      600: '#2A3547',
      700: '#dfe5ef'
    },
    text: {
      primary: '#2A3547',
      secondary: '#5A6A85',
    },
    action: {
      disabledBackground: 'rgba(73,82,88,0.12)',
      hoverOpacity: 0.02,
      hover: '#f6f9fc',
    },
    divider: '#e5eaef',
  },
  typography,
  shadows,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: "none",
        },
        '.simplebar-scrollbar:before': {
          background: " #DFE5EF!important"
        },
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "7px",
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 9px 17.5px rgb(0,0,0,0.05)'
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e5eaef !important',
          },
          borderRadius: "7px",
          '&.Mui-focused .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5D87FF !important'
          }
        },
      },
    },
  }
},

);

const createBaseDarkTheme = (direction = 'ltr') =>
// export const basedarkTheme = 
createTheme({
  direction: 'ltr',
  palette: {
    mode: "dark",
    primary: {
      main: '#5D87FF',
      light: '#4570EA',
      dark: '#0044c1',
      contrastText: '#ffffff',
      transparent: "#ffffff00"
    },
    secondary: {
      main: '#49BEFF',
      light: '#23afdb',
      dark: '#007bbd',
      contrastText: '#ffffff',
    },
    success: {
      main: '#13DEB9',
      light: '#02b3a9',
      dark: '#00897b',
      contrastText: '#ffffff',
    },
    info: {
      main: '#539BFF',
      light: '#1682d4',
      dark: '#0d47a1',
      contrastText: '#ffffff',
    },
    error: {
      main: '#FA896B',
      light: '#f3704d',
      dark: '#c62828',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FFAE1F',
      light: '#ae8e59',
      dark: '#ff6f00',
      contrastText: '#ffffff',
    },
    purple: {
      A50: '#2a2a40',
      A100: '#6610f2',
      A200: '#8888c9',
    },
    grey: {
      100: '#1A1A1A',
      200: '#2D2D2D',
      300: '#3C3C3C',
      400: '#5A5A5A',
      500: '#7C8FAC',
      600: '#B0B0B0',
      700: '#DFE5EF',
    },
    background: {
      default: '#121212',
      paper: '#1E1E2F',
    },
    text: {
      primary: '#ffffff',
      secondary: '#B0B0B0',
    },
    action: {
      disabledBackground: 'rgba(255,255,255,0.12)',
      hoverOpacity: 0.05,
      hover: '#2a2a2a',
    },
    divider: '#333c49',
  },
  typography,
  shadows,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: "none",
        },
        '.simplebar-scrollbar:before': {
          background: "#444!important"
        },
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "7px",
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E2F',
          boxShadow: '0 9px 17.5px rgb(0,0,0,0.3)'
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#333c49 !important',
          },
          borderRadius: "7px",
          '&.Mui-focused .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5D87FF !important'
          }
        },
      },
    },
  }
});

// export { baselightTheme };
export { createBaseLightTheme, createBaseDarkTheme };
