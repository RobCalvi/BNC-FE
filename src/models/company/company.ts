import Action from "../actions/action";
import Comment from "../comment/comment";
import Contact from "../contact/contact";
import News from "../news/news";

interface CompanyFinancials {
    checkingAccount: number;
    longTermInvestments: number;
    totalInvestments: number;
    physicalAssets: number;
    totalActives: number;
    loans: number;
    totalPassives: number;
    totalDonations: number;
    federalRevenue: number;
    provincialRevenue: number;
    municipalRevenue: number;
    totalRevenue: number;
    interestAndBankingFees: number;
    occupationCost: number;
    professionalFees: number;
    salaries: number;
    fixedAssetDepreciation: number;
    others: number;
    totalExpenses: number;
    timestamp: string;
}

interface BaseCompany {
    id: string;
    legalName: string;
    isActive: boolean;
    isExistingClient: boolean;
    addedDate?: string | null;
    financials: CompanyFinancials;
    numContacts: number;
    contactName: string;
    latestEmailDatetime?: string;
    latestEmailTemplate?: string; 
    description: string | null;
    companyPhoneNumber: string | null;
    companyEmail: string | null;
    companyWebsite: string | null;
    fcc: number;
    streetAddress: string;
    city: string;
    stateOrProvince: string;
    postalCode: string;
    contacts: Contact[];
    actions: Action[];
    comments: Comment[];
    news: News[];
}

interface Company extends BaseCompany {
    description: string | null;
    companyPhoneNumber: string | null;
    companyEmail: string | null;
    companyWebsite: string | null;
    fcc: number;
    streetAddress: string;
    city: string;
    stateOrProvince: string;
    postalCode: string;
    contacts: Contact[];
    actions: Action[];
    comments: Comment[];
    news: News[];
}

export type { BaseCompany, Company,CompanyFinancials}

export default Company;