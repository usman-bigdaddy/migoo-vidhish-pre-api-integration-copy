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

// const {isDarkMode} = useThemeContext()
// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 10,
//   borderRadius: 5,
//   width:"75%",
// //   marginBottom:"10px",
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     // backgroundColor: theme.palette.grey[200],
//     backgroundColor: theme.palette.grey[200],
//     ...theme.applyStyles('dark', {
//       backgroundColor: theme.palette.grey[800],
//     }),
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 5,
//     // backgroundColor: '#1a90ff',
//     // backgroundColor: isDarkMode? "#1cff27" :'#5d015b',
//     backgroundColor: '#5d015b',
//     ...theme.applyStyles('dark', {
//       backgroundColor: theme.palette.grey[800],
//     }),
//   },
// }));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => {
  const isDarkMode = theme.palette.mode === 'dark';

  return {
    height: 10,
    borderRadius: 5,
    width: '75%',
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: isDarkMode ? theme.palette.grey[800] : theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: isDarkMode ? '#1cff27' : '#5d015b',
    },
  };
});



export default function TestScore({title, sp, progress}) {
    const {isDarkMode} = useThemeContext()
  return (
    <Stack spacing={5} m={5} sx={{ 
        flexGrow: 1, 
        // color:"#76777a", 
        // textAlign:"center", 
        boxShadow:"0px 0px 4px 0px rgba(0, 0, 0, 0.25)", 
        borderRadius:"10px",
        // height:"66px",
        width:"100%",
        }}>
    <div style={{margin:"10px"}} >
      <Typography mb={2}>{title}</Typography>
     
    <div style={{display:'flex'}}>
      <BorderLinearProgress variant="determinate" value={progress} />
      <Typography ml={2} style={{position:"relative", bottom:"5px"}}>{progress} %</Typography>
      </div>
      </div>
    </Stack>
  );
}