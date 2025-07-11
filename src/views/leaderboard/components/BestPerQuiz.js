import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Grid2, 
  Avatar,
  Chip,
  Stack
} from '@mui/material';
import { EmojiEvents, Quiz, Psychology, School, Assessment, Mic } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const BestPerQuiz = ({ bestPerQuiz }) => {
  const { t } = useTranslation();

  // Map quiz types to icons and display names
  const quizTypeConfig = {
    'grammar_audio': { icon: <Mic />, label: 'Grammar Audio', color: '#ff9800' },
    'category_Sentence structure': { icon: <School />, label: 'Sentence Structure', color: '#2196f3' },
    'practice': { icon: <Assessment />, label: 'Practice', color: '#4caf50' },
    'quiz': { icon: <Quiz />, label: 'Quiz', color: '#9c27b0' },
    'diagnostic': { icon: <Psychology />, label: 'Diagnostic', color: '#f44336' },
    'test': { icon: <EmojiEvents />, label: 'Test', color: '#ff5722' }
  };

  if (!bestPerQuiz || bestPerQuiz.length === 0) {
    return null;
  }

  // Generate initials from student_id
  const getInitials = (studentId) => {
    return studentId ? studentId.slice(-2).toUpperCase() : 'ST';
  };

  // Generate student display name
  const getStudentName = (studentId) => {
    return `Student ${studentId.slice(-4)}`;
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        🏆 {t("leaderboard.bestPerformers") || "Best Performers by Quiz Type"}
      </Typography>
      
      <Grid2 container spacing={2}>
        {bestPerQuiz.map((performer, index) => {
          const config = quizTypeConfig[performer.quiz_type] || { 
            icon: <Quiz />, 
            label: performer.quiz_type, 
            color: '#757575' 
          };
          const initials = getInitials(performer.student_id);
          const studentName = getStudentName(performer.student_id);

          return (
            <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardContent>
                  <Stack spacing={2} alignItems="center">
                    {/* Quiz Type Header */}
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box sx={{ color: config.color }}>
                        {config.icon}
                      </Box>
                      <Chip 
                        label={config.label}
                        size="small"
                        sx={{ 
                          backgroundColor: config.color,
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>

                    {/* Student Avatar */}
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: config.color,
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {initials}
                    </Avatar>

                    {/* Student Info */}
                    <Box textAlign="center">
                      <Typography variant="subtitle1" fontWeight="bold">
                        {studentName}
                      </Typography>
                      <Typography 
                        variant="h6" 
                        color="primary" 
                        fontWeight="bold"
                        sx={{ mt: 1 }}
                      >
                        {performer.total_xp} XP
                      </Typography>
                    </Box>

                    {/* Trophy Icon for top performer */}
                    {performer.total_xp > 0 && (
                      <EmojiEvents sx={{ color: '#ffd700', fontSize: '2rem' }} />
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  );
};

export default BestPerQuiz;