import * as React from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Typography } from "@mui/material";
import { Logo } from "react-mui-sidebar";
import { NavLink } from "react-router";
import ChallengeCompleted from "../../../assets/images/general/challenge-completed.svg";
import { Grid2 } from "@mui/material";

export default function ChallengeCompletedModal() {
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      {/* <Button onClick={handleClickOpen} color="primary" variant="contained">
        {t('challengeCompleted.button')}
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>{t("challengeCompleted.title")}</DialogTitle>
        <DialogContent>
          <Grid2 container spacing={0} justifyContent="center">
            <Grid2
              item
              xs={12}
              sm={12}
              lg={4}
              xl={3}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                alignItems="center"
                textAlign="center"
                justifyContent="center"
              >
                <Logo img={ChallengeCompleted} component={NavLink} to="/" />
                <Typography variant="h2">
                  {t("challengeCompleted.heading")}
                </Typography>
                <Typography mt={2}>
                  {t("challengeCompleted.description")}
                </Typography>
              </Box>
            </Grid2>
          </Grid2>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
