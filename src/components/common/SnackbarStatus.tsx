import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


interface SnackbarStatusProps {
    error: string | null;
    success: boolean | null;
    loading: boolean | null;
    handleCloseSnackbar: () => void;
}

const SnackbarStatus: React.FC<SnackbarStatusProps> = ({ error, success, loading, handleCloseSnackbar }) => {
    const severity = success || (!loading && !error && !success) ? 'success' : 'error';
    const message = error || (success ? 'Changes saved.' : '');

    return (
        <Snackbar
            open={Boolean(!!error || success)}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
                onClose={handleCloseSnackbar}
                severity={severity}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarStatus;
