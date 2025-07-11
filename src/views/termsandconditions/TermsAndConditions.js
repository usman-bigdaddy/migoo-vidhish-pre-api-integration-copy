import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  useTheme
} from '@mui/material';

const TermsAndConditions = ({ onAccept }) => {
  const theme = useTheme();

  return (
    <Box
      maxWidth="800px"
      margin="auto"
    //   padding={4}
      display="flex"
      flexDirection="column"
      gap={3}
    >
      <Typography variant="h4" gutterBottom>
        Terms and Conditions
      </Typography>

      <Paper
        elevation={3}
        sx={{
          padding: 3,
          maxHeight: 400,
          overflowY: 'auto',
          backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#fafafa',
          border: '1px solid',
          borderColor: theme.palette.divider,
        }}
      >
        <Typography variant="body1" paragraph>
          Welcome to Migoo, our English Test App. By accessing and using this application, you agree to be bound by the following terms and conditions:
        </Typography>

        <Typography variant="body1" paragraph>
          1. You agree to use this platform for educational purposes only. Misuse, cheating, or unauthorized access will result in disqualification.
        </Typography>

        <Typography variant="body1" paragraph>
          2. Your test data may be stored anonymously for analytics and performance improvements.
        </Typography>

        <Typography variant="body1" paragraph>
          3. We do not share your personal information with third parties.
        </Typography>

        <Typography variant="body1" paragraph>
          4. The results provided are indicative and should not be used as a sole metric for proficiency.
        </Typography>

        <Typography variant="body1" paragraph>
          5. We reserve the right to update these terms at any time. Continued use of the application implies agreement with updated terms.
        </Typography>

        <Typography variant="body1" paragraph>
          Please read the terms carefully before proceeding.
        </Typography>
      </Paper>

      <Divider />

      {onAccept && (
        <Button
          variant="contained"
          color="primary"
          onClick={onAccept}
          sx={{ alignSelf: 'flex-end' }}
        >
          I Accept
        </Button>
      )}
    </Box>
  );
};

export default TermsAndConditions;
