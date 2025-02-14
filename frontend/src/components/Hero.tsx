import {Container, InputAdornment, TextField, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface IHeroProps {
    variant: "small" | "full"
}

export const Hero = ({variant}: IHeroProps) => {
    const isFull = variant === "full";

    return (
        <Container maxWidth={false} sx={{
            backgroundColor: "bgColor.dark",
            padding: isFull ? "160px 56px 48px 48px" : "8px 26px 24px 24px",
            display: 'flex',
            gap: "8px",
            flexDirection: 'column',
            justifyContent:'center',
            alignItems: 'center',
            textAlign:'center'
        }}>
            <Typography variant="h1" sx={{fontSize: !isFull ? "48px" : undefined}}>Everything about wine</Typography>
            <Typography variant="h2" sx={{color: "textColor.main"}}>What would you like to know?</Typography>
            {isFull && <TextField
                id="search-bar-round"
                placeholder="A question, a curiosity, anything you would like to know"
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end" sx={{color: "textColor.dark"}}>
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    },
                }}
                variant="outlined"
                sx={{
                    marginY: "24px",
                    minWidth: {sm:'100%', md:'500px'},
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                        borderRadius: '64px',
                        borderColor: "borderColor.light"
                    }
                }}/>}
        </Container>
    )
}