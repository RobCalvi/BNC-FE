import { BaseCompany } from "../models/company/company"
import { Reminder } from "../models/reminder/reminder"
import apiClient from "./client"



const getDashboardCompanies = async (): Promise<BaseCompany[]> => {
    const response = await apiClient.get("companies?skip=0&limit=100000");
    return response.data.map((company: any) => ({
        id: company.id,
        legalName: company.legalName,
        isActive: company.isActive,
        isExistingClient: company.isExistingClient,
        addedDate: company.addedDate,
        financials: company.financials,
        contactName: company.contactName,
        latestEmailDatetime: company.latestEmailDatetime,
        latestEmailTemplate: company.latestEmailTemplate,
    }));
};


const getDashboardReminders = async () => {
    return await apiClient.get<Reminder[]>("/reminders?limit=50").then(res => res.data)
}

const postImportCompanies = async (formData: FormData): Promise<BaseCompany[]> => {
    return await apiClient.post<BaseCompany[]>("companies/import", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data)
}

export { getDashboardCompanies, getDashboardReminders, postImportCompanies }