import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import DialogBase from '../common/DialogBase';
import DialogActionWithFeedback from '../common/DialogActionWithFeedback';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../state/redux/hooks';
import { CloudUpload } from '@mui/icons-material';
import { postImportCompaniesEffect } from '../../state/redux/effects/dashboardEffect';

type CompanyDataUploadModalProps = {
    open: boolean;
    handleClose: () => void;
}

const CompanyDataUploadModal: React.FC<CompanyDataUploadModalProps> = ({ open, handleClose }) => {
    const [file, setFile] = useState<File | null>(null);
    const loading = useAppSelector(state => state.dashboard.importLoading)
    const success = useAppSelector(state => state.dashboard.importSuccess)
    const error = useAppSelector(state => state.dashboard.importError)
    const dispatch = useAppDispatch()

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file)
        dispatch(postImportCompaniesEffect(formData))
    };

    return (
        <DialogBase
            title="Import Companies"
            maxWidth="sm"
            fullWidth
            open={open}
            handleClose={loading ? () => {} : handleClose}
            actions={(
                <DialogActionWithFeedback
                    handleAdd={handleUpload}
                    handleCancel={handleClose}
                    acceptLabel='Import'
                    rejectLabel='Cancel'
                    loading={loading}
                    error={error}
                    confirmDisabled={success}
                />
            )}>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
            >
                Select File
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{
                        margin: '16px 0', clip: 'rect(0 0 0 0)',
                        clipPath: 'inset(50%)',
                        height: 1,
                        overflow: 'hidden',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        whiteSpace: 'nowrap',
                        width: 1,
                    }}
                    disabled={loading || success}
                />
            </Button>
            { loading && <Typography sx={{marginTop: 1, color: "info.main"}}>Please wait. This may take a minute or two.</Typography> }
            { file && <Typography sx={{paddingTop: 1}} color="info.main">File: {file.name}</Typography>}
            {success && (
                <Typography sx={{paddingTop: 1}} color="success.main">Upload successful!</Typography>
            )}
            {error && (
                <Typography sx={{paddingTop: 1}} color="error.main">Upload failed. Please try again.</Typography>
            )}
        </DialogBase>
    )
}

export default CompanyDataUploadModal