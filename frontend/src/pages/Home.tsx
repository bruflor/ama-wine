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

    const isQuestionAsked = answer !== undefined;

    const handleSelectAnPreviousAnswer = (id: number) => {
        if (!logs) return
        const selected = logs.find(log => log.id === id)
        setAnswer(selected?.answer)
        setQuestion(selected?.question)
    }

    const handleAskQuestion = async (question: string) => {
        try {
            setQuestion(question);
            // const response = await fetch('api/question', {
            //     method: 'POST',
            //     headers: {'Content-Type': 'application/json'},
            //     body: JSON.stringify({question: question, location: "Lisbon"}),
            // });
            //
            // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }
            //
            // const data = await response.json();
            // return data;
            const answer = [
                {
                    "model": "llama2:latest",
                    "created_at": "2025-02-13T16:22:01.078994436Z",
                    "message": {
                        "role": "assistant",
                        "content": "The"
                    },
                    "done": false
                },
                {
                    "model": "llama2:latest",
                    "created_at": "2025-02-13T16:22:01.310507503Z",
                    "message": {
                        "role": "assistant",
                        "content": " sum"
                    },
                    "done": false
                },
                {
                    "model": "llama2:latest",
                    "created_at": "2025-02-13T16:22:01.537067154Z",
                    "message": {
                        "role": "assistant",
                        "content": " of"
                    },
                    "done": false
                },
                {
                    "model": "llama2:latest",
                    "created_at": "2025-02-13T16:22:01.765893281Z",
                    "message": {
                        "role": "assistant",
                        "content": " "
                    },
                    "done": false
                },
                {
                    "model": "llama2:latest",
                    "created_at": "2025-02-13T16:22:02.053093471Z",
                    "message": {
                        "role": "assistant",
                        "content": "1"
                    },
                    "done": false
                },
                {
                    "model": "llama2:latest",
                    "created_at": "2025-02-13T16:22:02.281333901Z",
                    "message": {
                        "role": "assistant",
                        "content": " +"
                    },
                    "done": false
                },
                {
                    "model": "llama2:latest",
                    "created_at": "2025-02-13T16:22:02.520831587Z",
                    "message": {
                        "role": "assistant",
                        "content": " "
                    },
                    "done": false
                },
                {
                    "model": "llama2:latest",
                    "created_at": "2025-02-13T16:22:02.748679175Z",
                    "message": {
                        "role": "assistant",
                        "content": "2"
                    },
                    "done": false
                },
                {
                    "model": "llama2:latest",
                    "created_at": "2025-02-13T16:22:02.973381452Z",
                    "message": {
                        "role": "assistant",
                        "content": " is"
                    },
                    "done": false
                },
                {
                    "model": "llama2:latest",
                    "created_at": "2025-02-13T16:22:03.200465705Z",
                    "message": {
                        "role": "assistant",
                        "content": " "
                    },
                    "done": false
                },
                {
                    "model": "llama2:latest",
                    "created_at": "2025-02-13T16:22:03.433190832Z",
                    "message": {
                        "role": "assistant",
                        "content": "3"
                    },
                    "done": false
                },
                {
                    "model": "llama2:latest",
                    "created_at": "2025-02-13T16:22:03.662826931Z",
                    "message": {
                        "role": "assistant",
                        "content": "."
                    },
                    "done": false
                },
                {
                    "model": "llama2:latest",
                    "created_at": "2025-02-13T16:22:03.95141464Z",
                    "message": {
                        "role": "assistant",
                        "content": ""
                    },
                    "done": true,
                    "total_duration": 11354132582,
                    "load_duration": 2879022153,
                    "prompt_eval_count": 27,
                    "prompt_eval_duration": 5476382000,
                    "eval_count": 13,
                    "eval_duration": 2871865000
                }
            ]
            setAnswer(answer)
        } catch (error) {
            console.error('Error:', error);
        }

    }
    // Derivative state from the last 6 logs
    const suggestions = logs && logs.length > 0 ? logs.slice(0, 5) : [];

    return (
        <>
            <Hero variant={isQuestionAsked ? "small" : "full"} onAskQuestion={handleAskQuestion}/>
            <Box sx={{
                padding: {xs: "2rem", sm: "3rem", md: "4rem"},
            }}>
                {/*{isQuestionAsked === undefined && <Typography>Loading...</Typography>}*/}

                {isQuestionAsked === false &&
                    <SuggestionsContainer suggestions={suggestions} onSelect={handleSelectAnPreviousAnswer}/>}

                {isQuestionAsked === true &&
                    <ContentContainer messages={answer} question={question} onAskQuestion={handleAskQuestion}/>}

            </Box>
        </>
    )
}