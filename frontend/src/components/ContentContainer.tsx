import React, {useLayoutEffect, useRef} from "react";
import {Box, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {IAnswer} from "../pages/useLogs.ts";

interface IContentContainerProps {
    messages: IAnswer[] | [];
    question?: string
}

// This component is simulating a streamed response

export const ContentContainer = ({question, messages = []}: IContentContainerProps) => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [currentMessage, setCurrentMessage] = useState(" ");
    const [isDone, setIsDone] = useState(false);

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isDone) return;

        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;

                // Check if the next index is out of bounds
                if (nextIndex >= messages.length) {
                    setIsDone(true);
                    clearInterval(interval);
                    return prevIndex;
                }

                // Check if the next message is the last one (done is true)
                if (messages[nextIndex].done) {
                    setIsDone(true);
                    clearInterval(interval);
                }

                return nextIndex;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isDone, messages.length]);

    useEffect(() => {
        if (currentMessageIndex < messages.length) {
            const newMessageContent = messages[currentMessageIndex].message.content;

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

    }, [currentMessageIndex, messages]);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

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
        <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column", gap: "48px"}}>
            <Box sx={{display: "flex", flexDirection: "column", gap: "8px",
                maxHeight:"300px", overflowY: "auto"
            }} ref={divRef}>
                <Typography variant={"h2"} sx={{fontSize: "24px", fontWeight: 600}}>{question}</Typography>
                {paragraphs.map((paragraph, index) => (
                    <React.Fragment key={index}>
                        {formatParagraph(paragraph)}
                    </React.Fragment>
                ))}
            </Box>

            <Box>
                <Typography>What would you like to know:</Typography>
                <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    maxRows={6}
                    sx={{borderRadius: "8px", marginTop: "8px"}}
                    disabled={!isDone}
                />
            </Box>
        </Box>
    );
};

