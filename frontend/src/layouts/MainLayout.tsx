import {AppBar} from "../components/AppBar.tsx";
import {Footer} from "../components/Footer.tsx";
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";

export const MainLayout = () => {
    return (
        <Box>
            <AppBar/>
            <Outlet />
            <Footer/>
        </Box>
    )
}