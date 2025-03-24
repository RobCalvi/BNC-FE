import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/redux/hooks'
import getDashboardEffect from '../../state/redux/effects/dashboardEffect';
import CompanyTable from './CompanyTable';
import CompanyDashboardTop from './CompanyDashboardTop';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CompanyDataUploadModal from './CompanyDataUploadModal';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { BaseCompany } from '../../models/company/company';
import CompanyAllRemindersModal from './CompanyAllRemindersModal'; // <-- New modal import

const CompanyDashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.dashboard.loading)
  const data = useAppSelector(state => state.dashboard.data)
  
  const [importOpen, setImportOpen] = useState<boolean>(false)
  // NEW: controls the “All Reminders” dialog
  const [allRemindersOpen, setAllRemindersOpen] = useState<boolean>(false);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getDashboardEffect())
    }
  }, [dispatch, data.length])

  return (
    <>
      {/* Pass callback so the “View All” button can open our reminders modal */}
      <CompanyDashboardTop 
        loading={loading} 
        onViewAllReminders={() => setAllRemindersOpen(true)} 
      />

      {
        loading ? <Skeleton sx={{ height: '50px', width: '100%' }} /> : (
          <Button 
            fullWidth 
            variant="outlined" 
            sx={{ marginTop: 2 }} 
            onClick={() => setImportOpen(true)}
          >
            <Box component="div" alignItems="center" display="flex" flexDirection="row">
              <CloudUploadIcon sx={{ marginRight: 1 }} />
              Import Data
            </Box>
          </Button>
        )
      }

      <CompanyTable loading={loading} rows={data as BaseCompany[]} />

      {/* The existing “Import Data” modal */}
      <CompanyDataUploadModal 
        open={importOpen} 
        handleClose={() => setImportOpen(false)} 
      />

      {/* NEW: Our All Reminders modal */}
      <CompanyAllRemindersModal
        open={allRemindersOpen}
        onClose={() => setAllRemindersOpen(false)}
      />
    </>
  )
}

export default CompanyDashboardPage;
