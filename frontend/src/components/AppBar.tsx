import {
    AppBar as MuiAppBar,
    Box,
    Button,
    Container, Divider,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
} from '@mui/material'
import {Link} from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import figmaLogo from "../assets/figma.svg"

import {useState, MouseEvent} from "react";


export const AppBar = () => {
    const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
    const pages = ['Serviços', 'Comunidade', "Recursos", "Contacto"];

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <MuiAppBar position="static" sx={{
            minHeight: "99px",
            backgroundColor: "bgColor.main",

        }} variant="outlined">
            <Container maxWidth={false}>
                <Toolbar disableGutters sx={{alignItems: "center", padding: "24px", justifyContent: "space-between",  borderBottom: "1px",
                    borderColor: "borderColor.light"}}>
                    <Box component={Link} to="/"><img src={figmaLogo}/></Box>

                    {/*Menu for big screens*/}
                    <Box id="menu-big"
                         sx={{flexGrow: 1, gap: "24px", display: {xs: 'none', md: 'flex'}, justifyContent: "end"}}>
                        <Box id={"menu-links"}
                             sx={{gap: "8px", display: {xs: 'none', md: 'flex'}, justifyContent: "end"}}>
                            <Button variant="contained" disableElevation
                                    sx={{backgroundColor: "bgColor.dark", color: "textColor.dark"}}>Initio</Button>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        <Box id={"menu-actions"}
                             sx={{gap: "8px", display: {xs: 'none', md: 'flex'}, justifyContent: "end"}}>
                            <Button variant={"contained"} sx={{
                                backgroundColor: "#e3e3e3",
                                color: "textColor.dark",
                                border: "1px solid #767676"
                            }} disableElevation>Sign in</Button>
                            <Button variant={"contained"} disableElevation>Registrar</Button>
                        </Box>
                    </Box>

                    {/*Menu for small screens*/}
                    <Box id="menu-small" sx={{display: {xs: 'flex', md: 'none'}, color: "textColor.dark"}}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{display: {xs: 'block', md: 'none'}}}
                        >
                            <MenuItem>Initio</MenuItem>
                            <Divider sx={{my: 0.5}}/>
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    {page}
                                </MenuItem>
                            ))}
                            <Divider sx={{my: 0.5}}/>

                            <MenuItem>Sign in</MenuItem>
                            <MenuItem>Registrar</MenuItem>
                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </MuiAppBar>
    )
}