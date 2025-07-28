import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button } from "@mui/material";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useRequestRenewSSL } from "../api/hooks/mutations";
import * as XLSX from 'xlsx';

const ActionsMenu = ({ row, setId, setOpen, setEdit, id, label }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const { requestRenewSSL } = useRequestRenewSSL();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setOpen(true);
    setEdit(true);
    setId(row.id);
    handleClose();
  };

  const handleDelete = () => {
    console.log("Delete clicked for:", row);
    handleClose();
  };

  const handleOpen = () => {
    setSelectedRow(row);
    setOpenConfirmation(true);
    handleClose();
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleConfirm = () => {
    console.log(`${label} Certificate Renewal Confirmed`, selectedRow);
    if (selectedRow) {
      requestRenewSSL(selectedRow);
    }
    setOpenConfirmation(false);
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {Cookies.get("userType")?.toLowerCase() === "admin" ? (
          <>
            <MenuItem onClick={handleEdit}>Renew {label} Expiry</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleOpen}>Request {label} Expiry Renewal</MenuItem>
        )}
      </Menu>

      <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
        <DialogTitle>Renew {label} Certificate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to renew the {label.toLowerCase()} certificate?
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

const formatSSLRows = (data) =>
  data?.map((item, idx) => ({
    id: idx + 1,
    ssl: item.ssl,
    no_of_days: item.no_of_days,
    start_date: new Date(item.start_date).toLocaleDateString(),
    expiry_date: new Date(item.expiry_date).toLocaleDateString(),
    registered_by: item.user,
    authority: item.authority,
    description: item.description,
    duration: item.duration,
    link: item.link,
    _realId: item._id,
  }));

const formatDomainRows = (data) =>
  data?.map((item, idx) => ({
    id: idx + 1,
    domain: item.domain,
    no_of_days: item.no_of_days,
    start_date: new Date(item.start_date).toLocaleDateString(),
    expiry_date: new Date(item.expiry_date).toLocaleDateString(),
    registered_by: item.user,
    authority: item.authority,
    description: item.description,
    duration: item.duration,
    link: item.link,
    _realId: item._id,
  }));

function getStatusAndColor(days) {
  if (days <= 0) return { status: 'Expired', color: { fill: { fgColor: { rgb: 'FFF8D7DA' } } } };
  if (days < 60) return { status: 'Near to Expire', color: { fill: { fgColor: { rgb: 'FFFFF3CD' } } } };
  return { status: 'Safe Zone', color: { fill: { fgColor: { rgb: 'FFD4EDDA' } } } };
}

const sslColumns = (setOpen, setEdit, setId, id, label) => [
  { field: "id", headerName: "ID", width: 70 },
  { field: "ssl", headerName: `${label} Name`, width: 200 },
  { field: "no_of_days", headerName: "No. of Days", width: 150 },
  { field: "start_date", headerName: "Start Date", width: 150 },
  { field: "expiry_date", headerName: "Expiry Date", width: 150 },
  { field: "link", headerName: "Link", width: 200, renderCell: (params) => params.value ? (<a href={params.value} target="_blank" rel="noopener noreferrer">{params.value}</a>) : "" },
  {
    field: "registered_by",
    headerName: "Registered By",
    width: 200,
  },
  { field: "authority", headerName: "Authority", width: 150 },
  { field: "description", headerName: "Description", width: 250 },
  { field: "duration_1", headerName: "1 Year", width: 80, renderCell: (params) => params.row.duration === 1 ? '✓' : '' },
  { field: "duration_2", headerName: "2 Years", width: 80, renderCell: (params) => params.row.duration === 2 ? '✓' : '' },
  { field: "duration_3", headerName: "3 Years", width: 80, renderCell: (params) => params.row.duration === 3 ? '✓' : '' },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    renderCell: (params) => (
      <ActionsMenu
        row={{...params.row, id: params.row._realId}}
        setId={setId}
        id={id}
        setEdit={setEdit}
        setOpen={setOpen}
        label={label}
      />
    ),
  },
];

