import React, { useMemo, useState } from 'react';
import { CompanyFinancials } from '../../models/company/company';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { visuallyHidden } from '@mui/utils';
import TableSortLabel from '@mui/material/TableSortLabel';
import { format } from 'd3-format';
import Box from '@mui/material/Box';

interface CompanyFinancialsDisplayProps {
  financials: CompanyFinancials;
}

const comparator = (a: number, b: number, dir: 'asc' | 'desc' | undefined) => {
  if (!dir) return 0;
  if (dir === 'asc') return a > b ? 1 : -1;
  return a > b ? -1 : 1
}

const formatTicks = (value: any, _:any) => {
  if (value >= 1_000_000) {
    return format('.1s')(value / 1_000_000) + 'M'; // Format as millions
  } else if (value >= 1_000) {
    return format('.1s')(value / 1_000) + 'K'; // Format as thousands
  }
  return value;
};

const CompanyFinancialsDisplay: React.FC<CompanyFinancialsDisplayProps> = ({ financials }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(undefined)
  const pieData = useMemo(() => {
    const expenses = financials.professionalFees + financials.loans + financials.interestAndBankingFees
    const charity = financials.totalDonations
    const assets = financials.totalRevenue
    const data = [expenses, charity, assets, financials.longTermInvestments]
    const labels = ['Expenses', 'Charity', 'Revenue', "LTI"]
    return data.map((d, i) => ({ id: i, value: d, label: labels[i] }))
  }, [financials])
  const barData = useMemo(() => {
    return [
      {label: 'Investments', data: financials.totalInvestments}, 
      {label: 'Revenue', data: financials.totalRevenue}, 
      {label: 'Expenses', data: financials.totalExpenses},
      {label: 'Other', data: financials.others}
    ].filter(d => d.data).sort((a, b) => b.data! > a.data! ? 1 : -1).slice()
  }, [financials])
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Financial Overview
            </Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: barData.map(b => b.label)}]}
              yAxis={[{id: "y-axis", valueFormatter: formatTicks}]}
              series={[{ data: barData.map(b => b.data), valueFormatter: (value) => `$${formatTicks(value, null)}` }]}
              height={300}
              sx={{ width: '100%' }}
            />
            <PieChart
              sx={{ width: '100%' }}
              series={[
                {
                  data: pieData,
                  valueFormatter: (value) => `$${value.value}`
                },
              ]}
              height={200}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Financial Details
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell align='right'>
                      <TableSortLabel
                        active={sortOrder !== undefined}
                        direction={sortOrder}
                        onClick={() => setSortOrder(o => o === undefined ? 'asc' : o === 'asc' ? "desc" : undefined)}
                      >
                        Amount
                        <Box component="span" sx={visuallyHidden}>
                          {sortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(financials).filter(([key, _]: any) => key !== "timestamp").sort((a, b) => comparator(a[1], b[1], sortOrder)).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</TableCell>
                      <TableCell align="right">{value ? `$${value}` : "N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography sx={{paddingTop: 1, fontSize: 12}}>Last Update: {financials.timestamp}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CompanyFinancialsDisplay;
