import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Cookies from 'js-cookie';
import { useRequestRenewSSL } from '../api/hooks/mutations';

const ActionsMenu = ({ row, setId, setOpen, setUserId, id, setCategory, setItemId }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { requestRenewSSL } = useRequestRenewSSL();
  const [openConfirmation, setOpenConfirmation] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    // setId(row.item_id);
    setId(row.item_id);
    setUserId(row.user_id._id);
    setCategory(row.category);
    setOpen(true);
    handleClose();
    setItemId(row._id)
  };

  const handleDelete = () => {
    console.log("Delete clicked for:", row);
    handleClose();
  };

  const handleOpen = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleConfirm = () => {
    console.log("SSL Certificate Renewal Confirmed");
    requestRenewSSL(id);
    handleClose();
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {Cookies.get("userType")?.toLowerCase() === "admin" ? (
          <>
            <MenuItem onClick={handleEdit}>Renew Expiry</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleOpen}>Request to Renew Expiry</MenuItem>
        )}
      </Menu>

      <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
        <DialogTitle>Renew SSL Certificate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to renew the SSL certificate?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const columns = ({ id, setUserId, setCategory, setId, setOpen, setItemId }) => [
  { field: '_id', headerName: 'Request ID', width: 250 },
  { field: 'name', headerName: 'Domain Name', width: 200 },
  { field: 'category', headerName: 'category', width: 150 },
  { 
    field: 'requested_by', 
    headerName: 'requested_by', 
    width: 180, 
    valueGetter: (params) => params?.row?.user_id?.username || "N/A"
  },
  { 
    field: 's_date', 
    headerName: 'start_date', 
    width: 150, 
    valueGetter: (params) => {
      console.log('params',params)
      return params;
      // return startDate ? new Date(startDate).toLocaleDateString() : "N/A";
    }
  },
  { 
    field: 'e_date', 
    headerName: 'expiry_date', 
    width: 150, 
    valueGetter: (params) => {
      return params;
      
    }
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params) => {
      let bgColor = '#ccc';
      if (params.row.status?.toLowerCase() === 'pending') bgColor = '#FBC02D';
      if (params.row.status?.toLowerCase() === 'approved') bgColor = '#43A047';
      if (params.row.status?.toLowerCase() === 'rejected') bgColor = '#E53935';

      return (
        <span
          style={{
            backgroundColor: bgColor,
            color: '#FFF',
            padding: '5px 10px',
            borderRadius: '5px',
            display: 'inline-block',
            width: '100%',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          {params.row.status}
        </span>
      );
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    renderCell: (params) => (
      <ActionsMenu
        row={params.row}
        setId={setId}
        setUserId={setUserId}
        setItemId={setItemId}
        setCategory={setCategory}
        id={id}
        setOpen={setOpen}
      />
    ),
  },
];



export default function RequestsTable({ setUserId, setOpen, setCategory, setItemId, data, id, setId }) {


  console.log('data4444444444444444444444444444444444444',data)
  return (
    <Paper sx={{ height: '100%', maxHeight: '100vh', width: '100%' }}>
      <DataGrid
        rows={data?.requestList || []}
        columns={columns({ id, setUserId, setCategory, setId, setOpen, setItemId })}
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
