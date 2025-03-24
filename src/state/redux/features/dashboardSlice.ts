import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BaseCompany } from "../../../models/company/company";
import getDashboardEffect, { getDashboardReminderEffect, postImportCompaniesEffect } from '../effects/dashboardEffect';
import { Reminder } from '../../../models/reminder/reminder';

export type IDashboardSlice = {
    data: BaseCompany[];
    loading: boolean;
    error: string;
    reminders: Reminder[] | null;
    remindersLoading: boolean;
    remindersError: string;
    importLoading: boolean;
    importSuccess: boolean;
    importError: string;
}

const initialState: IDashboardSlice = {
    data: [],
    loading: false,
    error: '',
    reminders: null,
    remindersLoading: false,
    remindersError: '',
    importLoading: false,
    importSuccess: false,
    importError: ''
};

const dashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState,
    reducers: {
        removeReminder: (state, { payload }: PayloadAction<string>) => {
            if (state.reminders) {
                state.reminders = state.reminders.filter(r => r.id !== payload);
            }
        },
        // NEW: Updates one reminder by replacing it in the array
        updateOneReminder: (state, { payload }: PayloadAction<Reminder>) => {
            if (!state.reminders) return;
            const index = state.reminders.findIndex(r => r.id === payload.id);
            if (index !== -1) {
                state.reminders[index] = payload;
            }
        },
        // addReminder: (state, { payload }: PayloadAction<Reminder>) => {
        //     if (state.reminders) {
        //         const index = state.reminders.findIndex(r => r.id === payload.id);
        //         if (index >= 0) {
        //             // Update existing
        //             const temp = [...state.reminders];
        //             temp[index] = payload;
        //             state.reminders = temp;
        //         } else {
        //             // Add new
        //             state.reminders = [...state.reminders, payload];
        //         }
        //     }
        // },
    },
    extraReducers: (builder) => {
        builder
            // Dashboard data
            .addCase(getDashboardEffect.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDashboardEffect.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload;
                state.error = '';
            })
            .addCase(getDashboardEffect.rejected, (state, { error }) => {
                state.loading = false;
                state.data = [];
                state.error = error.message ?? "An error occurred.";
            })
            
            // Reminders
            .addCase(getDashboardReminderEffect.pending, (state) => {
                state.remindersLoading = true;
            })
            .addCase(getDashboardReminderEffect.fulfilled, (state, { payload }) => {
                state.remindersLoading = false;
                state.reminders = payload;
                state.remindersError = '';
            })
            .addCase(getDashboardReminderEffect.rejected, (state, { error }) => {
                state.remindersLoading = false;
                state.reminders = null;
                state.remindersError = error.message ?? "An error occurred.";
            })

            // Import companies
            .addCase(postImportCompaniesEffect.pending, (state) => {
                state.importLoading = true;
            })
            .addCase(postImportCompaniesEffect.fulfilled, (state, { payload }) => {
                state.importLoading = false;
                state.data = payload;
                state.importSuccess = true;
                state.importError = '';
            })
            .addCase(postImportCompaniesEffect.rejected, (state, { error }) => {
                state.importLoading = false;
                state.importSuccess = false;
                state.importError = error.message ?? "An error occurred.";
            });
    }
});

export const { 
    removeReminder,
    updateOneReminder, // <-- Export your new action here
    // addReminder 
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
