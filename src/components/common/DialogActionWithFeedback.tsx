import React from 'react'
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { SxProps } from '@mui/material/styles';

interface ActionFooterProps {
    loading: boolean;
    error?: string | null;
    acceptLabel: string;
    rejectLabel: string;
    handleAdd: () => void;
    handleCancel: () => void;
    dialogActionsSx?: SxProps;
    boxSx?: SxProps;
    confirmDisabled?: boolean;
    loadingMessage?: React.ReactNode;
  }
  
  const DialogActionWithFeedback: React.FC<ActionFooterProps> = ({
    loading,
    error,
    acceptLabel,
    rejectLabel,
    handleAdd,
    handleCancel,
    dialogActionsSx,
    boxSx,
    confirmDisabled,
    loadingMessage = null
  }) => {
    return (
      <>
        <DialogActions sx={{ paddingX: 3, paddingBottom: 2, ...dialogActionsSx }}>
          { loadingMessage }
          {
            loading ? <CircularProgress /> : (
              <>
                <Button onClick={handleAdd} variant="contained" color="info" disabled={confirmDisabled}>
                  {acceptLabel}
                </Button>
                <Button onClick={handleCancel} variant="contained" color="primary">
                  {rejectLabel}
                </Button>
              </>
            )
          }
        </DialogActions>
        <Box component="div" sx={{ padding: error ? 3 : 0, ...boxSx }}>
          {
            error && <Alert severity='error'>{error}</Alert>
          }
        </Box>
      </>
    );
  };

export default DialogActionWithFeedback