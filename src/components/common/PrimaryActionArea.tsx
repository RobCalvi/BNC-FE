import React from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/material/styles';

type PrimaryActionAreaProps = {
    children: React.ReactNode;
    outerBoxSx?: SxProps;
    innerBoxSx?: SxProps;
    [x: string]: any;
}

const PrimaryActionArea:React.FC<PrimaryActionAreaProps> = ({ children, outerBoxSx, innerBoxSx, ...rest }) => {
  return (
    <Box component="div" display="flex" flexDirection="column" sx={outerBoxSx}>
            <Box component="div" display="flex" justifyContent="flex-end" sx={innerBoxSx}>
                <Fab { ...rest }>
                    <AddIcon />
                </Fab>
            </Box>
            { children }
        </Box>
  )
}

export default PrimaryActionArea