interface ContactBase {
    firstName: string; // First name of the contact
    lastName: string;  // Last name of the contact
    email: string;     // Email of the contact
    phoneNumber: string | null; // Phone number of the contact (nullable)
    gender?: string;   // Optional gender field
    notes: string[];   // List of notes, initialized as an empty array
}

interface Contact extends ContactBase {
    id: string;         // Unique identifier for the contact
    isPrimary: boolean | null; // Indicates if this contact is primary
}

export type { ContactBase }
export default Contact;
