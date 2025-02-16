import {Box, Card, CardContent, Typography} from "@mui/material";
import {ILogs} from "../hooks/useLogs.ts";
import ReactApexChart from "react-apexcharts";
import {ReactNode} from "react";

// Simulating key metrics data to populate dashboard. Currently, the users and location are hardcoded between the services, backend and frontend, so will always render the same values

export const KeyMetrics = ({logs}: { logs: ILogs[] }) => {
    const colors = ["#878787", "#605f5f"]
    const chartsHeight = 160

    // Most active users
    const userInteractionCounts = logs.reduce((acc, log) => {
        acc[log.username] = (acc[log.username] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    const mostActiveUsers = Object.entries(userInteractionCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    // Top locations
    const locationCounts = logs.reduce((acc, log) => {
        acc[log.location] = (acc[log.location] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    const topLocations = Object.entries(locationCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    // Prepare data for ApexCharts
    const mostActiveUsersChartOptions = {
        xaxis: {
            categories: mostActiveUsers.map(([user]) => user),
        },
        colors:colors
    };
    const mostActiveUsersChartSeries = [
        {
            name: 'Interactions',
            data: mostActiveUsers.map(([_, count]) => count),
        },
    ];
    const questionCounts = logs.reduce((acc, log) => {
        acc[log.question] = (acc[log.question] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const mostCommonQuestions = Object.entries(questionCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const mostCommonQuestionsChartOptions = {
        xaxis: {
            categories: mostCommonQuestions.map(([question]) => question),
        },
        colors:colors    };
    const mostCommonQuestionsChartSeries = [
        {
            name: 'Frequency',
            data: mostCommonQuestions.map(([_, count]) => count),
        },
    ];

    const topLocationsChartOptions = {
        labels: topLocations.map(([location]) => location),
        colors:colors
    };
    const topLocationsChartSeries = topLocations.map(([_, count]) => count);

    return (
        <Box sx={{display:"flex", gap:"24px", flexWrap:"wrap"}}>

            <BaseCard>
                <Typography sx={{fontWeight:700, fontSize:"18px"}}>Most Active Users</Typography>
                <ReactApexChart
                    options={mostActiveUsersChartOptions}
                    series={mostActiveUsersChartSeries}
                    type="bar"
                    height={chartsHeight}
                />
            </BaseCard>

            <BaseCard>
                <Typography sx={{fontWeight:700, fontSize:"18px"}}>Top Locations</Typography>
                <ReactApexChart
                    options={topLocationsChartOptions}
                    series={topLocationsChartSeries}
                    type="pie"
                    height={chartsHeight}
                />
            </BaseCard>
            <BaseCard>
                <Typography sx={{fontWeight:700, fontSize:"18px"}}>Most common questions</Typography>
                <ReactApexChart
                    options={mostCommonQuestionsChartOptions}
                    series={mostCommonQuestionsChartSeries}
                    type="bar"
                    height={chartsHeight}
                />
            </BaseCard>
        </Box>
    )
}

const BaseCard = ({children}: { children: ReactNode }) => (
    <Card variant="outlined" sx={{borderRadius: "8px", flexGrow: 1}}>
        <CardContent>
            {children}
        </CardContent>
    </Card>
)