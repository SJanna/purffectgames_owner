import React from 'react'
import PageTitle from '@/components/ClientsPage/PageTitle';
import ClientsTable from '@/components/ClientsPage/ClientsTable/ClientsTable';
import { Box } from '@mui/material';

export default function Clients() {
  return (
    <Box>
      <PageTitle />
      <ClientsTable />
    </Box>
  )
}
