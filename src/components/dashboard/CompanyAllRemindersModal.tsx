// src/components/dashboard/CompanyAllRemindersModal.tsx
import React, { useCallback, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Reminder, ReminderState } from '../../models/reminder/reminder';
import { useAppDispatch, useAppSelector } from '../../state/redux/hooks';
import { completeCompanyActionReminder, updateReminder } from '../../api/action';
import { removeReminder, updateOneReminder } from '../../state/redux/features/dashboardSlice';

type CompanyAllRemindersModalProps = {
  open: boolean;
  onClose: () => void;
};

const CompanyAllRemindersModal: React.FC<CompanyAllRemindersModalProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  // Grab all reminders from Redux (not just the weekly ones).
  const reminders = useAppSelector(state => state.dashboard.reminders || []);
  const remindersLoading = useAppSelector(state => state.dashboard.remindersLoading);

  // Debugging: see what fields come in
  useEffect(() => {
    if (reminders.length > 0) {
      console.log('First reminder sample:', reminders[0]);
      console.log('Fields in first reminder:', Object.keys(reminders[0]));
    }
  }, [reminders]);

  // Define your columns, each using the two-argument signature for valueGetter
  const columns: GridColDef[] = [
    {
      field: 'companyName',
      headerName: 'Company',
      flex: 1,
      editable: false,
      // We can rely on the raw field if the reminder object directly has companyName
      // So no need for valueGetter if "companyName" is the direct property
    },
    {
      field: 'actionTitle',
      headerName: 'Action Title',
      flex: 1,
      // MUI v7 DataGrid signature: valueGetter: (params, row)
      // But we typically do: valueGetter: (_, row) => ...
      // so we ignore the first param and use the second as the row
      valueGetter: (_, row) => row.action?.title || '',
    },
    {
      field: 'operation',
      headerName: 'Operation',
      flex: 1,
      valueGetter: (_, row) => row.action?.operation || '',
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      type: 'date',
      flex: 1,
      editable: true,
      // Convert row.dueDate to a JS Date if present
      valueGetter: (_, row) => (row.dueDate ? new Date(row.dueDate) : null),
      // Format as a readable string
    //   valueFormatter: (params) => {
    //     if (!params.value) return '';
    //     return (params.value as Date).toLocaleDateString();
    //  },
    },
    {
      field: 'state',
      headerName: 'State',
      flex: 1,
      editable: false,
      // If "state" is just a string like 'PAST' or 'NOT_PAST', we can show it directly
      // or do something fancier. We'll keep it simple here:
      valueGetter: (_, row) => row.state || '',
    },
    {
      field: 'isCompleted',
      headerName: 'Completed?',
      type: 'boolean',
      flex: 0.7,
      editable: true,
    },
    {
      field: 'completeBtn',
      headerName: '',
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params) => {
        if (!params?.row) return null;

        const reminderId = params.row.id;
        const disabled = params.row.isCompleted;

        const handleComplete = async () => {
          if (!reminderId) return;
          try {
            await completeCompanyActionReminder(reminderId);
            dispatch(removeReminder(reminderId));
          } catch (err) {
            console.error('Could not complete reminder', err);
          }
        };

        return (
          <Button
            variant="contained"
            color="primary"
            onClick={handleComplete}
            disabled={disabled}
          >
            Complete
          </Button>
        );
      },
    },
  ];

  // If using inline cell editing for “dueDate” or “isCompleted”:
  const processRowUpdate = useCallback(
    async (newRow: Reminder, oldRow: Reminder) => {
      if (newRow === oldRow) return oldRow;

      const payload: Partial<Reminder> = {};
      if (newRow.dueDate !== oldRow.dueDate) {
        payload.dueDate = newRow.dueDate;
      }
      if (newRow.isCompleted !== oldRow.isCompleted) {
        payload.isCompleted = newRow.isCompleted;
      }

      try {
        const result = await updateReminder(newRow.id, payload);
        dispatch(updateOneReminder(result.data));
        return result.data;
      } catch (err) {
        console.error('Failed to update reminder:', err);
        throw err; // Tells DataGrid to revert if the API call fails
      }
    },
    [dispatch],
  );

  const handleProcessRowUpdateError = useCallback((error: any) => {
    console.error('Row update error:', error);
  }, []);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>All Reminders</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={reminders}
            columns={columns}
            getRowId={(row) => row.id}
            loading={remindersLoading}
            editMode="row"
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompanyAllRemindersModal;
