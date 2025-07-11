import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Login2 from '../../../views/authentication/Login';
import { Box, Card, Stack, Typography, Grid2, CardContent, Paper, CardActionArea } from '@mui/material';
import { Link } from 'react-router';
import { Logo } from 'react-mui-sidebar';
import { NavLink } from 'react-router';
import AuthRegister from "../../../views/authentication/auth/AuthRegister"
import logoicn from "../../../assets/images/logos/logo-migoo.svg"
import { textAlign } from '@mui/system';
import { styled } from '@mui/material/styles';
import basicplan from "../../../assets/images/logos/basic-plan.svg"
import DoneIcon from '@mui/icons-material/Done';
import Plans from './Plans';


export default function PlansModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const cards = [
  //   {
  //     id: 1,
  //     title: 'Plants',
  //     description: 'Plants are essential for all life.',
  //   },
  //   {
  //     id: 2,
  //     title: 'Animals',
  //     description: 'Animals are a part of nature.',
  //   }
  // ];

//   const PlanItem = ()=>{
//     return <div 
//     >
//       <Typography mb="15px" variant='h6' textAlign="center">Best Seller</Typography>
//     <Card 
//     // fullWidth={true}
//     // maxWidth="lg"
//     style={{width:"500px"}}
//     >
//       <Logo img={basicplan} style={{width:"40%"}} />
//       <Typography padding={1} variant='h5' textAlign="left">Basic</Typography>
//       <Typography padding={1} variant="h5" textAlign="left">
//   ILS 34 <Typography variant="body2" component="span">per month</Typography>
// </Typography>
// <hr color='#C0C0C1' />
// <Typography padding={1} variant='body1' textAlign="left"><DoneIcon color="primary" />7-day free trial</Typography>
// <Typography padding={1} variant='body1' textAlign="left"><DoneIcon color="primary" />Reading Comprehension Training</Typography>
// <Typography padding={1} variant='body1' textAlign="left"><DoneIcon color="primary" />Full Access to Vocabulary Builder</Typography>
// <Typography padding={1} variant='body1' textAlign="left"><DoneIcon color="primary" />Peronalised Learning Journey</Typography>
// <Typography padding={1} variant='body1' textAlign="left"><DoneIcon color="primary" />Progress Tracking</Typography>

//     </Card>
//     </div>
//   }

  const [selectedCard, setSelectedCard] = React.useState(0);

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Plans
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        //  aria-labelledby="alert-dialog-title"
        // aria-describedby="alert-dialog-description"
        // width="1000px"
        fullWidth={true}
        maxWidth="md"
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
        {/* <DialogTitle textAlign="center">Select a plan</DialogTitle> */}
        <DialogContent>
         
        <Grid2 container spacing={0} justifyContent="center">
          <Grid2
            item
            xs={12}
            sm={12}
            lg={12}
            xl={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {/* <Card sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}> */}
              <Box alignItems="center" justifyContent="center" style={{textAlign:"center"}}>
                {/* <Logo img={logoicn} component={NavLink} to="/">Flexy</Logo> */}
                <h1>Select your perfect plan</h1>
                {/* <p>Choose from our flexible subscription plans that fit your budget and learning needs</p> */}
                <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                    Choose from our flexible subscription plans that fit your budget and learning needs
              </Typography>
             
             
              </Box>
     
            {/* </Card> */}

          </Grid2>
      
        </Grid2>
        <Plans />
      
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
