import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router'
import useTheme from '@mui/material/styles/useTheme'
import Box from '@mui/material/Box'

// const sx = {'&:hover': { cursor: 'pointer'}}

const NavigationBar:React.FC = () => {
    const navigate = useNavigate()
    const theme = useTheme()
  return (
    <AppBar position='static' component="nav" sx={{background: 'white', borderBottom: theme.palette.primary.main}}>
        <Toolbar sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Box component="div" sx={{display: 'flex', flexDirection: 'row',}}>
            <Box component="div">
                <img src="/logo-cp-groupe-bernard-M.svg" alt="logo.svg" />
            </Box>
            <Box component="div" sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', color: theme.palette.primary.main}}>
                <Typography onClick={() => navigate("/")} variant='h6' sx={{fontWeight: 'bold', '&:hover': { cursor: 'pointer'}}}>&nbsp;CRM</Typography>
                <Box component={"div"} sx={{alignItems: 'flex-end', color: "#444444"}}>
                {/* <Typography variant="caption" onClick={() => window.location.href = "https://anim8.tech"} sx={sx}>&nbsp;Powered by Anim8</Typography> */}
                </Box>
            </Box>
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default NavigationBar