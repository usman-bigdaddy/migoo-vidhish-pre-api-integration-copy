import React from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    LinearProgress
} from '@mui/material';
import {Card, Grid2, Button} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DashboardCard from '../../../components/shared/DashboardCard';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PieChartComponent from './PieChartComponent';
import { BubbleChartTwoTone } from '@mui/icons-material';
import LinearProgressComponent from './LinearProgressComponent';
import { Link } from 'react-router';
import { useThemeContext } from '../../../context/ThemeContext';


const products = [
    {
        id:1,
        description:"Reading Comprehension",
        studypoints:250,
        status:false
    },
    {
        id:2,
        description:"Sentence Completions",
        studypoints:300,
        status:true
    },
    {
        id:3,
        description:"Reading Comprehensions",
        studypoints:140,
        status:true
    },
    {
        id:4,
        description:"Restatements",
        studypoints:400,
        status:false
    },
    {
        id:5,
        description:"Reading Comprehension",
        studypoints:230,
        status:true
    }
   ];


const StudentPoints = () => {
        const {isDarkMode} = useThemeContext()
    return (

        <DashboardCard
         title="Student Points"
         >
            <Box 
            sx={{ 
                display:"flex",
                justifyContent:"space-between"
                }}>
           <Typography variant="h2" m={1}>Your Points : <span style={{color:isDarkMode? "#1cff27" :'#5d015b'}}>5000</span></Typography>
           <Button variant="contained"
           component={Link}
           to="/leaderboard"
           endIcon={<ArrowForwardIosIcon />}
           >Show Rank</Button>
            </Box>
            <Grid2 container style={{display:"flex"}}>
            <LinearProgressComponent 
            title="Reading"
            sp={150}
            progress={100}
             />
            <LinearProgressComponent 
            title="Sentence"
            sp={150}
            progress={100}
             />
           <LinearProgressComponent 
            title="Listening"
            sp={150}
            progress={65}
             />
             <LinearProgressComponent 
            title="Word Bank"
            sp={150}
            progress={0}
             />
            </Grid2>
        </DashboardCard>
    );
};

export default StudentPoints;
