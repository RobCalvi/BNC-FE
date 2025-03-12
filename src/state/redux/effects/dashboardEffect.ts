import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardCompanies, getDashboardReminders, postImportCompanies } from "../../../api/dashboard";
import { BaseCompany } from "../../../models/company/company";


const getDashboardEffect = createAsyncThunk(
    'dashboard/getcompanies',
    async (_, thunkApi) => {
        try {
            return await getDashboardCompanies() as BaseCompany[]; // Ensure response is treated as BaseCompany[]
        } catch (err) {
            console.error(err);
            return thunkApi.rejectWithValue("An error occurred.");
        }
    }
);

const getDashboardReminderEffect = createAsyncThunk(
    'dashboard/getreminders',
    async (_, thunkApi) => {
        try {
            return await getDashboardReminders()
        } catch (err) {
            console.log(err)
            return thunkApi.rejectWithValue("An error occurred.")
        }
    }
)

const postImportCompaniesEffect = createAsyncThunk(
    'dashboard/importcompanies',
    async (file: FormData, thunkApi) => {
        try {
            return await postImportCompanies(file)
        } catch (err) {
            console.log(err)
            return thunkApi.rejectWithValue("An error occurred.")
        }
    }
)

export { getDashboardReminderEffect, postImportCompaniesEffect }
export default getDashboardEffect;