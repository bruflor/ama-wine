import {baseTheme} from "./theme/baseTheme.ts";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import {AppBar} from "./components/AppBar.tsx";

function App() {

    return (
        <ThemeProvider theme={baseTheme}>
            <CssBaseline />

            <Box>
                <AppBar/>
                <Box sx={{ bgcolor: `neutral.main`, width: 40, height: 20 }} />
            </Box>

        </ThemeProvider>
    )
}

export default App
