import React, { useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import Contact from '../../../models/contact/contact';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { updateCompanyContact } from '../../../api/contact';
import useStatus from '../../../hooks/useStatus';
import Box from '@mui/material/Box';
import SnackbarStatus from '../../common/SnackbarStatus';
import DeleteIcon from '@mui/icons-material/Delete';

interface ContactTileProps {
  companyId: string;
  contact: Contact;
  handleUpdate: (nc: Contact[]) => void;
  onEmailClick?: (email: string) => void;
  onPhoneClick?: (phone: string) => void;
  handleDeleteClick: () => void;
}

const validationSchema = Yup.object({
  firstName: Yup.string().trim().required('First name is required').min(2, "Minimum 2 characters").max(50, "Maximum 50 characters"),
  lastName: Yup.string().trim().required('Last name is required').min(2, "Minimum 2 characters").max(50, "Maximum 50 characters"),
  email: Yup.string().trim().email('Invalid email address').required('Email is required'),
  phoneNumber: Yup.string().trim().notRequired(),
});

const ContactTile: React.FC<ContactTileProps> = ({ companyId, contact, handleUpdate, onEmailClick, onPhoneClick, handleDeleteClick }) => {
  const { status: { loading, error, success }, setLoading, setSuccess, setError } = useStatus();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const initialState = {
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phoneNumber: contact.phoneNumber ?? '',
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      setSuccess(false);
      setError(null);
      const res = await updateCompanyContact(companyId, contact.id, values);
      setSuccess(true);
      handleUpdate(res);
      setLoading(false);
      return setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
    setError(null);
  };

  return (
    <Card sx={{ maxWidth: 360, margin: 2, minHeight: 200 }}>
      <CardContent>
        {
          !isEditing ? (
            <Box display="flex" flexDirection="column">
              <Box component="div" display="flex" flexDirection="row" justifyContent="space-between" flexWrap="wrap">
                <Typography variant="h6">
                  {`${contact.firstName} ${contact.lastName}`.length > 50
                    ? `${contact.firstName} ${contact.lastName}`.slice(0, 50) + "..."
                    : `${contact.firstName} ${contact.lastName}`}
                </Typography>
                <Box component="div">
                  <IconButton color="primary" onClick={() => setIsEditing(true)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={handleDeleteClick}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box component="div">
                {contact.isPrimary && (
                  <Badge
                    color="primary"
                    badgeContent="Primary"
                    sx={{ ml: 3 }}
                  />
                )}
              </Box>
              <Box mt={2}>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => onEmailClick?.(contact.email)} color="primary">
                    <MailOutlineIcon />
                  </IconButton>
                  <Typography variant="body2" color="textSecondary" ml={1}>
                    {contact.email}
                  </Typography>
                </Box>
                <Box mt={1} display="flex" alignItems="center">
                  <IconButton disabled={!contact.phoneNumber} onClick={() => contact.phoneNumber && onPhoneClick?.(contact.phoneNumber)} color="primary">
                    <PhoneIcon />
                  </IconButton>
                  <Typography variant="body2" color="textSecondary" ml={1}>
                    {contact.phoneNumber ?? "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ) : (
            <Formik
              initialValues={initialState}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Grid item sx={{ paddingY: .5 }}>
                    <Field
                      name="firstName"
                      as={TextField}
                      label="First Name"
                      fullWidth
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item sx={{ paddingY: .5 }}>
                    <Field
                      name="lastName"
                      as={TextField}
                      label="Last Name"
                      fullWidth
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item sx={{ paddingY: .5 }}>
                    <Field
                      name="email"
                      as={TextField}
                      label="Email"
                      fullWidth
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item sx={{ paddingY: .5 }}>
                    <Field
                      name="phoneNumber"
                      as={TextField}
                      label="Phone Number"
                      fullWidth
                      error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                  </Grid>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    {
                      loading ? <CircularProgress /> : (
                        <>
                          <Button variant="contained" color="primary" type="submit" startIcon={<SaveIcon />} sx={{ mr: 1 }}>
                            Save
                          </Button>
                          <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)} startIcon={<CancelIcon />}>
                            Cancel
                          </Button>
                        </>
                      )
                    }
                  </Box>
                </Form>
              )}
            </Formik>
          )
        }
      </CardContent>
      <SnackbarStatus loading={loading} error={error} success={success} handleCloseSnackbar={handleCloseSnackbar} />
    </Card>
  );
};

export default ContactTile;
