import React, { useEffect } from 'react';
import { useListLogs, useListRequests } from '../api/hooks/mutations';
import RequestsTable from '../components/LogsTable';
import { Box } from '@mui/material';
import LogsTable from '../components/LogsTable';

function Logs() {
  const { listLogs, data } = useListLogs();

  useEffect(() => {
    listLogs({ page: 1, itemsPerpage: 5 });
  }, [listLogs]); // Add listRequests to dependencies

  useEffect(() => {
    console.log('API Response:', data);
  }, [data]); // Log whenever data updates

  return <>
  <Box sx={{width:'100%', mt:'40px',display:'flex',justifyContent:'center'}}>
  <Box sx={{width:'96%'}}>


  <LogsTable  data={data}/>
  </Box>
  </Box>
  
  </>;
}

export default Logs;
