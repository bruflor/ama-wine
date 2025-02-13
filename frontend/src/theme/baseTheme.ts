import { createTheme, PaletteColorOptions } from '@mui/material';

declare module '@mui/material' {
    interface PaletteOptions {
        bgColor?: PaletteColorOptions;
        textColor?: PaletteColorOptions;
        borderColor?: PaletteColorOptions;
    }
}

export const baseTheme = createTheme({
    palette: {
        primary: {
            light: '#FFFFFF',
            main: '#2C2C2C',
            dark: '#1E1E1E',
            contrastText: '#fff',
        },
        bgColor:{
            light: '#FFFFFF',
            main: '#FFFFFF',
            dark: '#F5F5F5',
        },
        textColor:{
            light: '#B3B3B3',
            main:'#757575',
            dark:'#1E1E1E',
        },
        borderColor:{
            light: '#D9D9D9',
            main: '#767676',
            dark:'#2C2C2C',
        }

    }
});