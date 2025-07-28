import React, { useEffect } from 'react';
import { useListRequests } from '../api/hooks/mutations';
import RequestsTable from '../components/RequestsTable';
import { Box } from '@mui/material';
import FormDialog from '../components/Dialog';

function Requests() {
  const { listRequests, data } = useListRequests();
  const [id, setId] = React.useState(null);
  const [itemId, setItemId] = React.useState(null);
  const [userId,  setUserId] = React.useState(null)
    const [open, setOpen] = React.useState(false);
    const [category, setCategory] = React.useState()
    
  useEffect(() => {
    listRequests({ page: 1, itemsPerpage: 5 });
  }, [listRequests]); // Add listRequests to dependencies

  useEffect(() => {
    console.log('API Response:', data);
  }, [data,category,id, category]); // Log whenever data updates
console.log('ccccccccccccccccccccccccccccccc',category)
  return <>
  <Box sx={{width:'100%', mt:'40px',display:'flex',justifyContent:'center'}}>
  <Box sx={{width:'96%'}}>

  <FormDialog userId = {userId}  category={category} itemId={itemId} id={id} edit={true} setOpen={setOpen} open={open} />
  {data &&
  <RequestsTable setUserId={setUserId} setItemId={setItemId} setCategory={setCategory} setOpen={setOpen} id={id} setId={setId} data={data}/>
  }
  </Box>
  </Box>
  
  </>;
}

export default Requests;
