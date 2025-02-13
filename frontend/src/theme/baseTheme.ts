import {createTheme, PaletteColorOptions} from '@mui/material';

declare module '@mui/material' {
    interface PaletteOptions {
        bgColor?: PaletteColorOptions;
        textColor?: PaletteColorOptions;
        borderColor?: PaletteColorOptions;
    }
}

export const baseTheme = createTheme({
    typography: {
        fontFamily: 'Inter, sans-serif',
    },
    palette: {
        primary: {
            light: '#FFFFFF',
            main: '#2C2C2C',
            dark: '#1E1E1E',
            contrastText: '#fff',
        },
        bgColor: {
            light: '#FFFFFF',
            main: '#FFFFFF',
            dark: '#F5F5F5',
        },
        textColor: {
            light: '#B3B3B3',
            main: '#757575',
            dark: '#1E1E1E',
        },
        borderColor: {
            light: '#D9D9D9',
            main: '#767676',
            dark: '#2C2C2C',
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: "8px"
                }
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontSize: "1rem",
                    fontColor:"textColor.dark"
                },
            },
            variants: [
                {props: {variant: "h1"}, style: {fontSize: '4.5rem', fontWeight: 700}},
                {props: {variant: "h2"}, style: {fontSize: '2.0rem', fontWeight: 400}},
                {props: {variant: "h3"}, style: {fontSize: '1.6rem', fontWeight: 300}},
                {props: {variant: "h4"}, style: {fontSize: '1.2rem', fontWeight: 300}},
                {props: {variant: "h5"}, style: {fontSize: '0.8rem', fontWeight: 400}},

            ]
        },
    }
});