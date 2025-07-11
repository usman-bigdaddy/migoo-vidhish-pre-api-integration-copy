import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import CircleIcon from '@mui/icons-material/Circle';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';
import { display } from '@mui/system';
import { useThemeContext } from '../../../context/ThemeContext';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));



export default function LinearProgressComponent({title, sp, progress}) {
      const {isDarkMode} = useThemeContext()
  return (
    <Stack spacing={2} ml={3} mr={3} sx={{ flexGrow: 1, color:"#76777a", textAlign:"center" }}>
      <br />
      <Typography variant="h5" mb={0.5}>{title}</Typography>
      <Typography variant="h5" style={{color:isDarkMode? "#1cff27" :'#5d015b'}} mb={0.5}>{sp} SP</Typography>
      <Box mb={0.5}>
        {progress===100?<DoneIcon style={{color:isDarkMode? "#1cff27" :'#5d015b'}} />:<CircleIcon style={{color:"#1a90ff"}} />}
        </Box>
      <BorderLinearProgress variant="determinate" value={progress} />
    </Stack>
  );
}