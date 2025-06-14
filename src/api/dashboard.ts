import { BaseCompany } from "../models/company/company"
import { Reminder } from "../models/reminder/reminder"
import apiClient from "./client"
import { getCompanyById } from "./company";


const getDashboardCompanies = async (): Promise<BaseCompany[]> => {
  const response = await apiClient.get("companies?skip=0&limit=100000");
  const baseCompanies = response.data.map((company: any) => ({
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

  // Enrich each row with contact phone numbers
  const enrichedCompanies = await Promise.all(
    baseCompanies.map(async (company: BaseCompany) => {
      try {
        const fullCompany = await getCompanyById(company.id); // must return full model including `contacts`
        return {
          ...company,
          contacts: fullCompany.contacts ?? [],
        };
      } catch (error) {
        console.warn(`Failed to fetch full data for company ${company.id}`, error);
        return company; // return base company if full fetch fails
      }
    })
  );

  return enrichedCompanies;
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