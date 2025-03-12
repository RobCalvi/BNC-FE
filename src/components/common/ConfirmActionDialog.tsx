import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogActionWithFeedback from './DialogActionWithFeedback';

type ConfirmActionDialogProps = {
    open: boolean;
    loading: boolean;
    error: string | null;
    title?: string;
    caption?: string;
    acceptLabel?: string;
    cancelLabel?: string;
    handleClose: () => void;
    handleConfirm: () => void;
}

const ConfirmActionDialog: React.FC<ConfirmActionDialogProps> = ({
    open, loading, error, handleClose, handleConfirm, acceptLabel = "Confirm", cancelLabel = "Cancel", title = "Confirm Action", caption = "Are you sure you want to proceed?"
}) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography variant="body1">{caption}</Typography>
            </DialogContent>
            <DialogActionWithFeedback loading={loading} error={error} acceptLabel={acceptLabel} rejectLabel={cancelLabel} handleAdd={handleConfirm} handleCancel={handleClose} />
        </Dialog>
    )
}

export default ConfirmActionDialog