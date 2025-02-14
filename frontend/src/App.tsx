import {baseTheme} from "./theme/baseTheme.ts";
import {
    CssBaseline,
    ThemeProvider,
} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {MainLayout} from "./layouts/MainLayout.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";



function App() {


    return (
        <ThemeProvider theme={baseTheme}>
            <CssBaseline/>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />}/>
                        <Route path="dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </ThemeProvider>
    )
}

export default App
