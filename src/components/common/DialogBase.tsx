import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { SxProps } from '@mui/material/styles';

type DialogBaseProps = {
    title: string;
    open: boolean;
    handleClose: () => void;
    children: React.ReactNode;
    actions?: React.ReactNode;
    contentSx?: SxProps;
    [x: string]: any;
}

const DialogBase:React.FC<DialogBaseProps> = ({ title, open, handleClose, children, contentSx, actions = null, ...rest }) => {
  return (
    <Dialog open={open} onClose={handleClose} { ...rest }>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={contentSx}>
            { children }
        </DialogContent>
        { actions }
    </Dialog>
  )
}

export default DialogBase