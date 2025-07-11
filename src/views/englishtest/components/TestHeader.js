// components/TestHeader.js
import React from 'react';
import { Typography } from '@mui/material';

const TestHeader = ({ title, subtitle }) => {
  return (
    <div>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="h6" mt={2}>
        {subtitle}
      </Typography>
    </div>
  );
};

export default TestHeader;
