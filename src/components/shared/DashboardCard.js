import React from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
}) => {
  return (
    <Box mt={2}>
      {(title || subtitle) && (
        <Stack spacing={0.5} mb={3}>
          {title && <Typography variant="h5">{title}</Typography>}
          {subtitle && (
            <Typography variant="subtitle2" color="textSecondary">
              {subtitle}
            </Typography>
          )}
        </Stack>
      )}
      <Card
        sx={{
          padding: 0,
          border: '1px solid rgba(0, 0, 0, 0.12)', // Very light grey border
        }}
        elevation={0} // Optional: Remove shadow if you only want the border
        variant={undefined}
      >
        {cardheading ? (
          <CardContent>
            <Typography variant="h5">{headtitle}</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {headsubtitle}
            </Typography>
          </CardContent>
        ) : (
          <CardContent sx={{ p: '30px' }}>
            {action && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                {action}
              </Box>
            )}
            {children}
          </CardContent>
        )}
        {middlecontent}
        {footer}
      </Card>
    </Box>
  );
};

export default DashboardCard;