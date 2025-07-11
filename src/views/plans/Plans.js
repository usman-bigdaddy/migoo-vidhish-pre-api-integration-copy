import React from 'react'
import PlansModal from '../../components/modals/plans/PlansModal'
import PlansCards from '../../components/modals/plans/Plans'
import { Grid2, Box, Typography } from '@mui/material'


const Plans = () => {
  return (
    <>
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
  <PlansCards />
  </>

  )
}

export default Plans