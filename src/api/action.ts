/*
    API Requests for individual company actions.
*/

import Action from "../models/actions/action"
import PostActionPayload from "../models/actions/payloads"
import { BaseReminder, Reminder } from "../models/reminder/reminder"
import apiClient from "./client"

const postCompanyAction = async (id: string, payload: PostActionPayload) => {
    return await apiClient
        .post<Action[]>(`/actions?companyId=${id}`, { ...payload })
        .then(res => res.data)
}

const deleteCompanyAction = async (companyId: string, actionId: string) => {
    return await apiClient
        .delete<Action[]>(`/actions/${companyId}/${actionId}`)
        .then(res => res.data)
}

const postCompanyActionReminder = async (companyId: string, actionId: string, dueDate: string) => {
    return await apiClient
        .post<BaseReminder>(`/reminders`, { companyId, actionId, dueDate })
        .then(res => res.data)
}

const completeCompanyActionReminder = async (reminderId: string) => {
    return await apiClient
        .patch<boolean>(`/reminders/complete/${reminderId}`, {})
        .then(res => res.data)
}

/**
 * Updates an existing reminder by ID.
 * 
 * @param reminderId - The ID of the reminder to patch
 * @param payload - Fields to update (e.g. dueDate, isCompleted, etc.)
 * @returns The updated Reminder object
 */
const updateReminder = async (reminderId: string, payload: Partial<Reminder>) => {
    return await apiClient
        .patch<Reminder>(`/reminders/${reminderId}`, payload)
        .then(res => res.data)
}

export {
    postCompanyAction,
    deleteCompanyAction,
    postCompanyActionReminder,
    completeCompanyActionReminder,
    updateReminder
}
