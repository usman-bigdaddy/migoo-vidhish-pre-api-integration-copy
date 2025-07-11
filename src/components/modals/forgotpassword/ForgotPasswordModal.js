import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Login2 from '../../../views/authentication/Login';
import { Box, Card, Stack, Typography, Grid2 } from '@mui/material';
import { Link } from 'react-router';
import { Logo } from 'react-mui-sidebar';
import { NavLink } from 'react-router';
import {FormGroup, FormControlLabel, Checkbox} from '@mui/material';
// import AuthLogin from '../../../views/authentication/auth/AuthLogin';
import AuthForgotPassword from "../../../views/authentication/auth/AuthForgotPassword"
import logoicn from "../../../assets/images/logos/logo-migoo.svg"

export default function ForgotPasswordModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Forgot Password
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
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle textAlign="center">Forgot Password?</DialogTitle>
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
            <Card sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              {/* <Box display="flex" alignItems="center" justifyContent="center">
                <Logo img={logoicn} component={NavLink} to="/">Flexy</Logo>
              </Box> */}
              <AuthForgotPassword
                subtext={
                  <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                    Enter your email. We will email intructions on how to reset your password.
                  </Typography>
                }
                subtitle={
                //   <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                //     <Typography color="textSecondary" variant="h6" fontWeight="500">
                //       Back to 
                //     </Typography>
                //     <Typography
                //       component={Link}
                //       to="/auth/login"
                //       fontWeight="500"
                //       sx={{
                //         textDecoration: 'none',
                //         color: 'primary.main',
                //       }}
                //     >
                //       Login
                //     </Typography>
                //   </Stack>
                <Stack 
                            direction="row" alignItems="center" my={2}>
                                {/* <FormGroup> */}
                                    <Typography
                                        // control={<Checkbox defaultChecked />}
                                            label={
                                                <>
                                                  Back to{" "}
                                                  <Link href="/auth/login" style={{ color: "#007bff", textDecoration: "none" }}>
                                                   Login
                                                  </Link>.{" "}
                                                </>
                                              }
                                    />
                                {/* </FormGroup> */}
                               
                            </Stack>
                }
              />
            </Card>
          </Grid2>
        </Grid2>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
