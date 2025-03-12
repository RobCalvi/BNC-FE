// CompanyPage.tsx
import React, { useState } from 'react'
import { useParams } from 'react-router'
import useFetch from '../../hooks/useFetch'
import Company from '../../models/company/company'
import { BASE_URL } from '../../environment'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import CompanyFinancialsDisplay from './CompanyFinancialsDisplay'
import Box from '@mui/material/Box'
import CompanyContacts from './contact/CompanyContacts'
import CompanyNews from './news/CompanyNews'
import CompanyActions from './actions/CompanyActions'
import CompanyDetails from './CompanyDetails'
import EmailList from './email/EmailList'
import { useSearchParams } from 'react-router-dom'
import Action from '../../models/actions/action'
import Contact from '../../models/contact/contact'


const tabs = ["Financials", "Contacts", "Actions", "News", "Details", "Emails"]

const CompanyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error, setData: setCompany } = useFetch<Company>({
    url: BASE_URL + `/companies/${id}`
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const [tab, setTab] = useState<number>(searchParams.get('tab') ? Number(searchParams.get('tab')) : 0)
  const handleTabChange = (_: React.SyntheticEvent, newTab: number) => {
    setTab(newTab)
    setSearchParams({ tab: String(newTab) })
  }
  const handleUpdateCompany = (newCompany: Company) => setCompany(newCompany)
  //@ts-ignore
  const handleUpdateActions = (newActionState: Action[]) => setCompany(c => ({ ...c, actions: newActionState }))
  //@ts-ignore
  const handleUpdateContacts = (newContactState: Contact[]) => setCompany(c => ({ ...c, contacts: newContactState }))

  if (loading || error || !data) return (
    <Box component="div" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginY: 10 }}>
      {loading ? <CircularProgress /> : error ? <Alert severity="error">{error?.message}</Alert> : <Typography>No data to display.</Typography>}
    </Box>
  )
  return (
    <Box component="div" sx={{ maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant='h3' sx={{ textAlign: 'center' }}>{data.legalName}</Typography>
      <Box component="div" sx={{ paddingBottom: 2, textAlign: 'center' }}>
        <Typography>{data.description}</Typography>
      </Box>
      <Tabs
        id="data-tabs"
        value={tab}
        onChange={handleTabChange}
        sx={{ marginTop: 3, marginBottom: 3 }}
      >
        {tabs.map((tab, i) => <Tab label={tab} key={i} />)}
      </Tabs>
      {tab === 0 && <CompanyFinancialsDisplay financials={data.financials} />}
      {tab === 1 && <CompanyContacts id={id!} contacts={data.contacts} handleUpdate={handleUpdateContacts} />}
      {tab === 2 && <CompanyActions actions={data.actions} handleUpdate={handleUpdateActions} />}
      {tab === 3 && <CompanyNews news={data.news} />}
      {tab === 4 && (
        <CompanyDetails
          id={id!}
          name={data.legalName}
          email={data.companyEmail}
          phoneNumber={data.companyPhoneNumber}
          website={data.companyWebsite}
          description={data.description}
          streetAddress={data.streetAddress}
          city={data.city}
          stateOrProvince={data.stateOrProvince}
          postalCode={data.postalCode}
          handleUpdate={handleUpdateCompany}
        />
      )}
      {tab === 5 && <EmailList companyId={id!} contacts={data.contacts} financials={data.financials} companyName={data.legalName} />}
    </Box>
  )
}

export default CompanyPage
