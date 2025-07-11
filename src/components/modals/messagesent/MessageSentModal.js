import React from 'react';
import { Dialog, DialogContent, Card, Typography, Box, Button } from '@mui/material';
import {Grid2} from '@mui/material'; // correct import
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function MessageSentModal({ open, onClose }) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            onClose(); // optional
          },
        },
      }}
    >
      <DialogContent>
        <Grid2 container justifyContent="center">
          <Grid2
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card sx={{ p: 4, width: '100%', maxWidth: 500 }}>
              <Box textAlign="center">
                <Typography variant="h2">
                  {t('contact.messageSent.title')}
                </Typography>

                <Typography mt={2}>
                  {t('contact.messageSent.body')}
                </Typography>

                <NavLink to="/">
                  <Button sx={{ mt: 4 }} variant="contained" onClick={onClose}>
                    {t('contact.messageSent.goHome')}
                  </Button>
                </NavLink>
              </Box>
            </Card>
          </Grid2>
        </Grid2>
      </DialogContent>
    </Dialog>
  );
}
