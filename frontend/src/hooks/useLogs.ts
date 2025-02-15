import {useEffect, useState} from "react";

export interface ILogs {
    "ip": string,
    "username": string,
    "answer": IAnswer[],
    "second_sentence"?: string,
    "id": number,
    "question": string,
    "location": string,
    "user_id": string
}

export interface IAnswer {
    created_at: string,
    done: boolean,
    message: {
        role: string,
        content: string
    },
    model: string
}


export const useLogs = () => {
    const [logs, setLogs] = useState<ILogs[] | undefined>()

    const getLogs = async () => {
        try {
            const logs = await fetch("api/logs").then((res) => res.json())
            const formatted = logs.map((log: { answer: string; }) => {
                return {
                    ...log,
                    answer: JSON.parse(log.answer)
                }
            })
            return formatted
        } catch (err) {
            throw err
        }
    }

    useEffect(() => {
        getLogs().then(data => setLogs(data))
    }, [])

    return {logs}
}