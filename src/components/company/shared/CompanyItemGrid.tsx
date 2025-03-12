import React from 'react'
import Grid from '@mui/material/Grid';

const CompanyItemGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Grid container spacing={2}>
            {children}
        </Grid>
    )
}

const CompanyGridItem: React.FC<{ children: React.ReactNode }> = ({ children }) => <Grid item xs={12} sm={6} md={4}>{children}</Grid>

export { CompanyGridItem }
export default CompanyItemGrid