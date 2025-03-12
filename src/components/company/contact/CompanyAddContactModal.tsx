import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Contact, { ContactBase } from '../../../models/contact/contact';
import { postCompanyContact } from '../../../api/contact';
import useStatus from '../../../hooks/useStatus';
import DialogActionWithFeedback from '../../common/DialogActionWithFeedback';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

interface CompanyAddContactModalProps {
  id: string;
  open: boolean;
  onClose: () => void;
  handleUpdate: (nc: Contact[]) => void;
}

const validationSchema = Yup.object({
  firstName: Yup.string().trim().required('First name is required').min(2, "Minimum 2 characters").max(50, "Maximum 50 characters"),
  lastName: Yup.string().trim().required('Last name is required').min(2, "Minimum 2 characters").max(50, "Maximum 50 characters"),
  email: Yup.string().trim().email('Invalid email address').required('Email is required'),
  phoneNumber: Yup.string().trim().required('Phone number is required'),
  gender: Yup.string().oneOf(['Male', 'Female', '']).notRequired(), // Optional gender field
});

const initialState: ContactBase = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  gender: '', // Default to an empty string for optional gender
  notes: []  // Initialize as an empty array
};

const CompanyAddContactModal: React.FC<CompanyAddContactModalProps> = ({ id, open, onClose, handleUpdate }) => {
  const { status, setLoading, setError, setSuccess } = useStatus();

  const handleSubmit = async (values: ContactBase) => {
    try {
      setLoading(true);
      setSuccess(false);
      setError('');
      const results = await postCompanyContact(id, values);
      handleUpdate(results);
      return onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Contact</DialogTitle>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleSubmit }) => (
          <Form>
            <DialogContent>
              <Box display="flex" flexDirection="column" gap={2}>
                <Field
                  name="firstName"
                  as={TextField}
                  label="First Name"
                  fullWidth
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <Field
                  name="lastName"
                  as={TextField}
                  label="Last Name"
                  fullWidth
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  name="phoneNumber"
                  as={TextField}
                  label="Phone Number"
                  fullWidth
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
                <Field
                  name="gender"
                  as={TextField}
                  label="Gender"
                  select
                  fullWidth
                  error={touched.gender && Boolean(errors.gender)}
                  helperText="Optional"
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Field>
              </Box>
            </DialogContent>
            <DialogActionWithFeedback
              loading={status.loading}
              error={status.error}
              acceptLabel="Save"
              rejectLabel="Cancel"
              handleAdd={handleSubmit}
              handleCancel={onClose}
            />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default CompanyAddContactModal;
