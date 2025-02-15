import React, {useLayoutEffect, useRef} from "react";
import {Box, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {IAnswer} from "../hooks/useLogs.ts";
import {PromptInput} from "./PromptInput.tsx";

interface IContentContainerProps {
    messages: IAnswer[] | [];
    question?: string;
    onAskQuestion: (question: string) => void;
}

/**
 * Simulates a streamed response for message display, rendering the message in chunks of words to mimic a real-time chat experience.
 * This approach, using `setInterval`, improves the user experience by displaying the message word by word,
 * as if it were being typed in real time.
 */

export const ContentContainer = ({onAskQuestion, question, messages = []}: IContentContainerProps) => {
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
    }, [messages]);

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
                <PromptInput variant={"large"} onSubmit={onAskQuestion} isDisabled={!isDone} />
            </Box>
        </Box>
    );
};

