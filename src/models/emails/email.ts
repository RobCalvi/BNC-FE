import Contact from "../contact/contact";

export default interface Email {
  id: string;
  datetime: string;
  sender: string;
  recipient: Contact | undefined;
  template: string;
  sent: string | null;
  answered: string | null;
  company_id: string;
}