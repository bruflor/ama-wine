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
    Typography, useMediaQuery
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {ILogs} from "../hooks/useLogs.ts";
import {useState} from "react";

export const LogsTable = ({logs}:{logs?:ILogs[]}) => {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('md'));

    if(!logs){
        return null;
    }

    return (
        <TableContainer>
            <Table aria-label="logs-table">
                <TableHead>
                    <TableRow>
                        {!isSmallScreen && <>
                        <TableCell component='th'>Created at</TableCell>
                        <TableCell component='th'>User name</TableCell>
                        <TableCell component='th'>Location</TableCell>
                        <TableCell component='th'>IP</TableCell>

                        </>}
                        <TableCell component='th'>Question</TableCell>
                        <TableCell component='th'>Answer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logs.map((log) => (
                        <Rows key={log.id} log={log} isSmallScreen={isSmallScreen}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>)
}

const Rows = ({log, isSmallScreen}: { log: ILogs, isSmallScreen:boolean } ) => {
    const [open, setOpen] = useState(false);
    const answer = log.answer
        .map((log) => (log.message.content))
        .join("")
        .split("\n\n")

    return (
        <>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}} onClick={() => setOpen(!open)}>
                {!isSmallScreen && <>
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
                </>}
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
                            <Box sx={{marginY:"48px", display:'flex', flexDirection:"column", gap:"16px"}}>
                                {isSmallScreen &&
                                <Box>
                                    <Typography fontSize="14px">Created at: {log.created_at}</Typography>
                                    <Typography fontSize="14px">User name: {log.username}</Typography>
                                    <Typography fontSize="14px">Location: {log.location}</Typography>
                                    <Typography fontSize="14px">IP: {log.ip}</Typography>
                                </Box>}
                                
                                {answer.map(paragraph => (
                                    <Typography key={paragraph} fontSize="inherit">{paragraph}</Typography>
                                    )
                                )}
                            </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}