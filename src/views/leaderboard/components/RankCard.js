import React from 'react';
import { Typography, Card, Grid, Avatar } from '@mui/material';
import { useTranslation } from 'react-i18next';

const RankCard = ({ points, rank, name, profilePicture, initials }) => {
  const { t } = useTranslation();

  return (
    <Card square={false} sx={{ boxShadow: '0px 0px 4px 0px', my: 2, p: 2 }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={2} sm={1} md={1}>
          <Typography variant="h6" textAlign="center">
            {rank}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={8} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            alt={name} 
            src={profilePicture} 
            sx={{ 
              width: 56, 
              height: 56, 
              mr: 1,
              bgcolor: profilePicture ? 'transparent' : `#${Math.floor(Math.random()*16777215).toString(16)}`
            }}
          >
            {!profilePicture && initials}
          </Avatar>
          <Typography variant="subtitle1" fontWeight="bold">
            {name || "Anonymous"}
          </Typography>
        </Grid>
        <Grid item xs={4} sm={3} md={3}>
          <Typography variant="subtitle1" color="#157df8" textAlign="right">
            {points || 0} {t("topRank.studentPoints")}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RankCard;