import React from 'react';
import Box from '@mui/material/Box';
import { Grid2, Card, Typography, Avatar } from '@mui/material';
import goldMedal from "../../../assets/images/general/gold-medal.svg";
import silverMedal from "../../../assets/images/general/silver-medal.svg";
import bronzeMedal from "../../../assets/images/general/bronze-medal.svg";
import "./style.css";
import { useThemeContext } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const TopThree = ({ topThree }) => {
  const { isDarkMode } = useThemeContext();
  const { t } = useTranslation();

  const medals = [goldMedal, silverMedal, bronzeMedal];

  return (
    <Box sx={{ flexGrow: 1, margin: "30px 0px" }}>
      <Grid2 container justifyContent="space-between" m={5} spacing={10} columns={{ xs: 4, sm: 8, md: 12 }}>
        {[0, 1, 2].map((index) => {
          const student = topThree[index] || {};
          const initials = student.initials || `#${index+1}`;
          
          return (
            <Grid2 key={index} size={{ xs: 12, sm: 12, md: 4 }}>
              <Card
                square={false}
                style={{ boxShadow: "0px 0px 4px 0px", maxWidth: "300px", justifyContent: 'center', alignItems: 'center' }}
              >
                <img
                  src={medals[index]}
                  style={{ width: "70px", marginLeft: "10px" }}
                  alt={`Medal ${index + 1}`}
                />
                <Avatar
                  src={student.profilePicture}
                  sx={{ 
                    borderRadius: "999px", 
                    width: "100px", 
                    height: "100px",
                    display: "flex", 
                    justifyContent: "center", 
                    margin: "-40px auto 20px auto",
                    fontSize: "36px",
                    bgcolor: student.profilePicture ? 'transparent' : `#${Math.floor(Math.random()*16777215).toString(16)}`
                  }}
                >
                  {!student.profilePicture && initials}
                </Avatar>
                <Typography variant='h5' textAlign="center">
                  {student?.name || `User ${index + 1}`}
                </Typography>
                <div style={{ color: isDarkMode ? "#1cff27" : '#5d015b', margin: "30px 0px" }}>
                  <Typography variant='h5' textAlign="center">
                    {student?.xp_points || 0}
                  </Typography>
                  <Typography variant='h5' textAlign="center">{t("topRank.studentPoints")}</Typography>
                </div>
              </Card>
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  );
};

export default TopThree;