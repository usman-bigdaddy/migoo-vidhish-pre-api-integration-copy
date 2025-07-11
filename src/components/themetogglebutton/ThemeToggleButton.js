import React from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <Tooltip title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 2,
          display:{sm:'none', xs:'none', md:'inline', lg:'inline'}
        }}
        color="primary"
      >
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;
