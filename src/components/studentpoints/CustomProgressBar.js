import React from 'react';
import { Typography, Box, styled } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Styled Components
const ProgressContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: theme.spacing(2),
}));

const ProgressBar = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    margin: `0 ${theme.spacing(2)}`,
    display: 'flex',
    alignItems: 'center',
}));

const Progress = styled(Box)(({ progress }) => ({
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 5,
    width: `${progress}%`,
    transition: 'width 0.5s ease-in-out',
}));

const Milestone = styled(Box)(({ completed, active }) => ({
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: completed ? '#007bff' : active ? '#ffb6c1' : '#ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    position: 'relative',
    ...(active && {
        border: '2px solid #007bff',
    }),
}));

const MilestoneLabel = styled(Typography)(({ completed, active }) => ({
    fontSize: '0.7rem',
    color: completed ? '#007bff' : active ? '#007bff' : '#6c757d',
    marginTop: 8,
    textAlign: 'center',
    minWidth: '80px',
    wordBreak: 'break-word',
}));

const CustomProgressBar = ({ milestones, progressValues, spValues }) => {
    const totalMilestones = milestones.length;

    return (
        <Box width="100%">
            <ProgressContainer>
                {milestones.map((milestone, index) => {
                    const progress = progressValues[index] ?? 0;
                    const completed = progress >= 100;
                    const active = progress > 0 && progress < 100;

                    let displayContent;
                    if (completed) {
                        displayContent = <CheckCircleOutlineIcon style={{ fontSize: 16, color: 'white' }} />;
                    } else if (active) {
                        displayContent = <div style={{
                            width: '66.66%',
                            height: '66.66%',
                            borderRadius: '50%',
                            backgroundColor: '#007bff'
                        }} />;
                    } else {
                        displayContent = null;
                    }

                    return (
                        <React.Fragment key={index}>
                            <Milestone completed={completed} active={active}>
                                {displayContent}
                            </Milestone>
                            {index < totalMilestones - 1 && (
                                <ProgressBar>
                                    <Progress progress={progress} />
                                </ProgressBar>
                            )}
                        </React.Fragment>
                    );
                })}
            </ProgressContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                {milestones.map((milestone, index) => (
                    <MilestoneLabel
                        key={index}
                        completed={progressValues[index] === 100}
                        active={progressValues[index] > 0 && progressValues[index] < 100}
                    >
                        {milestone} <br /> {spValues[index]}
                    </MilestoneLabel>
                ))}
            </Box>
        </Box>
    );
};

export default CustomProgressBar;
