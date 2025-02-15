import {useEffect, useState} from "react";

export interface ILogs {
    id: number,
    user_id: string,
    username: string,
    location: string,
    ip: string,
    question: string,
    answer: IAnswer[],
    second_sentence?: string,
    created_at:string,

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
            const formatted = logs.map((log: { answer: string;created_at:string }) => {
                return {
                    ...log,
                    created_at: new Date(log.created_at).toLocaleString(),
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