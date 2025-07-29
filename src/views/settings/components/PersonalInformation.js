import React, { useState } from "react";
import api from "../../../redux/api/axiosInstance";
import {
  Stack,
  Box,
  IconButton,
  InputAdornment,
  Button,
  Typography,
  Avatar,
  styled,
} from "@mui/material";
import {
  LockOutlined,
  MailOutline,
  Visibility,
  VisibilityOff,
  PersonOutline,
  PhotoCamera,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";
import UserAvatar from "../../../assets/images/profile/user-3.jpg";

import { useDispatch, useSelector } from "react-redux";

const FileInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const PersonalInformation = ({ onFormChange, profile }) => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicture2, setProfilePicture2] = useState(null);
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    email: profile?.email || "",
  });

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProfilePicture(reader.result);
    reader.readAsDataURL(file);
    setProfilePicture2(file);
  };

  const handleClick = async () => {
    if (!profilePicture2) return;

    const formData = new FormData();
    formData.append("avatar", profilePicture2);
    try {
      const response = await api.post("/api/student/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        alert("Profile picture updated successfully.");
      } else {
        alert("Failed to update profile picture.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const field = id === "name" ? "first_name" : id;
    const updatedFormData = {
      ...formData,
      [field]: value,
    };
    setFormData(updatedFormData);
    onFormChange(updatedFormData);
  };

  return (
    <Stack maxWidth={500} width="100%" spacing={2}>
      <Box>
        <Typography fontWeight={600} component="label" htmlFor="name" mb={0.5}>
          First Name
        </Typography>
        <CustomTextField
          size="small"
          id="name"
          placeholder="Enter First Name"
          // placeholder={t("settings.personalInformation.namePlaceholder")}
          variant="outlined"
          fullWidth
          value={formData.first_name}
          onChange={handleInputChange}
          sx={{
            "& .MuiInputBase-input::placeholder": {
              color: "grey",
              opacity: 1,
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutline />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Box>
        <Typography
          fontWeight={600}
          component="label"
          htmlFor="last_name"
          mb={0.5}
        >
          Last Name
        </Typography>
        <CustomTextField
          size="small"
          id="last_name"
          placeholder="Enter Last Name"
          // placeholder={t("settings.personalInformation.lastNamePlaceholder")}
          variant="outlined"
          fullWidth
          value={formData.last_name}
          onChange={handleInputChange}
          sx={{
            "& .MuiInputBase-input::placeholder": {
              color: "grey",
              opacity: 1,
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutline />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Box>
        <Typography fontWeight={600} component="label" htmlFor="email" mb={0.5}>
          {t("settings.personalInformation.email")}
        </Typography>
        <CustomTextField
          size="small"
          id="email"
          placeholder="Enter Email"
          // placeholder={t("settings.personalInformation.emailPlaceholder")}
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleInputChange}
          sx={{
            "& .MuiInputBase-input::placeholder": {
              color: "grey",
              opacity: 1,
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutline />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Button variant="contained" size="small" style={{ margin: "20px 0px" }}>
        {t("settings.savePreferences.button")}
      </Button>

      {/* ------ Password ------ */}
      <Box>
        <Typography
          fontWeight={600}
          component="label"
          htmlFor="password"
          mb={0.5}
        >
          {t("settings.personalInformation.password")}
        </Typography>
        <CustomTextField
          size="small"
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="********"
          variant="outlined"
          fullWidth
          disabled
          sx={{
            "& .MuiInputBase-input::placeholder": {
              color: "grey",
              opacity: 1,
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Box mt={2}>
        <Button component={Link} to="/auth/reset-password" variant="contained">
          {t("settings.personalInformation.changePassword")}
        </Button>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        {profile && (
          <Avatar
            alt="Profile"
            src={profilePicture || profile.avatar_url || UserAvatar}
            sx={{ width: 56, height: 56, mr: 1 }}
          />
        )}
        <label htmlFor="profile-picture-input">
          <FileInput
            accept="image/*"
            id="profile-picture-input"
            type="file"
            onChange={handleProfilePictureChange}
          />
          <IconButton component="span" color="primary" size="small">
            <PhotoCamera fontSize="small" />
          </IconButton>
          <button
            type="button"
            onClick={handleClick}
            className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Change Picture
          </button>
        </label>
      </Box>
    </Stack>
  );
};

export default PersonalInformation;
