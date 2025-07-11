import React, { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import DashboardCard from '../shared/DashboardCard';
import CustomProgressBar from './CustomProgressBar';
import { useThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const StudentPoints = () => {
    const [currentLevel] = useState(20);
    const { isDarkMode } = useThemeContext();
    const { t } = useTranslation();

    const levels = t('studentPoints.levels', { returnObjects: true });

    return (
        <DashboardCard title={t('studentPoints.title')}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h2">
                    {t('studentPoints.yourPoints')} :{' '}
                    <span style={{ color: isDarkMode ? "#1cff27" : '#5d015b' }}>5000</span>
                </Typography>
                <Button
                    variant="contained"
                    component={Link}
                    to="/leaderboard"
                    endIcon={<ArrowForwardIcon />}
                >
                    {t('studentPoints.showRank')}
                </Button>
            </Box>
            <Box mt={4}>
                <CustomProgressBar
                    milestones={[
                        levels[currentLevel - 2],
                        levels[currentLevel - 1],
                        levels[currentLevel],
                        levels[currentLevel + 1],
                    ]}
                    progressValues={[100, 100, 65, 0]}
                    spValues={[
                        t('studentPoints.sp', { value: 150 }),
                        t('studentPoints.sp', { value: 150 }),
                        t('studentPoints.sp', { value: 150 }),
                        t('studentPoints.sp', { value: 150 })
                    ]}
                />
            </Box>
        </DashboardCard>
    );
};

export default StudentPoints;
