import React, { useCallback } from 'react';
import {
  DataGrid,
  GridColDef,
  GridToolbar
} from '@mui/x-data-grid';
import currencyFormatter from '../../utils/currency';
import BaseCompany from "../../models/company/company";
import TableSkeleton from '../common/TableSkeleton';
import { useNavigate } from 'react-router';
import styles from './dashboard.module.scss';
import { templates } from '../company/email/templateOptions';
import { updateCompanyDetails, deleteCompany } from '../../api/company';



type CompanyTableProps = {
  rows: BaseCompany[];
  loading: boolean;
};

interface Contact {
  phoneNumber: string | null;
  email: string;
}

  
/** Map template key -> name, or 'Unknown' */
function getTemplateName(templateKey: string) {
  const template = templates.find(t => t.key === templateKey);
  return template ? template.name : 'Unknown Template';
}

const handleDelete = async (id: string) => {
    try {
      await deleteCompany(id);
      // Optionally refetch rows or remove the deleted row from local state
      // e.g. setRows((prev) => prev.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Failed to delete company:', error);
      // show a notification or handle error
    }
  };

/** Builds the nested columns. They reference row.financials for the financial fields. */
function useColumns(navigate: ReturnType<typeof useNavigate>): GridColDef[] {
  return [
    {
      field: 'details',
      headerName: 'Details',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <button
          onClick={() => navigate(`company/${params.row.id}`)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#1976d2',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          View
        </button>
      ),
    },
    {
      field: 'legalName',
      headerName: 'Name',
      width: 300,
      editable: true,
    },
    {
      field: 'isActive',
      headerName: 'Active',
      editable: true,
      valueFormatter: (value) => (value ? "Yes" : "No"),
      cellClassName: (params) => (params.value ? styles.green : styles.red),
    },
    {
      field: 'isExistingClient',
      headerName: 'Existing Client',
      editable: true,
      valueFormatter: (value) => (value ? "Yes" : "No"),
      cellClassName: (params) => (params.value ? styles.green : styles.red),
    },
    {
      field: 'addedDate',
      headerName: 'Added Date',
      type: 'date',
      width: 160,
      editable: true,
      // Convert to Date if it's a string. (Uses the new 4-arg signature in v7.)
      // But you can also do (value, row) => row.addedDate ? new Date(row.addedDate) : null
      valueGetter: (_, row) => {
        return row.addedDate ? new Date(row.addedDate) : null;
      },
    },
    // ---- Financial fields, reading/writing from row.financials ----
    {
      field: 'checkingAccount',
      headerName: 'Checking Account',
      type: 'number',
      width: 180,
      editable: true,
      valueGetter: (_, row) => row.financials?.checkingAccount ?? null,
      valueSetter: (newValue, row) => ({
        ...row,
        financials: {
          ...row.financials,
          checkingAccount: newValue,
        },
      }),
      valueFormatter: (val) => (val == null ? '' : currencyFormatter(val)),
    },
    {
      field: 'longTermInvestments',
      headerName: 'Long Term Investments',
      type: 'number',
      width: 220,
      editable: true,
      valueGetter: (_, row) => row.financials?.longTermInvestments ?? null,
      valueSetter: (newValue, row) => ({
        ...row,
        financials: {
          ...row.financials,
          longTermInvestments: newValue,
        },
      }),
      valueFormatter: (val) => (val == null ? '' : currencyFormatter(val)),
    },
    {
      field: 'totalInvestments',
      headerName: 'Total Investments',
      type: 'number',
      width: 200,
      editable: false,
      valueGetter: (_, row) => {
        const checking = row.financials?.checkingAccount ?? 0;
        const lti = row.financials?.longTermInvestments ?? 0;
        return checking + lti;
      },
      valueFormatter: (val) => (val == null ? '' : currencyFormatter(val)),
    },
    {
      field: 'loans',
      headerName: 'Loans',
      type: 'number',
      width: 130,
      editable: true,
      valueGetter: (_, row) => row.financials?.loans ?? null,
      valueSetter: (newValue, row) => ({
        ...row,
        financials: {
          ...row.financials,
          loans: newValue,
        },
      }),
      valueFormatter: (val) => (val == null ? '' : currencyFormatter(val)),
    },
    {
      field: 'physicalAssets',
      headerName: 'Physical Assets',
      type: 'number',
      width: 200,
      editable: true,
      valueGetter: (_, row) => row.financials?.physicalAssets ?? null,
      valueSetter: (newValue, row) => ({
        ...row,
        financials: {
          ...row.financials,
          physicalAssets: newValue,
        },
      }),
      valueFormatter: (val) => (val == null ? '' : currencyFormatter(val)),
    },
    {
      field: 'contacts',
      headerName: 'Contact',
      valueGetter: (_, row) => row.contactName ?? null,
    },
    {
      field: 'contactInfo',
      headerName: 'Contacts Info',
      width: 320,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const contacts = params.row.contacts || [];
        const validContacts = contacts.filter(
          (c: Contact) => c.phoneNumber || c.email
        );

        if (validContacts.length === 0) return 'N/A';

        return (
          <div
            style={{
              maxHeight: '5.5em',
              overflowY: 'auto',
              fontSize: '0.75rem',
              padding: '4px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              backgroundColor: '#f9f9f9',
              width: '100%',
              lineHeight: '1.4',
            }}
          >
          {validContacts.map((c: Contact, idx: number) => (
            <div key={idx} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {c.phoneNumber ?? '—'}, {c.email ?? '—'}
            </div>
          ))}
          </div>
        );
      },
    }
,
    {
      field: 'latestEmailDatetime',
      headerName: 'Latest Email Date',
      type: 'dateTime',
      width: 200,
      editable: true,
      valueGetter: (_, row) =>
        row.latestEmailDatetime ? new Date(row.latestEmailDatetime) : null,
    },
    {
      field: 'latestEmailTemplate',
      headerName: 'Latest Email Template',
      width: 200,
      editable: true,
      valueGetter: (_, row) => getTemplateName(row.latestEmailTemplate) ?? null,
    },
    {
        field: 'delete',
        headerName: 'Delete',
        width: 100,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <button
            style={{ backgroundColor: 'red', color: '#fff', border: 'none', cursor: 'pointer' }}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </button>
        ),
      },
  ];
}

