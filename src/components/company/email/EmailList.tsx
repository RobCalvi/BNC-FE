import React, { useEffect, useState, ChangeEvent } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  CircularProgress, 
  Dialog, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  IconButton 
} from '@mui/material';
import { Save, Cancel, Edit } from '@mui/icons-material';

import CreateNewEmail from './CreateNewEmail';
import { getEmailsByCompanyId, updateCompanyEmail } from '../../../api/email';
import Email from '../../../models/emails/email';
import Contact from '../../../models/contact/contact';
import { CompanyFinancials } from '../../../models/company/company';
import { templates } from "./templateOptions";

interface EmailListProps {
  companyId: string;
  companyName: string; 
  financials: CompanyFinancials; 
  contacts: Contact[];
}

const EmailList: React.FC<EmailListProps> = ({ 
  companyId, 
  companyName, 
  financials, 
  contacts 
}) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // For creating a new email
  const [showCreateForm, setShowCreateForm] = useState(false);

  // For editing
  // We'll store the ID of the email we're editing, as well as local form values for that row
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{
    sender: string;
    sent: string;
    answered: string;
  }>({ sender: '', sent: '', answered: '' });

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await getEmailsByCompanyId(companyId);
        setEmails(response);
      } catch (error) {
        console.error("Error fetching emails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [companyId]);

  const handleCreateClick = () => setShowCreateForm(true);
  const handleClose = () => setShowCreateForm(false);

  const getTemplateName = (templateKey: string) => {
    const template = templates.find(t => t.key === templateKey);
    return template ? template.name : 'Unknown Template';
  };

  // Handle "Edit" button click: set the editing row and initialize form values
  const handleEditClick = (email: Email) => {
    setEditingId(email.id);
    setEditValues({
      sender: email.sender || '',
      // We store date as a string in the state. If you want date pickers, you can adapt accordingly.
      sent: email.sent ? new Date(email.sent).toISOString().slice(0,16) : '',
      answered: email.answered ? new Date(email.answered).toISOString().slice(0,16) : ''
    });
  };

  // Handle text field changes
  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Cancel edit
  const handleCancel = () => {
    setEditingId(null);
    setEditValues({ sender: '', sent: '', answered: '' });
  };

  // Save edit
  const handleSave = async (id: string) => {
    try {
      // If you're using string for date, you can convert from
      // the YYYY-MM-DDTHH:mm form or whichever format you prefer
      // e.g. new Date(editValues.sent).toISOString() as needed

      const payload: Partial<Email> = {
        sender: editValues.sender || undefined,
        sent: editValues.sent ? new Date(editValues.sent).toISOString() : undefined,
        answered: editValues.answered ? new Date(editValues.answered).toISOString() : undefined,
      };

      const updated = await updateCompanyEmail(id, payload);

      // Update local state
      setEmails((prev) => prev.map(e => e.id === id ? updated : e));
    } catch (error) {
      console.error("Error updating email:", error);
    } finally {
      handleCancel();
    }
  };

  return (
    <Box>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCreateClick} 
        sx={{ marginTop: 2 }}
      >
        Create New Email
      </Button>

      <Dialog 
        open={showCreateForm} 
        onClose={handleClose} 
        fullWidth 
        maxWidth="sm"
      >
        <CreateNewEmail 
          companyId={companyId}
          contacts={contacts} 
          company={{ legalName: companyName, financials }} 
          onClose={handleClose} 
        />
      </Dialog>

      <Typography 
        variant="h5" 
        sx={{ textAlign: 'center', marginY: 2 }}
      >
        Sent Emails
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Sender</TableCell>
                <TableCell>Recipient</TableCell>
                <TableCell>Template</TableCell>
                <TableCell>Sent</TableCell>
                <TableCell>Answered</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emails.map(email => {
                const isEditing = email.id === editingId;
                return (
                  <TableRow key={email.id}>
                    {/* Date is not editable in your request, so always show it */}
                    <TableCell>
                      {new Date(email.datetime).toLocaleString()}
                    </TableCell>

                    {/* Sender (Editable) */}
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          name="sender"
                          value={editValues.sender}
                          onChange={handleFieldChange}
                          size="small"
                        />
                      ) : (
                        email.sender
                      )}
                    </TableCell>

                    {/* Recipient (Not editable) */}
                    <TableCell>
                      {email.recipient?.email || 'No recipient'}
                    </TableCell>

                    {/* Template (Not editable) */}
                    <TableCell>
                      {getTemplateName(email.template)}
                    </TableCell>

                    {/* Sent (Editable) */}
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          type="datetime-local"
                          name="sent"
                          value={editValues.sent}
                          onChange={handleFieldChange}
                          size="small"
                        />
                      ) : (
                        email.sent 
                          ? new Date(email.sent).toLocaleString() 
                          : "N/A"
                      )}
                    </TableCell>

                    {/* Answered (Editable) */}
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          type="datetime-local"
                          name="answered"
                          value={editValues.answered}
                          onChange={handleFieldChange}
                          size="small"
                        />
                      ) : (
                        email.answered 
                          ? new Date(email.answered).toLocaleString()
                          : "N/A"
                      )}
                    </TableCell>

                    {/* Actions: Edit/Save/Cancel */}
                    <TableCell align="center">
                      {isEditing ? (
                        <>
                          <IconButton 
                            color="primary" 
                            onClick={() => handleSave(email.id)}
                          >
                            <Save />
                          </IconButton>
                          <IconButton color="error" onClick={handleCancel}>
                            <Cancel />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton
                          color="primary"
                          onClick={() => handleEditClick(email)}
                        >
                          <Edit />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default EmailList;
