import Action from "../actions/action";


interface BaseReminder {
    companyId: string;
    actionId: string;
    date: string;
}

enum ReminderState {
    PAST = "PAST",
    NOT_PAST = "NOT_PAST"
}

interface Reminder {
    id: string;
    companyName: string;
    isCompleted: boolean;
    state: ReminderState;
    createdAt: string;
    dueDate: string;
    action: Action;
}

export { ReminderState }
export type { BaseReminder, Reminder }