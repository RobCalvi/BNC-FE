

/*
    API Requests for individual company pages.
*/

import Company from "../models/company/company";
import { UpdateCompanyPayload } from "../models/company/payloads";
import apiClient from "./client";

const getCompanyById = async (companyId: string): Promise<Company> => {
  const response = await apiClient.get(`/companies/${companyId}`);
  return response.data;
};

const updateCompanyDetails = async (id: string, payload: UpdateCompanyPayload) => {
    return await apiClient.patch<Company>(`/companies/${id}`, payload).then(res => res.data)
}

const deleteCompany = async (id: string) => {
    return await apiClient.delete(`/companies/${id}`).then(res => res.data);
  };

export { getCompanyById, updateCompanyDetails, deleteCompany }