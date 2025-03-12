import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { UpdateCompanyPayload } from '../../models/company/payloads';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { updateCompanyDetails } from '../../api/company';
import useStatus from '../../hooks/useStatus';
import Company from '../../models/company/company';
import SnackbarStatus from '../common/SnackbarStatus';

interface CompanyDetailsProps {
    id: string;
    name: string;
    email: string | null;
    website: string | null;
    phoneNumber: string | null;
    streetAddress: string;
    city: string;
    stateOrProvince: string;
    postalCode: string;
    description: string | null;
    handleUpdate: (newCompany: Company) => void;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ id, name, email, website, phoneNumber, streetAddress, city, stateOrProvince, postalCode, description, handleUpdate }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const { status, setLoading, setError, setSuccess } = useStatus()
    const handleEditClick = () => setIsEditing(true);
    const handleCancelClick = () => setIsEditing(false);
    const initialValues: UpdateCompanyPayload = {
        legalName: name,
        companyPhoneNumber: phoneNumber,
        streetAddress,
        city,
        stateOrProvince,
        postalCode,
        companyEmail: email,
        companyWebsite: website,
        description
    };

    const validationSchema = Yup.object({
        legalName: Yup.string().trim().required('Legal name is required'),
        companyPhoneNumber: Yup.string().trim(),
        streetAddress: Yup.string().trim().required('Street address is required'),
        city: Yup.string().trim().required('City is required'),
        stateOrProvince: Yup.string().trim().required('State is required'),
        postalCode: Yup.string().trim().required('Postal code is required'),
        companyEmail: Yup.string().trim().email('Invalid email address'),
        companyWebsite: Yup.string().trim().url('Invalid URL'),
        description: Yup.string().trim().min(5, "If adding a description, please add a minimum of 5 characters.").max(200, "Maximum 200 characters.")
    });
    const items = [
        { label: "Legal Name", value: name }, { label: "Phone", value: phoneNumber }, { label: "Address", value: `${streetAddress}, ${city}, ${stateOrProvince} ${postalCode}` },
        { label: "Email", value: email }, { label: "Website", value: website, isLink: true }, { label: "Description", value: description }
    ]
    const handleSubmit = async (values: UpdateCompanyPayload) => {
        try {
            setLoading(true)
            const res = await updateCompanyDetails(id, values)
            handleUpdate(res)
            setSuccess(true)
            setIsEditing(false)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    const handleCloseSnackbar = () => {
        setSuccess(false);
        setError(null);
    }
    return (
        <Box>
            <Card sx={{ marginTop: 2 }}>
                <CardContent>
                    {
                        !isEditing ? (
                            <>
                                <Box display="flex" justifyContent="flex-end" alignItems="center">
                                    <IconButton onClick={handleEditClick} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                                <Box>
                                    <Grid container spacing={2}>
                                        {items.map(item => <CompanyDetailItem key={item.label} label={item.label} value={item.value} isLink={item.isLink} />)}
                                    </Grid>
                                </Box>
                            </>
                        ) : (
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ errors, touched }) => (
                                    <Form>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                                    <Typography variant="h6">Edit Company Details</Typography>
                                                    <Box>
                                                        <IconButton type="submit" color="info" disabled={status.loading}>
                                                            <SaveIcon />
                                                        </IconButton>
                                                        <IconButton onClick={handleCancelClick} color="secondary" disabled={status.loading}>
                                                            <CancelIcon />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                                <Divider sx={{ my: 2 }} />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Field
                                                    name="legalName"
                                                    as={TextField}
                                                    label="Legal Name"
                                                    fullWidth
                                                    error={touched.legalName && Boolean(errors.legalName)}
                                                    helperText={touched.legalName && errors.legalName}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Field
                                                    name="companyPhoneNumber"
                                                    as={TextField}
                                                    label="Phone Number"
                                                    fullWidth
                                                    error={touched.companyPhoneNumber && Boolean(errors.companyPhoneNumber)}
                                                    helperText={touched.companyPhoneNumber && errors.companyPhoneNumber}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Field
                                                    name="streetAddress"
                                                    as={TextField}
                                                    label="Street Address"
                                                    fullWidth
                                                    error={touched.streetAddress && Boolean(errors.streetAddress)}
                                                    helperText={touched.streetAddress && errors.streetAddress}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Field
                                                    name="city"
                                                    as={TextField}
                                                    label="City"
                                                    fullWidth
                                                    error={touched.city && Boolean(errors.city)}
                                                    helperText={touched.city && errors.city}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Field
                                                    name="stateOrProvince"
                                                    as={TextField}
                                                    label="State/Province"
                                                    fullWidth
                                                    error={touched.stateOrProvince && Boolean(errors.stateOrProvince)}
                                                    helperText={touched.stateOrProvince && errors.stateOrProvince}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Field
                                                    name="postalCode"
                                                    as={TextField}
                                                    label="Postal Code"
                                                    fullWidth
                                                    error={touched.postalCode && Boolean(errors.postalCode)}
                                                    helperText={touched.postalCode && errors.postalCode}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Field
                                                    name="companyEmail"
                                                    as={TextField}
                                                    label="Company Email"
                                                    fullWidth
                                                    error={touched.companyEmail && Boolean(errors.companyEmail)}
                                                    helperText={touched.companyEmail && errors.companyEmail}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Field
                                                    name="companyWebsite"
                                                    as={TextField}
                                                    label="Company Website"
                                                    fullWidth
                                                    error={touched.companyWebsite && Boolean(errors.companyWebsite)}
                                                    helperText={touched.companyWebsite && errors.companyWebsite}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    name="description"
                                                    as={TextField}
                                                    label="Description"
                                                    multiline
                                                    rows={4}
                                                    fullWidth
                                                    error={touched.description && Boolean(errors.description)}
                                                    helperText={touched.description && errors.description}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik>
                        )
                    }
                </CardContent>
            </Card>
            <SnackbarStatus loading={status.loading} error={status.error} success={status.success} handleCloseSnackbar={handleCloseSnackbar} />
        </Box>
    );
};

const CompanyDetailItem: React.FC<{ label: string; value: string | null; isLink?: boolean; }> = ({ label, value, isLink }) => {
    return (
        <Grid item xs={12} sm={6}>
            <Typography variant="h6">{label}</Typography>
            <Typography variant="body1">
                {
                    isLink && value ? (
                        <a href={value} target="_blank" rel="noopener noreferrer">
                            {value}
                        </a>
                    ) : value ? value : "N/A"
                }
            </Typography>
        </Grid>
    )
}

export default CompanyDetails;