const CompanyTable: React.FC<CompanyTableProps> = ({ rows, loading }) => {
  const navigate = useNavigate();
  const columns = useColumns(navigate);

  // If each row has `_id`, you can do:
  // getRowId={(row) => row._id}
  // or if each row has row.id, no need to define getRowId.
  // Just ensure the "id" property actually exists for each row object.
  
  const handleProcessRowUpdate = useCallback(
    async (newRow: BaseCompany, oldRow: BaseCompany) => {
      console.log('handleProcessRowUpdate triggered:', { oldRow, newRow });

      if (newRow === oldRow) {
        return oldRow;
      }

      const payload: any = {};

      // 1) Compare top-level fields
      if (newRow.legalName !== oldRow.legalName) {
        payload.legalName = newRow.legalName;
      }
      if (newRow.isActive !== oldRow.isActive) {
        payload.isActive = newRow.isActive;
      }
      if (newRow.isExistingClient !== oldRow.isExistingClient) {
        payload.isExistingClient = newRow.isExistingClient;
      }
      if (newRow.addedDate !== oldRow.addedDate) {
        payload.addedDate = newRow.addedDate;
      }
      if (newRow.numContacts !== oldRow.numContacts) {
        payload.numContacts = newRow.numContacts;
      }
      if (newRow.latestEmailDatetime !== oldRow.latestEmailDatetime) {
        payload.latestEmailDatetime = newRow.latestEmailDatetime;
      }
      if (newRow.latestEmailTemplate !== oldRow.latestEmailTemplate) {
        payload.latestEmailTemplate = newRow.latestEmailTemplate;
      }

      // 2) Compare nested "financials" fields
      // if newRow.financials doesn't exist, the valueSetter won't have created it
      // but typically it should exist if it was in the original data
      if (newRow.financials && oldRow.financials) {
        const financialFields = [
          'checkingAccount',
          'longTermInvestments',
          'totalInvestments',
          'loans',
          'totalDonations',
          'totalRevenue',
          'physicalAssets',
        ] as const;

        for (const field of financialFields) {
          if (newRow.financials[field] !== oldRow.financials[field]) {
            // We only create payload.financials if something changed
            if (!payload.financials) payload.financials = {};
            payload.financials[field] = newRow.financials[field];
          }
        }
      }

      console.log('Submitting PATCH with payload:', payload);

      try {
        // The "id" might be either newRow.id or newRow._id, depending on your data shape
        // Make sure you're referencing the correct property
        await updateCompanyDetails(String(newRow.id), payload);
        return newRow; // Return the updated row so the Data Grid doesn't revert
      } catch (error) {
        console.error('Failed to update company:', error);
        throw error; // Tells the grid to revert to oldRow
      }
    },
    []
  );

  const handleProcessRowUpdateError = useCallback((error: any) => {
    console.error('Error in processRowUpdate:', error);
  }, []);
  return (
    <DataGrid
      // If your row has 'id' as the unique key, no need for getRowId.
      // If you only have '_id', do: getRowId={(row) => row._id}
      rows={rows}
      columns={columns}
      loading={loading}
      editMode="cell"
      processRowUpdate={handleProcessRowUpdate}
      onProcessRowUpdateError={handleProcessRowUpdateError}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      slots={{ toolbar: GridToolbar, loadingOverlay: TableSkeleton }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          style: { paddingTop: ".25rem" },
        },
      }}
      pageSizeOptions={[10, 25, 50, 100]}
      sx={{
        marginY: 2,
        boxShadow: 2,
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
          cursor: 'pointer',
        },
        minHeight: '500px',
      }}
    />
  );
};

export default CompanyTable;