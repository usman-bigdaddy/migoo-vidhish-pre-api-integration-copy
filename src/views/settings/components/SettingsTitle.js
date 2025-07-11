import React from 'react'
import { Typography } from '@mui/material'

const SettingsTitle = ({title, subtitle}) => {
  return (
    <>
    <div style={{marginTop:"50px"}}>
    <div>
        <Typography variant='h4'>{title}</Typography>
        <Typography variant='h6' mt={2}>{subtitle}</Typography>
      </div>
    <hr style={{border:'1px solid #DEDEDF'}} />
    </div>
    </>
  )
}

export default SettingsTitle