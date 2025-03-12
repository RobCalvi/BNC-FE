interface UpdateContactPayload {
    firstName?: string; // Optional first name for updates
    lastName?: string;  // Optional last name for updates
    email?: string;     // Optional email for updates
    phoneNumber?: string; // Optional phone number for updates
    gender?: string;    // Optional gender field for updates
    notes?: string[];   // Optional notes field for updates
}

export type { UpdateContactPayload }
