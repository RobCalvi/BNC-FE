import React from 'react';
import Typography from '@mui/material/Typography';
import { Reminder, ReminderState } from '../../models/reminder/reminder';
import useTheme from '@mui/material/styles/useTheme';
import { CheckCircle } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { capitalizeAndFormatWord } from '../../utils/string';
import { completeCompanyActionReminder } from '../../api/action';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import useStatus from '../../hooks/useStatus';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppDispatch } from '../../state/redux/hooks';
import { removeReminder } from '../../state/redux/features/dashboardSlice';

type CompanyDashboardReminderTileProps = {
    reminder: Reminder;
}

const CompanyDashboardReminderTile: React.FC<CompanyDashboardReminderTileProps> = ({ reminder }) => {
    const theme = useTheme();
    const { status: { error }, setError } = useStatus();
    const dispatch = useAppDispatch();

    const handleCompleteReminder = async () => {
        console.log(reminder);
        try {
            const res = await completeCompanyActionReminder(reminder.id);
            // If res is a boolean:
            if (res) {
                dispatch(removeReminder(reminder.id));
            }
        } catch (err) {
            setError("Could not complete reminder.");
        }
    };

    return (
        <Box
            component="div"
            sx={{
                background: reminder.state === ReminderState.PAST
                    ? theme.palette.primary.light
                    : theme.palette.success.light,
                mb: 2,
                p: 1,
                borderRadius: 2
            }}
        >
            <Box
                component="div"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                flexWrap="wrap"
            >
                <Typography variant="body1">
                    {reminder.companyName}
                </Typography>
                <Tooltip title="Complete Reminder">
                    <IconButton
                        onClick={handleCompleteReminder}
                        disabled={reminder.isCompleted}
                    >
                        <CheckCircle />
                    </IconButton>
                </Tooltip>
            </Box>
            <Typography variant="body2">
                {reminder.action.title} - {capitalizeAndFormatWord(reminder.action.operation)}
            </Typography>
            <Typography variant="caption" color="textSecondary">
                Due: {new Date(reminder.dueDate).toLocaleDateString()}
            </Typography>
            <Snackbar
                open={error !== null}
                autoHideDuration={3000}
                onClose={() => setError(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={() => setError(null)} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CompanyDashboardReminderTile;
