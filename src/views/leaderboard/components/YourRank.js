import React from 'react'
import { Typography } from '@mui/material'

const YourRank = ({text}) => {
  return (
    <>
    <div style={{marginTop:"50px"}}>
    <div>
        <Typography variant='h4'>{text}</Typography>
      </div>
    <hr style={{border:'1px solid #DEDEDF'}} />
    </div>
    </>
  )
}

export default YourRank