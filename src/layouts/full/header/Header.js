import React, { useState } from 'react';
import {
  Box, AppBar, Toolbar, styled, Stack, IconButton, Button,
  Menu, MenuItem, Typography, Dialog, DialogContent, DialogTitle, Select,
  FormControl, InputLabel
} from '@mui/material';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Logo } from 'react-mui-sidebar';
import logoicn from "../../../assets/images/logos/logo-only2.svg";
import InfoIcon from '@mui/icons-material/Info';
import Profile from './Profile';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import ThemeToggleButton from '../../../components/themetogglebutton/ThemeToggleButton';
import UpgradeButton from '../../../components/upgradebutton/UpgradeButton';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../../../context/ThemeContext';
import InfoButton from '../../../components/infobutton/InfoButton';

const Header = (props) => {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme, isRtl, toggleDirection } = useThemeContext();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  const [infoDialogOpen, setInfoDialogOpen] = useState(false);

  const handleInfoClick = () => setInfoDialogOpen(true);
  const handleInfoClose = () => setInfoDialogOpen(false);

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    i18n.changeLanguage(lang);
    document.body.dir = lang === 'he' ? 'rtl' : 'ltr';
    toggleDirection(lang === 'he');
  };

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>

        {/* Sidebar toggle */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{ display: { lg: "none", xs: "inline" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo for mobile */}
        <Box sx={{ margin: "0 -24px", display: { lg: "none", xs: "inline" } }}>
          <Logo
            img={logoicn}
            component={NavLink}
            to="/dashboard"
            sx={{ width: "60px !important" }}
            color="inherit"
            aria-label="menu"
            onClick={props.toggleMobileSidebar}
          >
            Flexy
          </Logo>
        </Box>

        <Box flexGrow={1} />

        <Stack spacing={1} direction="row" alignItems="center">
          <InfoButton />

          {/* Language Switcher with Globe Icon */}
          {/* <FormControl variant="standard" sx={{display:{sm:"none", xs:"none", lg:'inline' }}}>
            <Select
              value={i18n.language}
              onChange={handleLanguageChange}
              disableUnderline
              displayEmpty
              inputProps={{
                IconComponent: () => <LanguageIcon fontSize="small" />,
              }}
              sx={{
                fontSize: 13,
                '.MuiSelect-select': { padding: '4px 28px 4px 8px' },
                '.MuiSvgIcon-root': { right: 0 },
              }}
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="he">HE</MenuItem>
            </Select>
          </FormControl> */}

          {/* Theme Toggle */}
          {/* <ThemeToggleButton isDarkMode={isDarkMode} setIsDarkMode={toggleTheme} /> */}

          {/* Upgrade + Profile */}
          <UpgradeButton />
          <Profile />

        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
