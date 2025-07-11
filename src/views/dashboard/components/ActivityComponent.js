import { Box, Typography } from '@mui/material'
import React from 'react'

const ActivityComponent = ({image, title, count}) => {
  return (
    <Box display={"flex"}>
        <Box mr={1}>
            <img src={image} style={{margin:"auto"}} alt="image" />
        </Box>
        <Box style={{margin:"auto"}}>
            <Typography>{title}</Typography>
            <Typography variant="h6">{count}</Typography>
        </Box>
    </Box>
  )
}

export default ActivityComponent