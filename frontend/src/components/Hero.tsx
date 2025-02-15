import {Container, Typography} from "@mui/material";
import {PromptInput} from "./PromptInput.tsx";

interface IHeroProps {
    variant: "small" | "full",
    onAskQuestion: (question: string) => void,
}

export const Hero = ({variant, onAskQuestion}: IHeroProps) => {
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
            {isFull && (<PromptInput variant="small" onSubmit={onAskQuestion} isDisabled={!isFull}/>)}
        </Container>
    )
}