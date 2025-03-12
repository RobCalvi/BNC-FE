
interface UpdateCompanyPayload {
    legalName?: string;
    companyPhoneNumber?: string | null;
    companyEmail?: string | null;
    companyWebsite?: string | null;
    description?: string | null;
    streetAddress?: string;
    city?: string;
    stateOrProvince?: string;
    postalCode?: string;
}

export type { UpdateCompanyPayload }