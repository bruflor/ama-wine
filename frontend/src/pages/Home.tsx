import {Hero} from "../components/Hero.tsx";
import {Box} from "@mui/material";
import {SuggestionsContainer} from "../components/SuggestionsContainer.tsx";
import {useState} from "react";
import {ContentContainer} from "../components/ContentContainer.tsx";
import {IAnswer, useLogs} from "../hooks/useLogs.ts";

export const Home = () => {
    const {logs} = useLogs()

    const [answer, setAnswer] = useState<IAnswer[] | undefined>(undefined)
    const [question, setQuestion] = useState<string | undefined>(undefined)

    const isQuestionAsked = question !== undefined;

    const handleSelectAnPreviousAnswer = (id: number) => {
        if (!logs) return
        const selected = logs.find(log => log.id === id)
        setAnswer(selected?.answer)
        setQuestion(selected?.question)
    }

    const handleAskQuestion = async (question: string) => {
        try {
            const response = await fetch('api/question', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                // This location should be retrieved by a Geolocation service or even better populated by the logged user data in the backend.
                body: JSON.stringify({question: question, location: "Lisbon"}),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data)

            setAnswer(data.answer)
        } catch (error) {
            console.error('Error:', error);
        }

    }

    // Derivative state from the last 6 logs
    const suggestions = logs && logs.length > 0 ? logs.slice(0, 6) : [];

    return (
        <>
            <Hero variant={isQuestionAsked ? "small" : "full"} onAskQuestion={(question)=> {
                setQuestion(question)
                handleAskQuestion(question)
            }}/>
            <Box sx={{
                padding: {xs: "2rem", sm: "3rem", md: "4rem"},
            }}>
                {!isQuestionAsked &&
                    <SuggestionsContainer suggestions={suggestions} onSelect={handleSelectAnPreviousAnswer}/>}

                {isQuestionAsked &&
                    <ContentContainer answer={answer} question={question} onAskQuestion={(question)=> {
                        setQuestion(question)
                        setAnswer(undefined)
                        handleAskQuestion(question)
                }}/>}

            </Box>
        </>
    )
}