import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  useTheme,
} from '@mui/material';

const PrivacyPolicy = ({ onAccept }) => {
  const theme = useTheme();

  return (
    <Box
      maxWidth="800px"
      margin="auto"
      display="flex"
      flexDirection="column"
      gap={3}
    >
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>

      <Paper
        elevation={3}
        sx={{
          padding: 3,
          maxHeight: 400,
          overflowY: 'auto',
          backgroundColor:
            theme.palette.mode === 'dark' ? '#121212' : '#fafafa',
          border: '1px solid',
          borderColor: theme.palette.divider,
        }}
      >
        <Typography variant="body1" paragraph>
          This Privacy Policy describes how we collect, use, and protect your
          information when you use Migoo.
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We may collect basic information such as your name, email address, and test
          responses. We also collect anonymous usage data to help us improve the App.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use the collected data to:
        </Typography>
        <ul>
          <li>
            <Typography variant="body2">Provide and improve our services</Typography>
          </li>
          <li>
            <Typography variant="body2">Analyze test performance for educational insights</Typography>
          </li>
          <li>
            <Typography variant="body2">Ensure platform integrity and security</Typography>
          </li>
        </ul>

        <Typography variant="h6" gutterBottom>
          3. Data Sharing
        </Typography>
        <Typography variant="body1" paragraph>
          We do not sell, trade, or share your personal information with third parties.
          Data may be shared only with trusted service providers under confidentiality
          agreements, if necessary to operate or improve the App.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Data Retention
        </Typography>
        <Typography variant="body1" paragraph>
          We retain data for as long as necessary to fulfill the purposes outlined in
          this policy unless a longer retention period is required or permitted by law.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Your Rights
        </Typography>
        <Typography variant="body1" paragraph>
          You have the right to access, correct, or delete your personal data. You can
          request these changes by contacting us directly.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Changes to This Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to update this Privacy Policy at any time. Changes will
          be posted on this page with an updated revision date. Continued use of the App
          after changes indicates acceptance of the updated policy.
        </Typography>

        <Typography variant="body1" paragraph>
          If you have any questions or concerns about this Privacy Policy, please
          contact us at support@example.com.
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

export default PrivacyPolicy;
