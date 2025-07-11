import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const InfoButton = () => {
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const { t } = useTranslation();

  const handleInfoClick = () => {
    setInfoDialogOpen(true);
  };

  const handleInfoClose = () => {
    setInfoDialogOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleInfoClick} aria-label="Information">
        <InfoIcon />
      </IconButton>

      <Dialog open={infoDialogOpen} onClose={handleInfoClose}>
        <DialogTitle align="center">{t('infoButton.dialogTitle')}</DialogTitle>
        <DialogContent dividers>
          <Typography paragraph>{t('infoButton.intro1')}</Typography>
          <Typography paragraph>{t('infoButton.intro2')}</Typography>

          <Typography variant="h6" gutterBottom>{t('infoButton.howToPractice')}</Typography>
          <Typography paragraph>{t('infoButton.practiceIntro')}</Typography>

          <List dense>
            {t('infoButton.sections', { returnObjects: true }).map((item, index) => (
              <ListItem key={index} disableGutters>
                <ListItemText primary={`• ${item}`} />
              </ListItem>
            ))}
          </List>

          <Typography paragraph>{t('infoButton.menuHint')}</Typography>

          <Typography variant="h6" gutterBottom>{t('infoButton.vocabulary')}</Typography>
          <Typography paragraph>{t('infoButton.vocabExplain1')}</Typography>
          <Typography paragraph>{t('infoButton.vocabExplain2')}</Typography>

          <Typography variant="h6" gutterBottom>{t('infoButton.trackProgress')}</Typography>
          <Typography paragraph>{t('infoButton.progressHint')}</Typography>

          <Typography variant="h6" gutterBottom>{t('infoButton.callToAction')}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InfoButton;
