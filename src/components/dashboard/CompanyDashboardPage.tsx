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

const CompanyDashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.dashboard.loading)
  const data = useAppSelector(state => state.dashboard.data)
  const [importOpen, setImportOpen] = useState<boolean>(false)
  
  useEffect(() => {
    if (data.length === 0) {
      dispatch(getDashboardEffect())
    }
  }, [dispatch])
  return (
    <>
      <CompanyDashboardTop loading={loading} />
      {
        loading ? <Skeleton sx={{ height: '50px', width: '100%' }} /> : (
          <Button fullWidth variant="outlined" sx={{ marginTop: 2 }} onClick={() => setImportOpen(true)}>
            <Box component="div" alignItems="center" display="flex" flexDirection="row">
              <CloudUploadIcon sx={{ marginRight: 1 }} />
              Import Data
            </Box>
          </Button>
        )
      }
      <CompanyTable loading={loading} rows={data as BaseCompany[]} />
      <CompanyDataUploadModal open={importOpen} handleClose={() => setImportOpen(false)} />
    </>
  )
}

export default CompanyDashboardPage