import {Avatar, Box, Card, CardActionArea, CardContent, Container, Typography} from "@mui/material";

interface ISuggestionsContainerProps {
    suggestions?: suggestion[],
    onSelect: (id: number) => void,
}

type suggestion = {
    "id": number,
    "username": string,
    "question": string,
    "location": string,
}

export const SuggestionsContainer = ({suggestions = [], onSelect}: ISuggestionsContainerProps) => {
    return (
        <Container maxWidth={false} sx={{ display:"flex", flexDirection:"column", gap:"48px", marginBottom:"64px"}}>
            <Box id={'title'} sx={{display: "flex", flexDirection: "column", gap: "8px"}}>
                <Typography variant="h3" sx={{color: "textColor.dark", fontWeight: 600}}>
                    Suggestions
                </Typography>
                <Typography variant="h4" sx={{color: "textColor.main"}}>
                    Get an immediate answer
                </Typography>
            </Box>

            <Box sx={{ display:"flex", gap:"24px", flexWrap:"wrap"}}>
                {suggestions?.length > 0 && suggestions?.map((suggestion) => (
                    <Card variant="outlined" sx={{borderRadius:"8px",minWidth:"300px",
                        flex: "1 0 30%", maxWidth: {xs:"100%",md:"30%"}, height:"fit-content"
                    }}>
                        <CardActionArea
                            onClick={() => onSelect(suggestion.id)}
                        >
                            <CardContent sx={{display:"flex", flexDirection:"column", gap:"24px"}}>
                                <Typography variant="h4" sx={{
                                    color: "textColor.dark",
                                    fontWeight: 600
                                }}>
                                    "{suggestion.question}"
                                </Typography>

                                <Box sx={{display: "flex", gap: "12px", alignItems: "center"}}>
                                    <Avatar
                                        alt={suggestion.username}
                                        src="/broken-image.jpg"
                                    />
                                    <Box>
                                        <Typography variant="body1" sx={{fontSize:"16px", fontWeight: 600, color:"textColor.main"}}>{suggestion.username}</Typography>
                                        <Typography variant="body2" sx={{fontSize:"16px", fontWeight: 400, color:"textColor.light"}}>{suggestion.location}</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}

                {suggestions?.length === 0 && <Typography variant="body2" sx={{fontSize:"16px", fontWeight: 400, color:"textColor.light"}}>No suggestions at the moment</Typography>}
            </Box>

        </Container>
    )
}