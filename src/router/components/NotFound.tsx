import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const NotFound:React.FC = () => {
  return (
    <Box component="div" sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <Typography>Could not locate this page.</Typography>
    </Box>
  )
}

export default NotFound