import {baseTheme} from "./theme/baseTheme.ts";
import {
    Box,
    CssBaseline,
    ThemeProvider,
} from "@mui/material";
import {AppBar} from "./components/AppBar.tsx";
import {Hero} from "./components/Hero.tsx";
import {SuggestionsContainer} from "./components/SuggestionsContainer.tsx";
import {ContentContainer} from "./components/ContentContainer.tsx";
import {Footer} from "./components/Footer.tsx";

const mockSuggestions = [
    {
        "ip": "172.24.0.1",
        "username": "User name",
        "answer": "[{\"model\": \"llama2:latest\", \"created_at\": \"2025-02-13T16:22:01.078994436Z\", \"message\": {\"role\": \"assistant\", \"content\": \"The\"}, \"done\": false}, {\"model\": \"llama2:latest\", \"created_at\": \"2025-02-13T16:22:01.310507503Z\", \"message\": {\"role\": \"assistant\", \"content\": \" sum\"}, \"done\": false}, {\"model\": \"llama2:latest\", \"created_at\": \"2025-02-13T16:22:01.537067154Z\", \"message\": {\"role\": \"assistant\", \"content\": \" of\"}, \"done\": false}, {\"model\": \"llama2:latest\", \"created_at\": \"2025-02-13T16:22:01.765893281Z\", \"message\": {\"role\": \"assistant\", \"content\": \" \"}, \"done\": false}, {\"model\": \"llama2:latest\", \"created_at\": \"2025-02-13T16:22:02.053093471Z\", \"message\": {\"role\": \"assistant\", \"content\": \"1\"}, \"done\": false}, {\"model\": \"llama2:latest\", \"created_at\": \"2025-02-13T16:22:02.281333901Z\", \"message\": {\"role\": \"assistant\", \"content\": \" +\"}, \"done\": false}, {\"model\": \"llama2:latest\", \"created_at\": \"2025-02-13T16:22:02.520831587Z\", \"message\": {\"role\": \"assistant\", \"content\": \" \"}, \"done\": false}, {\"model\": \"llama2:latest\", \"created_at\": \"2025-02-13T16:22:02.748679175Z\", \"message\": {\"role\": \"assistant\", \"content\": \"2\"}, \"done\": false}, {\"model\": \"llama2:latest\", \"created_at\": \"2025-02-13T16:22:02.973381452Z\", \"message\": {\"role\": \"assistant\", \"content\": \" is\"}, \"done\": false}, {\"model\": \"llama2:latest\", \"created_at\": \"2025-02-13T16:22:03.200465705Z\", \"message\": {\"role\": \"assistant\", \"content\": \" \"}, \"done\": false}, {\"model\": \"llama2:latest\", \"created_at\": \"2025-02-13T16:22:03.433190832Z\", \"message\": {\"role\": \"assistant\", \"content\": \"3\"}, \"done\": false}, {\"model\": \"llama2:latest\", \"created_at\": \"2025-02-13T16:22:03.662826931Z\", \"message\": {\"role\": \"assistant\", \"content\": \".\"}, \"done\": false}, {\"model\": \"llama2:latest\", \"created_at\": \"2025-02-13T16:22:03.95141464Z\", \"message\": {\"role\": \"assistant\", \"content\": \"\"}, \"done\": true, \"total_duration\": 11354132582, \"load_duration\": 2879022153, \"prompt_eval_count\": 27, \"prompt_eval_duration\": 5476382000, \"eval_count\": 13, \"eval_duration\": 2871865000}]",
        "second_sentence": null,
        "id": 1,
        "question": "How much is 1+2",
        "location": "string",
        "user_id": "1234"
    }
]

function App() {
    const isQuestionAsked = false

    // Derivated state from the last 6 logs
    const suggestions = mockSuggestions.length === 0 ? [] : mockSuggestions.slice(0, 5).map((suggestion) => {
        return {
            id: suggestion.id,
            username: suggestion.username,
            question: suggestion.question,
            location: suggestion.location,
        }
    })

    return (
        <ThemeProvider theme={baseTheme}>
            <CssBaseline/>

            <Box>
                <AppBar/>
                <Hero variant={isQuestionAsked ? "small" : "full"}/>
                <Box sx={{
                    padding: {xs: "2rem", sm: "3rem", md: "4rem"},
                }}>
                    {/*{isQuestionAsked === undefined && <Typography>Loading...</Typography>}*/}

                    {isQuestionAsked === false &&
                        <SuggestionsContainer suggestions={suggestions} onSelect={(id) => console.log(id)}/>}

                    {/*{isQuestionAsked === true && <ContentContainer />}*/}

                </Box>
                <Footer/>
            </Box>

        </ThemeProvider>
    )
}

export default App
