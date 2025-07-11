import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Stack, Typography } from '@mui/material';
import {Grid2} from '@mui/material';
import { Logo } from 'react-mui-sidebar';
import { NavLink } from 'react-router';
import WeeklyChallengeModal from '../../../views/leaderboard/components/WeeklyChallengeModal';
import weeklychallengeimg from "../../../assets/images/general/weekly-challenge.svg";

export default function WeeklyChallenge() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        {t('weeklyChallengeModal.button')}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              console.log(formJson.email);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle textAlign="left">{t('weeklyChallengeModal.title')}</DialogTitle>
        <DialogContent>
          <Grid2 container spacing={0} justifyContent="center">
            <Grid2 item xs={12} sm={12} lg={4} xl={3}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo img={weeklychallengeimg} component={NavLink} to="/">Flexy</Logo>
              </Box>

              <WeeklyChallengeModal
                subtext={
                  <Box component="section" sx={{ p: 2, border: '1px grey', borderRadius: "10px", boxShadow: "0px 0px 4px 0px", mt: 3, mb: 3 }}>
                    <Typography variant="h5" textAlign="center" color="textSecondary" mb={1}>
                      {t('weeklyChallengeModal.description')}
                    </Typography>
                  </Box>
                }
                subtitle={
                  <Stack direction="row" spacing={1} justifyContent="center" mt={3} mb={3}>
                    <Typography color="textSecondary" variant="h6" fontWeight="500" textAlign="center">
                      {t('weeklyChallengeModal.subtitle')}
                    </Typography>
                  </Stack>
                }
              />
            </Grid2>
          </Grid2>
        </DialogContent>
      </Dialog>
    </>
  );
}
