
/*
    API Requests for individual company actions.
*/

import Action from "../models/actions/action"
import PostActionPayload from "../models/actions/payloads"
import { BaseReminder } from "../models/reminder/reminder"
import apiClient from "./client"

const postCompanyAction = async (id: string, payload: PostActionPayload) => {
    return await apiClient.post<Action[]>(`/actions?companyId=${id}`, { ...payload }).then(res => res.data)
}

const deleteCompanyAction = async (companyId: string, actionId: string) => {
    return await apiClient.delete<Action[]>(`/actions/${companyId}/${actionId}`).then(res => res.data)
}

const postCompanyActionReminder = async (companyId: string, actionId: string, dueDate: string) => {
    return await apiClient.post<BaseReminder>(`/reminders`, { companyId, actionId, dueDate })
}

const completeCompanyActionReminder = async (reminderId: string) => {
    return await apiClient.patch<boolean>(`/reminders/complete/${reminderId}`, {})
}

export { postCompanyAction, deleteCompanyAction, postCompanyActionReminder, completeCompanyActionReminder }