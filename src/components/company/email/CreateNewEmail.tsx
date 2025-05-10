import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@mui/material";
import Contact from "../../../models/contact/contact";
import { templates } from "./templateOptions";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import Template4 from "./templates/Template4";
import Template5 from "./templates/Template5";
import Template6 from "./templates/Template6";
import Template7 from "./templates/Template7";
import Template8 from "./templates/Template8";
import Template9 from "./templates/Template9";
import { saveAs } from "file-saver";
// import the postCompanyEmail function
import { postCompanyEmail } from "../../../api/email";
import Email from "../../../models/emails/email";

interface CreateNewEmailProps {
  companyId: string; // <-- we need this
  contacts: Contact[];
  company: {
    legalName: string;
    financials: {
      checkingAccount?: number;
      longTermInvestments?: number;
    };
  };
  onClose: () => void;
}

// map template keys to components
const templateComponents: { [key: string]: React.FC<any> } = {
  Template1,
  Template2,
  Template3,
  Template4,
  Template5,
  Template6,
  Template7,
  Template8,
  Template9
};

const CreateNewEmail: React.FC<CreateNewEmailProps> = ({
  companyId,
  contacts,
  company,
  onClose,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [selectedContact, setSelectedContact] = useState<string>("");
  const [contactGender, setContactGender] = useState<string>("");
  const [preview, setPreview] = useState<boolean>(false);

  const getEmailDetails = () => {
    const template = templates.find((t) => t.key === selectedTemplate);
    const subject = template ? template.subject : "No Subject";
    const recipientEmail =
      contacts.find((contact) => contact.id === selectedContact)?.email ||
      "unknown@example.com";
    return { subject, recipientEmail };
  };

  const handlePreview = () => setPreview(true);

  // Main function that both posts to DB and generates .eml
  const handleGenerateEmail = async () => {
    const { subject, recipientEmail } = getEmailDetails();

    if (!selectedTemplate || !templateComponents[selectedTemplate]) {
      console.error("Invalid template selected.");
      return;
    }

    // Grab the preview content from the DOM
    const emailBodyElement = document.getElementById("email-preview");
    const emailBody = emailBodyElement?.innerHTML || "";

    if (!emailBody) {
      console.error("Email body is empty.");
      return;
    }

    // 1. Build the email payload for the DB
    const recipientContact = contacts.find(
      (contact) => contact.id === selectedContact
    );
    const newEmailPayload: Email = {
      id: "", // or let the DB create it
      datetime: new Date().toISOString(),
      sender: "no-reply@yourapp.com", // adjust as needed
      recipient: recipientContact,
      template: selectedTemplate,
      sent: null,
      answered: null,
      company_id: companyId, // <---- key part
    };

    // 2. Post to the database
    try {
      const createdEmail = await postCompanyEmail(newEmailPayload);
      console.log("Successfully created email in DB:", createdEmail);
    } catch (err) {
      console.error("Failed to save email:", err);
    }

    // 3. Generate and download the .eml file
    const emlContent = [
      `To: ${recipientEmail}`,
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=UTF-8`,
      "",
      emailBody,
    ].join("\r\n");

    const blob = new Blob([emlContent], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${subject}.eml`);
    console.log("Email generated and saved as .eml.");

    // 4. Close the dialog
    onClose();
  };

  const SelectedTemplateComponent =
    selectedTemplate && templateComponents[selectedTemplate]
      ? templateComponents[selectedTemplate]
      : null;

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Email</DialogTitle>
      <DialogContent>
        {!preview ? (
          <>
            <TextField
              select
              label="Template"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              fullWidth
              sx={{ marginY: 1 }}
            >
              {templates.map((template) => (
                <MenuItem key={template.key} value={template.key}>
                  {template.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Contact"
              value={selectedContact}
              onChange={(e) => setSelectedContact(e.target.value)}
              fullWidth
              sx={{ marginY: 1 }}
            >
              {contacts.map((contact) => (
                <MenuItem key={contact.id} value={contact.id}>
                  {`${contact.firstName} ${contact.lastName}`}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Gender"
              value={contactGender}
              onChange={(e) => setContactGender(e.target.value)}
              fullWidth
              sx={{ marginY: 1 }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
          </>
        ) : (
          <Box
            id="email-preview"
            sx={{ marginY: 2, border: "1px solid #ddd", padding: 2 }}
          >
            {SelectedTemplateComponent && (
              <SelectedTemplateComponent
                recipientName={
                  contacts.find((contact) => contact.id === selectedContact)
                    ?.lastName || "Recipient"
                }
                recipientGender={contactGender === "Male" ? "Male" : "Female"}
                companyName={company.legalName}
                financials={company.financials}
                exercise="To be confirmed"
              />
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {!preview ? (
          <Button variant="contained" color="primary" onClick={handlePreview}>
            Preview Email
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleGenerateEmail}>
            Generate Email
          </Button>
        )}
        <Button variant="text" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewEmail;