const domainColumns = (setOpen, setEdit, setId, id, label) => [
  { field: "id", headerName: "ID", width: 70 },
  { field: "domain", headerName: `${label} Name`, width: 200 },
  { field: "no_of_days", headerName: "No. of Days", width: 150 },
  { field: "start_date", headerName: "Start Date", width: 150 },
  { field: "expiry_date", headerName: "Expiry Date", width: 150 },
  { field: "link", headerName: "Link", width: 200, renderCell: (params) => params.value ? (<a href={params.value} target="_blank" rel="noopener noreferrer">{params.value}</a>) : "" },
  {
    field: "registered_by",
    headerName: "Registered By",
    width: 200,
  },
  { field: "authority", headerName: "Authority", width: 150 },
  { field: "description", headerName: "Description", width: 250 },
  { field: "duration_1", headerName: "1 Year", width: 80, renderCell: (params) => params.row.duration === 1 ? '✓' : '' },
  { field: "duration_2", headerName: "2 Years", width: 80, renderCell: (params) => params.row.duration === 2 ? '✓' : '' },
  { field: "duration_3", headerName: "3 Years", width: 80, renderCell: (params) => params.row.duration === 3 ? '✓' : '' },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    renderCell: (params) => (
      <ActionsMenu
        row={{...params.row, id: params.row._realId}}
        setId={setId}
        id={id}
        setEdit={setEdit}
        setOpen={setOpen}
        label={label}
      />
    ),
  },
];

export default function DataTable({ data, setOpen, setEdit, setId, id }) {
  const location = useLocation();
  const isSSLPage = location.pathname === "/ssl";
  const isDomainPage = location.pathname === "/domains";

  if (!isSSLPage && !isDomainPage) return null;

  const label = isSSLPage ? "SSL" : "Domain";
  const rows = isSSLPage ? formatSSLRows(data) : formatDomainRows(data);
  const columns = isSSLPage
    ? sslColumns(setOpen, setEdit, setId, id, label)
    : domainColumns(setOpen, setEdit, setId, id, label);

  // Export to Excel handler
  const handleExport = () => {
    // Remove actions column for export
    const exportColumns = columns.filter(col => col.field !== 'actions');
    const exportRows = rows.map(row => {
      const newRow = {};
      exportColumns.forEach(col => {
        newRow[col.headerName] = row[col.field];
      });
      // Add status
      const days = Number(row.no_of_days);
      newRow['Status'] = getStatusAndColor(days).status;
      return newRow;
    });
    const worksheet = XLSX.utils.json_to_sheet(exportRows);

    // Add color to rows (using XLSX styles, supported in some viewers)
    exportRows.forEach((row, idx) => {
      const days = Number(rows[idx].no_of_days);
      const { color } = getStatusAndColor(days);
      const excelRow = idx + 2; // 1-based, +1 for header
      Object.keys(exportRows[idx]).forEach((col, colIdx) => {
        const cell = XLSX.utils.encode_cell({ r: excelRow - 1, c: colIdx });
        if (!worksheet[cell]) return;
        worksheet[cell].s = color;
      });
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, label + ' Table');
    XLSX.writeFile(workbook, `${label}_Table.xlsx`);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1, mr: 2 }}>
        <Button variant="contained" color="primary" onClick={handleExport}>
          Export
        </Button>
      </Box>
      <Paper
        sx={{
          height: "100%",
          boxShadow: "rgba(246, 151, 35, 0.2) 0px 2px 8px 4px",
          marginTop: "3vh",
          m: 2,
          width: "97%",
        }}
      >
        <DataGrid
          pageSize={10}
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 15, 20]}
          checkboxSelection
          onRowClick={(params) => setId(params.row.id)}
          getRowClassName={(params) => {
            const days = Number(params.row.no_of_days);
            if (days <= 0) return 'row-red';
            if (days < 60) return 'row-orange';
            return 'row-green';
          }}
          sx={{
            flexGrow: 1,
            overflow: "none",
            height: "100%",
            maxHeight: "60vh",
            border: 0,
            "& .MuiDataGrid-virtualScrollerContent::-webkit-scrollbar-track": {
              background: "white",
            },
            '& .row-red': {
              background: '#ff5252', // vivid red
              color: '#fff',
            },
            '& .row-orange': {
              background: '#ffe082', // more saturated light orange/yellow
              color: '#333',
            },
            '& .row-green': {
              background: '#a5d6a7', // more saturated light green
              color: '#333',
            },
          }}
        />
      </Paper>
    </Box>
  );
}
