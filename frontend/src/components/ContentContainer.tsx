import React, {useLayoutEffect, useRef} from "react";
import {Box, CircularProgress, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {IAnswer} from "../hooks/useLogs.ts";
import {PromptInput} from "./PromptInput.tsx";

interface IContentContainerProps {
    answer?: IAnswer[];
    question?: string;
    onAskQuestion: (question: string) => void;
}

/**
 * Simulates a streamed response for message display, rendering the message in chunks of words to mimic a real-time chat experience.
 * This approach, using `setInterval`, improves the user experience by displaying the message word by word,
 * as if it were being typed in real time.
 */

export const ContentContainer = ({onAskQuestion, question, answer}: IContentContainerProps) => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [currentMessage, setCurrentMessage] = useState(" ");
    const [isDone, setIsDone] = useState(false);
    const isLoading = answer === undefined;

    const divRef = useRef<HTMLDivElement>(null);

    const handleNewQuestion = (question: string) => {
        setIsDone(false);
        setCurrentMessageIndex(0);
        setCurrentMessage(" ")
        onAskQuestion(question);
    }

    useEffect(() => {
        if (isDone || !answer) return;

        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;

                // Check if the next index is out of bounds
                if (nextIndex >= answer.length) {
                    setIsDone(true);
                    clearInterval(interval);
                    return prevIndex;
                }

                // Check if the next message is the last one (done is true)
                if (answer[nextIndex].done) {
                    setIsDone(true);
                    clearInterval(interval);
                }

                return nextIndex;
            });
        }, 20);

        return () => clearInterval(interval);
    }, [isDone, answer]);

    useEffect(() => {
        if (!answer) return
        if (currentMessageIndex < answer.length) {
            const newMessageContent = answer[currentMessageIndex].message.content;

            setCurrentMessage((prevMessage) => {
                // Avoid appending the same message twice
                if (!prevMessage.endsWith(newMessageContent)) {
                    return prevMessage + newMessageContent;
                }
                return prevMessage;
            });
        }
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }

    }, [currentMessageIndex, answer]);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [answer]);

    const paragraphs = currentMessage.split("\n\n");

    const formatParagraph = (paragraph: string) => {
        const lines = paragraph.split("\n").map((line, index) => (
            <Typography
                key={index}
                sx={{fontSize: "16px", fontWeight: 400}}
            >
                {line}
            </Typography>
        ));

        return <>{lines}</>;
    };

    return (
        <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column", gap: "16px"}}>
            <Typography variant={"h2"} sx={{fontSize: "24px", fontWeight: 600}}>{question}</Typography>
            <Box ref={divRef} sx={{
                display: "flex", flexDirection: "column", gap: "8px",
                maxHeight: "400px", overflowY: "auto",
                scrollbarColor: '#d9d9d9 #fff',
                scrollbarWidth: 'thin',
            }}>
                {!isLoading && paragraphs.map((paragraph, index) => (
                    <React.Fragment key={index}>
                        {formatParagraph(paragraph)}
                    </React.Fragment>
                ))}
            </Box>

            {/*Loading purpose*/}
            {isLoading && <Box sx={{display: "flex", gap: "24px", alignItems: "center"}}>
                <CircularProgress size="30px"/>
                <Typography>Just a second, the response may take a little longer than usual.</Typography>
            </Box>}

            <Box sx={{marginTop:"32px"}}>
                <Typography>What would you like to know:</Typography>
                <PromptInput variant={"large"} onSubmit={handleNewQuestion} isDisabled={!isDone}/>
            </Box>
        </Box>
    );
};

