import React from 'react';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef, GridToolbar } from '@mui/x-data-grid';
import currencyFormatter from '../../utils/currency';
import BaseCompany from "../../models/company/company";
import TableSkeleton from '../common/TableSkeleton';
import { useNavigate } from 'react-router';
import styles from './dashboard.module.scss';
import Box from '@mui/material/Box';
import { templates } from '../company/email/templateOptions'; // Import the templates

type CompanyTableProps = {
    rows: BaseCompany[];
    loading: boolean;
};

const getTemplateName = (templateKey: string) => {
    const template = templates.find(t => t.key === templateKey);
    return template ? template.name : 'Unknown Template';
};

const columns: GridColDef[] = [
    { field: 'legalName', headerName: 'Name', width: 300 },
    { field: 'isActive', headerName: 'Active', valueFormatter: (value) => value ? "Yes" : "No", cellClassName: (params) => params.value ? styles.green : styles.red },
    { field: 'isExistingClient', headerName: 'Existing Client', valueFormatter: (value) => value ? "Yes" : "No", cellClassName: (params) => params.value ? styles.green : styles.red },
    {
        field: 'addedDate',
        headerName: 'Added Date',
        type: 'date', // or 'dateTime' if you prefer
        width: 160,
        valueGetter: (_, row) =>
            row.addedDate ? new Date(row.addedDate) : null,
      },
    {
        field: 'checkingAccount',
        valueGetter: (_, row) => row.financials?.checkingAccount,
        headerName: 'Checking Account',
        type: 'number',
        width: 180,
        valueFormatter: (value) => currencyFormatter(value),
    },
    {
        field: 'longTermInvestments',
        headerName: 'Long Term Investments',
        valueGetter: (_, row) => row.financials?.longTermInvestments,
        type: 'number',
        width: 220,
        valueFormatter: (value) => currencyFormatter(value),
    },
    {
        field: 'totalInvestments',
        headerName: 'Total Investments',
        valueGetter: (_, row) => row.financials?.totalInvestments,
        type: 'number',
        width: 200,
        valueFormatter: (value) => currencyFormatter(value),
    },
    {
        field: 'loans',
        headerName: 'Loans',
        type: 'number',
        valueGetter: (_, row) => row.financials?.loans,
        width: 130,
        valueFormatter: (value) => currencyFormatter(value),
    },
    {
        field: 'totalDonations',
        headerName: 'Total Donations',
        valueGetter: (_, row) => row.financials?.totalDonations,
        type: 'number',
        width: 160,
        valueFormatter: (value) => currencyFormatter(value),
    },
    {
        field: 'totalRevenue',
        headerName: 'Total Revenue',
        valueGetter: (_, row) => row.financials?.totalRevenue,
        type: 'number',
        width: 200,
        valueFormatter: (value) => currencyFormatter(value),
    },
    {
        field: 'physicalAssets',
        headerName: 'Physical Assets',
        valueGetter: (_, row) => row.financials?.physicalAssets,
        type: 'number',
        width: 200,
        valueFormatter: (value) => currencyFormatter(value),
    },
    {
        field: 'numContacts',
        headerName: 'Contacts',
        renderCell: (params) => (
            <Box component="div" sx={{ display: 'flex', justifyContent: "center" }}>
                {params.value}
            </Box>
        ),
    },
    {
        field: 'latestEmailDatetime',
        headerName: 'Latest Email Date',
        type: 'dateTime',
        valueGetter: (_, row) =>
            row.latestEmailDatetime ? new Date(row.latestEmailDatetime) : null,
        width: 200,
    },
    {
        field: 'latestEmailTemplate',
        headerName: 'Latest Email Template',
        valueGetter: (_, row) => getTemplateName(row.latestEmailTemplate), // Map template key to name
        width: 200,
    },
];

const CompanyTable: React.FC<CompanyTableProps> = ({ rows, loading }) => {
    const navigate = useNavigate();
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
            slots={{ toolbar: GridToolbar, loadingOverlay: TableSkeleton }}
            onRowClick={(row) => navigate(`company/${row.id}`)}
            loading={loading}
            slotProps={{
                toolbar: {
                    showQuickFilter: true,
                    style: { paddingTop: ".25rem", },
                },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            sx={{
                marginY: 2,
                boxShadow: 2,
                '& .MuiDataGrid-cell:hover': {
                    color: 'primary.main',
                    cursor: 'pointer'
                },
                minHeight: '500px'
            }}
        />
    );
};

export default CompanyTable;