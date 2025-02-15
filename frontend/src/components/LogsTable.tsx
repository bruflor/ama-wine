import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {ILogs} from "../hooks/useLogs.ts";
import {useState} from "react";

export const LogsTable = ({logs}:{logs?:ILogs[]}) => {

    if(!logs){
        return null;
    }

    return (
        <TableContainer>
            <Table sx={{minWidth: 650}} aria-label="logs-table">
                <TableHead>
                    <TableRow>
                        <TableCell component='th'>Created at</TableCell>
                        <TableCell component='th'>User name</TableCell>
                        <TableCell component='th'>Location</TableCell>
                        <TableCell component='th'>IP</TableCell>
                        <TableCell component='th'>Question</TableCell>
                        <TableCell component='th'>Answer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logs.map((log) => (
                        <Rows log={log}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>)
}

const Rows = ({log}: { log: ILogs }) => {
    const [open, setOpen] = useState(false);
    const answer = log.answer
        .map((log) => (log.message.content))
        .join("")
        .split("\n\n")

    return (
        <>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell component="td" scope="row">
                    {log.created_at}
                </TableCell>
                <TableCell component="td" scope="row">
                    {log.username}
                </TableCell>
                <TableCell component="td" scope="row">
                    {log.location}
                </TableCell>
                <TableCell component="td" scope="row">
                    {log.ip}
                </TableCell>
                <TableCell component="td" scope="row">
                    {log.question}
                </TableCell>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{marginY:"24px"}}>
                                {answer.map(paragraph => (
                                    <Typography fontSize="inherit">{paragraph}</Typography>
                                    )
                                )}
                            </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}