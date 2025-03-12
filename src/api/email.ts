import Email from "../models/emails/email"
import apiClient from "./client"

/*
    API Requests for company emails.
*/

const postCompanyEmail = async (payload: Email): Promise<Email> => {
    return await apiClient
      .post<Email>("/emails/", payload)
      .then((res) => res.data);
  };

const updateCompanyEmail = async (emailId: string, payload: Partial<Email>): Promise<Email> => {
    return await apiClient.patch<Email>(`/emails/${emailId}`, { ...payload }).then(res => res.data)
}

const deleteCompanyEmail = async (emailId: string): Promise<{ message: string }> => {
    return await apiClient.delete<{ message: string }>(`/emails/${emailId}`).then(res => res.data)
}

const getCompanyEmails = async (companyId: string): Promise<Email[]> => {
    return await apiClient.get<Email[]>(`/emails?companyId=${companyId}`).then(res => res.data)
}

const getEmailsByCompanyId = async (companyId: string, skip: number = 0, limit: number = 10): Promise<Email[]> => {
    return await apiClient.get<Email[]>(`/emails/company/${companyId}?skip=${skip}&limit=${limit}`).then(res => res.data);
};

const generateEml = async (subject: string, toEmail: string, htmlBody: string, images: string[]): Promise<Blob> => {
    const response = await apiClient.post(
        '/emails/generate-eml/',
        { subject, to_email: toEmail, html_body: htmlBody, images },
        { responseType: 'blob' } // Ensure Axios knows to handle blob responses
    );
    return response.data as Blob; // Explicitly type the response as a Blob
};
  
  export { postCompanyEmail, updateCompanyEmail, deleteCompanyEmail, getCompanyEmails, getEmailsByCompanyId, generateEml };
  
