import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  IconDashboard,
  IconSettings,
} from "@tabler/icons-react";

import ProfileImg from "src/assets/images/profile/user-3.jpg";
import { logout } from "../../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const {t} = useTranslation()
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();

      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem>
          <Link to="/dashboard">
            <Box display="flex" alignItems="center">
              <ListItemIcon>
                <IconDashboard width={20} />
              </ListItemIcon>
              <ListItemText><Typography variant='subtitle1' color='textPrimary'>{t("profileDropdown.myDashboard")}</Typography></ListItemText>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/settings">
            <Box display="flex" alignItems="center">
              <ListItemIcon>
                <IconSettings width={20} />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="subtitle1" color="textPrimary">
                  Settings
                </Typography>
              </ListItemText>
            </Box>
          </Link>
        </MenuItem>
        
        <Box mt={1} py={1} px={2}>
          <Button 
          onClick={handleLogout}
          to="/auth/login" 
          variant="outlined" color="primary" component={Link} fullWidth>
            {t("profileDropdown.logout")}
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
