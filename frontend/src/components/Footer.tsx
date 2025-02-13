import {Box, Link, Typography} from "@mui/material";
import figmaLogo from "../../public/figma.svg"
import igLogo from "../../public/instagram.svg"
import linkedInLogo from "../../public/linkedIn.svg"
import youtubeLogo from "../../public/youTube.svg"
import xLogo from "../../public/x.svg"


const useCasesLinks = [
    {
        label: "UI design",
        path: "#"
    },
    {
        label: "UX design",
        path: "#"
    },
    {
        label: "Wireframing",
        path: "#"
    },
    {
        label: "Diagramming",
        path: "#"
    },
    {
        label: "Brainstorming",
        path: "#"
    },
    {
        label: "Online whiteboard",
        path: "#"
    },
    {
        label: "Team collaboration",
        path: "#"
    }
];
const exploreLinks = [
    {
        label: "Explore",
        path: "#"
    },
    {
        label: "Design",
        path: "#"
    },
    {
        label: "Prototyping",
        path: "#"
    },
    {
        label: "Development features",
        path: "#"
    },
    {
        label: "Design systems",
        path: "#"
    },
    {
        label: "Collaboration features",
        path: "#"
    },
    {
        label: "Design process",
        path: "#"
    },
    {
        label: "FigJam",
        path: "#"
    }
];
const resourcesLinks = [
    {
        label: "Resources",
        path: "#"
    },
    {
        label: "Blog",
        path: "#"
    },
    {
        label: "Best practices",
        path: "#"
    },
    {
        label: "Colors",
        path: "#"
    },
    {
        label: "Color wheel",
        path: "#"
    },
    {
        label: "Support",
        path: "#"
    },
    {
        label: "Developers",
        path: "#"
    },
    {
        label: "Resource library",
        path: "#"
    }
];

export const Footer = () => {
    return (
        <Box sx={{
            paddingX: {xs: "2rem", sm: "3rem", md: "4rem"},
            paddingBottom: "170px",
            paddingTop: "64px",
            borderTop: "1px solid",
            borderColor: "borderColor.light",
            fontSize: "16px",
            display: "flex",
            gap: {xs: "32px", sm: "24px", md: "8px"},
            flexDirection: {xs: "column", sm: "column", md: "row"},
        }}>
            <Box id="logos"
                 sx={{width: {sm: "100%", md: "25%"}, display: "flex", gap: "24px", flexDirection: "column"}}>
                <Box sx={{height: "35px"}}><img src={figmaLogo}/></Box>
                <Box id="logos-container" sx={{display: "flex", gap: "16px", height: "24px"}}>
                    <img src={xLogo}/>
                    <img src={igLogo}/>
                    <img src={youtubeLogo}/>
                    <img src={linkedInLogo}/>
                </Box>
            </Box>
            <Box id="use-cases"
                 sx={{width: {sm: "100%", md: "25%"}, display: "flex", flexDirection: "column", gap: "12px"}}>
                <Typography sx={{fontWeight: 600, fontSize: "inherit", marginBottom: "18px"}}>Use cases</Typography>
                {useCasesLinks.map((link) => (
                    <Link href={link.path} color="inherit" sx={{
                        fontSize: "inherit", textDecoration: "none"
                    }}>
                        {link.label}
                    </Link>
                ))}
            </Box>
            <Box id="explore"
                 sx={{width: {sm: "100%", md: "25%"}, display: "flex", flexDirection: "column", gap: "12px"}}>
                <Typography sx={{fontWeight: 600, fontSize: "inherit", marginBottom: "18px"}}>Explore</Typography>
                {exploreLinks.map((link) => (
                    <Link href={link.path} color="inherit" sx={{
                        fontSize: "inherit", textDecoration: "none"
                    }}>                        {link.label}
                    </Link>
                ))}
            </Box>
            <Box id="resources"
                 sx={{width: {sm: "100%", md: "25%"}, display: "flex", flexDirection: "column", gap: "12px"}}>
                <Typography sx={{fontWeight: 600, fontSize: "inherit", marginBottom: "18px"}}>Resources</Typography>
                {resourcesLinks.map((link) => (
                    <Link href={link.path} color="inherit" sx={{
                        fontSize: "inherit", textDecoration: "none"
                    }}>                        {link.label}
                    </Link>
                ))}
            </Box>
        </Box>
    )
}
