
import Contact, { ContactBase } from "../models/contact/contact"
import { UpdateContactPayload } from "../models/contact/payloads"
import apiClient from "./client"


/*
    API Requests for individual company contact.
*/

const postCompanyContact = async (id: string, payload: ContactBase):Promise<Contact[]> => {
    return await apiClient.post<Contact[]>(`/contacts?companyId=${id}`, { ...payload }).then(res => res.data)
} 

const updateCompanyContact = async (companyId: string, contactId: string, payload: UpdateContactPayload):Promise<Contact[]> => {
    return await apiClient.patch<Contact[]>(`/contacts?companyId=${companyId}&contactId=${contactId}`, { ...payload }).then(res => res.data)
}

const deleteCompanyContact = async (companyId: string, contactId: string):Promise<Contact[]> => {
    return await apiClient.delete<Contact[]>(`/contacts/${companyId}/${contactId}`).then(res => res.data)
}

export { postCompanyContact, updateCompanyContact, deleteCompanyContact }