import React from 'react';
import { Typography, Box, Button, styled } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DashboardCard from '../../../components/shared/DashboardCard';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom'; // Ensure react-router-dom is installed
import { useState } from 'react';
import { useThemeContext } from '../../../context/ThemeContext';

// Styled Components for Custom Progress Bar
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

const Progress = styled(Box)(({ theme, progress }) => ({
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 5,
    width: `${progress}%`,
    transition: 'width 0.5s ease-in-out',
}));

const Milestone = styled(Box)(({ theme, completed, active }) => ({
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

const MilestoneLabel = styled(Typography)(({ theme, completed, active }) => ({
    fontSize: '0.7rem',
    color: completed ? '#007bff' : active ? '#007bff' : '#6c757d',
    marginTop: theme.spacing(1),
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
                    const completed = progress >= 100; // Changed to >=
                    const active = progress > 0 && progress < 100;
                    let displayContent;

                    if (completed) {
                        displayContent = <CheckCircleOutlineIcon style={{ fontSize: 16, color: 'white' }} />;
                    } else if (active) {
                         displayContent = <div style={{ width: '66.66%', height: '66.66%', borderRadius: '50%', backgroundColor: '#007bff'}}/>;
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
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                {milestones.map((milestone, index) => (
                    <MilestoneLabel
                        key={index}
                        completed={progressValues[index] === 100}
                        active={progressValues[index] > 0 && progressValues[index] < 100}
                    >
                        {milestone} <br /> {spValues[index]}
                    </MilestoneLabel>
                ))}
            </div>
        </Box>
    );
};

const StudentPoints = ({xp}) => {
    const [currentLevel, setCurrentLevel] = useState(20)
    const levels = ["Alphabet Adventurer", "Kindergarten Explorer", "Word Wanderer", "Grammer Gardener", "Sentence Sprinter", "Vocabulary Voyager", "Phrase Finder", "Listening Learner", "Language Dreamer", "Speaking Star", "Punctuation Pilot", "Conjugation Captain", "Accent Acrobat", "Dialogue Dancer", "Reading Racer", "Quiz Conqueror", "Story Spinner", "Word Wizard", "Grammer Gladiator", "Culture Chaser", "Spelling Sorcerer", "Phrase Philosopher", "Listening Legend", "Sentence Sculptor", "Language Detective", "Grammar Guru", "Accent Artist", "Fluency Flyer", "Verb Voyager", "Speaking Scholar", "Syntax Seeker", "Context Climber", "Comprehension Champion", "Paragraph Pioneer", "Conversation Conductor", "Writing Warrior", "Dialogue Doctor", "Translation Trailblazer", "Syntax Sage", "Fluency Fighter", "Cultural Cruisader", "Prose Professor", "Discussion Dynamo", "Articulation Alchemist", "Language Luminary", "Wordplay Warrior", "Communication Commander", "Master of Meaning", "Eloquent Explorer", "The Professor", "Langauge Legend"]
    const {isDarkMode} = useThemeContext()
    return (
        <DashboardCard title="Student Points">
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h2">
                    Your Points : <span style={{ color: '#5d015b' }}>{xp?.points}</span>
                </Typography>
                <Button
                    variant="contained"
                    component={Link}
                    to="/leaderboard"
                    endIcon={<ArrowForwardIcon />}
                >
                    Show Rank
                </Button>
            </Box>
            <Box mt={4}>
                <CustomProgressBar
                    milestones={[levels[currentLevel-2], levels[currentLevel-1], levels[currentLevel], levels[currentLevel+1]]}
                    progressValues={[100, 100, 65, 0]}
                    spValues={['150 SP', '150 SP', '150 SP', '150 SP']}
                />
            </Box>
        </DashboardCard>
    );
};

export default StudentPoints;

