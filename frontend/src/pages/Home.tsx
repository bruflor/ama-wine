import {Hero} from "../components/Hero.tsx";
import {Box} from "@mui/material";
import {SuggestionsContainer} from "../components/SuggestionsContainer.tsx";
import {useState} from "react";
import {ContentContainer} from "../components/ContentContainer.tsx";
import {IAnswer, useLogs} from "./useLogs.ts";

export const Home = () => {
    const {logs} = useLogs()
    const [answer, setAnswer] = useState<IAnswer[] | undefined>(undefined)
    const [question, setQuestion] = useState<string | undefined>(undefined)

    const isQuestionAsked = answer !== undefined;

    const handleSelectAnPreviousAnswer = (id: number) => {
        if (!logs) return
        const selected = logs.find(log => log.id === id)
        setAnswer(selected?.answer)
        setQuestion(selected?.question)
    }

    // Derivative state from the last 6 logs
    const suggestions = logs && logs.length > 0 ? logs.slice(0, 5) : [];

    return (
        <>
            <Hero variant={isQuestionAsked ? "small" : "full"}/>
            <Box sx={{
                padding: {xs: "2rem", sm: "3rem", md: "4rem"},
            }}>
                {/*{isQuestionAsked === undefined && <Typography>Loading...</Typography>}*/}

                {isQuestionAsked === false &&
                    <SuggestionsContainer suggestions={suggestions} onSelect={handleSelectAnPreviousAnswer}/>}

                {isQuestionAsked === true &&
                    <ContentContainer messages={answer} question={question}/>}

            </Box>
        </>
    )
}