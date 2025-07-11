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
// import AuthLogin from '../../../views/authentication/auth/AuthLogin';
import AuthConfirmEmail from "../../../views/authentication/auth/AuthConfirmEmail"
import logoicn from "../../../assets/images/logos/logo-migoo.svg"
import TestResults from '../testresults/TestResults';
import Chart from 'react-apexcharts';

// import PropTypes from 'prop-types';
// import { Input as BaseInput } from '@mui/base/Input';
// import { styled } from '@mui/system';

export default function AverageScore({ open, handleClose }) {
  // const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleCloseModal = () => {
  //   setOpenResultModal(false);
  // };



  const overallDonutChartOptions = {
    chart: {
      type: 'donut',
    },
    series: ["70%", "30%"], // Example data
    labels: ['Correct', 'Incorrect'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    // Colors for each slice
    colors: ['#008FFB', '#2A8EFE33'],
    legend: {
      position: 'top', // Or 'center'
      horizontalAlign: 'center',
    },
    // Customize the donut chart
    plotOptions: {
      pie: {
        donut: {
          size: '65%', // Adjust for the size of the hole
          labels: {
            show: true,  // Show the labels inside the donut
            name: {
              show: true,
              fontSize: '16px',
              color: '#333',
              offsetY: -10
            },
            value: {
              show: true,
              fontSize: '14px',
              color: '#333',
              offsetY: 16,
              formatter: (val) => {
                return val
              }
            },
             total: {
              show: true,
              label: 'Total',
              color: '#333',
              formatter: (w) => {
                const series = w.config.series.reduce((a, sum) => a + sum, 0)
                return  series
              }
            }
          }
        },
      }
    },
  };
  
  const overallDonutChartSeries = [70, 30];

  return (
    <React.Fragment>
        <br />
      <Button  variant="contained" onClick={open} sx={{mt:2, display:'none'}}>
        Get Scores
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
        {/* <DialogTitle textAlign="center">Are you sure you want to cancel?</DialogTitle> */}
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
            {/* <Card sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}> */}
              <Box alignItems="center" textAlign="center" justifyContent="center">
                {/* <Logo img={logoicn} component={NavLink} to="/">Flexy</Logo> */}
                <Typography variant='h2'>Average Score</Typography>
                <Chart options={overallDonutChartOptions} series={overallDonutChartSeries} type="donut" height={300} />

              <Button style={{marginTop:"30px"}} variant="contained" component={Link} to="/">Go to Dashboard</Button><br />
              <br />
              <Button style={{marginTop:"10px"}} variant="outlined">
                Timer <br/> 19:59
              </Button>
              <div style={{ width: '80%', margin: '15px auto', borderTop: '1px solid #d3d3d3' }} />

           

             
              {/* <TestResults 
                   testname="Listening Test"
                   openResultModal={openResultModal}
                   handleCloseModal={handleCloseModal}
                   donutChartOptions={donutChartOptions}
                   donutChartSeries={donutChartSeries}
                   correctCount={correctCount}
                   incorrectCount={incorrectCount}
                   /> */}

              </Box>

             
            {/* </Card> */}
          </Grid2>
        </Grid2>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

