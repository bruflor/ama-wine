import {Box, Typography} from "@mui/material";
import {LogsTable} from "../components/LogsTable.tsx";
import {useLogs} from "../hooks/useLogs.ts";
import {Hero} from "../components/Hero.tsx";
import {KeyMetrics} from "../components/KeyMetrics.tsx";

export const Dashboard = () => {
    const {logs} = useLogs();
    // Adding an early return to prevent processing
    if (!logs || logs.length === 0) {
        return <div>No logs available.</div>;
    }


    return (
        <>
            <Hero variant={"small"} onAskQuestion={() => {
            }}/>
            <Box sx={{
                padding: {xs: "2rem", sm: "3rem", md: "4rem"},
                display: "flex", flexDirection: "column", gap: "24px"
            }}>
                <Typography variant={"h2"} sx={{fontSize: "24px", fontWeight: 600}}>Key metrics</Typography>
                <KeyMetrics logs={logs} />

                <Typography variant={"h2"} sx={{fontSize: "24px", fontWeight: 600, marginTop:"48px"}}>Users logs</Typography>
                <LogsTable logs={logs}/>
            </Box>
        </>
    )
}