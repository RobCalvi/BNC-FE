import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Action from '../../../models/actions/action';
import { postCompanyAction } from '../../../api/action';
import { useParams } from 'react-router-dom';
import useStatus from '../../../hooks/useStatus';
import DialogActionWithFeedback from '../../common/DialogActionWithFeedback';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import SelectWithOptions from '../../common/SelectWithOptions';
import { operationTypeList } from '../../../models/shared/OperationType';
import { DatePicker } from '@mui/x-date-pickers';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import dayjs from 'dayjs';
import DialogBase from '../../common/DialogBase';
import Box from '@mui/material/Box';

type CompanyAddActionDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleSubmit: (actions: Action[]) => void;
}

const CompanyAddActionDialog: React.FC<CompanyAddActionDialogProps> = ({ open, handleClose, handleSubmit }) => {
    const { id } = useParams()
    const { status, setLoading, setSuccess, setError } = useStatus()
    const [addReminder, setAddReminder] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            operationType: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().trim().required('Title is required'),
            description: Yup.string().trim().required('Description is required'),
            operationType: Yup.string().trim().required('Action Type is required.')
        }),
        onSubmit: async ({ title, description, operationType }) => {
            try {
                setLoading(true)
                setSuccess(false)
                setError('')
                const reminder = selectedDate && addReminder ? dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss') : undefined
                const res = await postCompanyAction(id!, { title, description, operation: operationType, reminder })
                handleSubmit(res)
                setSuccess(true)
                setError('')
                formik.resetForm()
                return handleClose()
            } catch (err: any) {
                setError('Could not add action.')
            } finally {
                setLoading(false)
            }
        }
    })

    return (
        <DialogBase
            title="Add Action"
            open={open}
            handleClose={handleClose}
            contentSx={{ maxWidth: 500 }}
            actions={
                <DialogActionWithFeedback
                    loading={status.loading}
                    error={status.error}
                    acceptLabel='Save'
                    rejectLabel='Cancel'
                    handleAdd={formik.handleSubmit}
                    handleCancel={handleClose}
                />
            }>
            <TextField
                name="title"
                id="title"
                margin="dense"
                label="Title"
                type="text"
                fullWidth
                variant="outlined"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
            />
            <SelectWithOptions
                groupSx={{ width: '100%' }}
                options={operationTypeList}
                value={formik.values.operationType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="operationType"
                name="operationType"
                label="Action Type"
                labelId='action-type'
                error={formik.touched.operationType && Boolean(formik.errors.operationType)}
                errorText={formik.touched.operationType && formik.errors.operationType ? formik.errors.operationType : undefined}
            />
            <TextField
                margin="dense"
                name="description"
                id="description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
            />
            <Box component="div" sx={{ paddingTop: 1 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={addReminder}
                            onChange={(event) => setAddReminder(event.target.checked)}
                        />
                    }
                    label="Set a reminder"
                    sx={{ marginTop: 1 }}
                />
                {addReminder && (
                    <DatePicker
                        label="Select Date"
                        value={selectedDate}
                        onChange={(newDate) => setSelectedDate(newDate)}
                    />
                )}
            </Box>
        </DialogBase>
    )
}

export default CompanyAddActionDialog