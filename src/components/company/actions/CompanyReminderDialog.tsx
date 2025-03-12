import React, { useState } from 'react'
import DialogActionWithFeedback from '../../common/DialogActionWithFeedback'
import DialogBase from '../../common/DialogBase'
import useStatus from '../../../hooks/useStatus'
import { postCompanyActionReminder } from '../../../api/action'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs';

type CompanyReminderDialogProps = {
    open: boolean;
    handleClose: () => void;
    companyId: string;
    actionId: string;
}

const CompanyReminderDialog: React.FC<CompanyReminderDialogProps> = ({ open, handleClose, companyId, actionId }) => {
    const { status: { loading, error }, setLoading, setSuccess, setError } = useStatus();
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const handleSubmit = async () => {
        if (!selectedDate) return;
        setLoading(true)
        setSuccess(false)
        setError('')
        await postCompanyActionReminder(companyId, actionId, dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss'))
            .then(_ => {
                setSuccess(true)
                handleClose();
            })
            .catch((_: any) => {
                setError("Could not add reminder.")
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <DialogBase
            title="Add Reminder"
            open={open}
            handleClose={handleClose}
            actions={
                <DialogActionWithFeedback
                    loading={loading}
                    error={error}
                    acceptLabel="Confirm"
                    rejectLabel="Cancel"
                    handleAdd={handleSubmit}
                    handleCancel={handleClose}
                />
            }>
            <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
            />
        </DialogBase>
    )
}

export default CompanyReminderDialog