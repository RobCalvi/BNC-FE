import React, { useEffect, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { BarChart } from '@mui/x-charts/BarChart';
import { useAppDispatch, useAppSelector } from '../../state/redux/hooks';
import { selectActiveAndExistingClients } from '../../state/redux/selectors/dashboardSelectors';
import { getDashboardReminderEffect } from '../../state/redux/effects/dashboardEffect';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CompanyDashboardReminderTile from './CompanyDashboardReminderTile';

type CompanyDashboardTopProps = {
    loading: boolean;
    onViewAllReminders?: () => void; // <<-- Add this
}

const CompanyDashboardTop: React.FC<CompanyDashboardTopProps> = ({ loading, onViewAllReminders }) => {
    const data = useAppSelector(selectActiveAndExistingClients)
    const reminders = useAppSelector(state => state.dashboard.reminders)
    const remindersLoading = useAppSelector(state => state.dashboard.remindersLoading)
    const remindersError = useAppSelector(state => state.dashboard.remindersError)
    const dispatch = useAppDispatch()

    const sortedReminders = useMemo(() => {
        if (!reminders) return [];
        
        // Filter for current week, then sort descending by dueDate:
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
        endOfWeek.setHours(23, 59, 59, 999);

        return [...reminders]
            .filter((r) => {
                const dueDate = new Date(r.dueDate);
                return dueDate >= startOfWeek && dueDate <= endOfWeek;
            })
            .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    }, [reminders]);
    
    useEffect(() => {
        if (!reminders) {
            dispatch(getDashboardReminderEffect())
        }
    }, [reminders, dispatch])

    return (
        <Grid container spacing={3}>
            {/* Left panel with bar chart */}
            <Grid item xs={12} md={8} lg={8}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 240 }}>
                    {loading ? (
                        <Skeleton variant="rectangular" width="100%" height={240} />
                    ) : (
                        <BarChart
                            series={[{ data: [data.activeClients, data.inactiveClients, data.existingClients, data.nonExistentClients] }]}
                            height={290}
                            xAxis={[{ data: ['Active', 'Inactive', 'Existing', 'Non-Existing'], scaleType: 'band' }]}
                            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                        />
                    )}
                </Paper>
            </Grid>

            {/* Right panel with weekly reminders */}
            <Grid item xs={12} md={4} lg={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, overflowY: 'auto' }}>
                    <Box component="div" display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">
                            Reminders for This Week
                        </Typography>
                        {/* "View All" button calls the parent’s setAllRemindersOpen(true) */}
                        <Button variant="text" onClick={onViewAllReminders}>
                            View All
                        </Button>
                    </Box>

                    {remindersLoading ? (
                        <Skeleton variant="rectangular" width="100%" height={180} />
                    ) : (
                        <Box component="div">
                            {remindersError && <Alert severity='error'>Could not load reminders.</Alert>}
                            {sortedReminders.length === 0 ? (
                                <Alert severity="info">No reminders for this week.</Alert>
                            ) : (
                                sortedReminders.map((reminder, index) => (
                                    <CompanyDashboardReminderTile key={index + reminder.createdAt} reminder={reminder} />
                                ))
                            )}
                        </Box>
                    )}
                </Paper>
            </Grid>
        </Grid>
    )
}

export default CompanyDashboardTop;
