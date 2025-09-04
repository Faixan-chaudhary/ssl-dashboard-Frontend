import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Typography, Chip, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
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
import { FiDownload, FiRefreshCw, FiPlus, FiShield, FiGlobe } from "react-icons/fi";

const TableContainer = styled(Box)({
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  margin: "16px 0",
  width: "100%",
});

const ActionButtonsContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "24px 32px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)",
});

const ActionButton = styled(motion.button)({
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  color: "white",
  border: "none",
  borderRadius: "12px",
  padding: "12px 24px",
  fontSize: "0.9rem",
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
  }
});

const SecondaryButton = styled(motion.button)({
  background: "rgba(255, 255, 255, 0.9)",
  color: "#667eea",
  border: "2px solid #667eea",
  borderRadius: "12px",
  padding: "12px 24px",
  fontSize: "0.9rem",
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "#667eea",
    color: "white",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
  }
});

const StatusChip = styled(Chip)(({ status }) => ({
  background: status === 'Expired' 
    ? "linear-gradient(135deg, #ff4757, #ff3742)"
    : status === 'Near to Expire'
    ? "linear-gradient(135deg, #ff9500, #ff6b35)"
    : "linear-gradient(135deg, #2ed573, #1e90ff)",
  color: "white",
  fontWeight: 700,
  fontSize: "0.7rem",
  height: "20px",
  border: "none",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  "& .MuiChip-label": {
    padding: "0 8px",
    letterSpacing: "0.3px",
  }
}));

const DaysDisplay = styled(Typography)({
  color: "#374151",
  fontWeight: 600,
  fontSize: "0.85rem",
  background: "rgba(255, 255, 255, 0.9)",
  padding: "6px 12px",
  borderRadius: "8px",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(4px)",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  minWidth: "70px",
  textAlign: "center",
  letterSpacing: "0.2px",
});

const StatusContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4px 0",
  height: "100%",
  width: "100%"
});

const StyledDataGrid = styled(DataGrid)({
  border: "none",
  width: "100%",
  "& .MuiDataGrid-columnHeaders": {
    background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
    borderBottom: "2px solid #e2e8f0",
    width: "100%",
    "& .MuiDataGrid-columnHeader": {
      borderRight: "1px solid #e2e8f0",
      "&:last-child": {
        borderRight: "none",
      },
      "& .MuiDataGrid-columnHeaderTitle": {
        fontWeight: 700,
        fontSize: "0.8rem",
        color: "#1a202c",
        letterSpacing: "0.1px",
        textAlign: "center",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        lineHeight: "1.2",
        padding: "0 4px"
      },
      "& .MuiDataGrid-columnHeaderTitleContainer": {
        justifyContent: "center",
        width: "100%"
      }
    }
  },
  "& .MuiDataGrid-row": {
    borderBottom: "1px solid #f1f5f9",
    "&:hover": {
      background: "rgba(102, 126, 234, 0.05)",
    },
    "&.row-red": {
      background: "linear-gradient(135deg, rgba(255, 71, 87, 0.12), rgba(255, 55, 66, 0.12))",
      borderLeft: "4px solid #ff4757",
      "&:hover": {
        background: "linear-gradient(135deg, rgba(255, 71, 87, 0.18), rgba(255, 55, 66, 0.18))",
      }
    },
    "&.row-orange": {
      background: "linear-gradient(135deg, rgba(255, 149, 0, 0.12), rgba(255, 107, 53, 0.12))",
      borderLeft: "4px solid #ff9500",
      "&:hover": {
        background: "linear-gradient(135deg, rgba(255, 149, 0, 0.18), rgba(255, 107, 53, 0.18))",
      }
    },
    "&.row-green": {
      background: "linear-gradient(135deg, rgba(46, 213, 115, 0.12), rgba(30, 144, 255, 0.12))",
      borderLeft: "4px solid #2ed573",
      "&:hover": {
        background: "linear-gradient(135deg, rgba(46, 213, 115, 0.18), rgba(30, 144, 255, 0.18))",
      }
    }
  },
  "& .MuiDataGrid-cell": {
    borderRight: "1px solid #f1f5f9",
    padding: "8px 12px",
    fontSize: "0.8rem",
    color: "#374151",
    fontWeight: 500,
    minWidth: "120px",
    "&:last-child": {
      borderRight: "none",
      paddingRight: "16px",
    },
    "&:focus": {
      outline: "none",
    }
  },
  "& .MuiDataGrid-cell:first-of-type": {
    paddingLeft: "20px",
  },
  "& .MuiDataGrid-cell:last-of-type": {
    paddingRight: "20px",
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "2px solid #e2e8f0",
    background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
    overflow: "hidden !important",
    "& *": {
      scrollbarWidth: "none !important",
      msOverflowStyle: "none !important",
      "&::-webkit-scrollbar": {
        display: "none !important",
        width: "0 !important",
        height: "0 !important",
      }
    }
  },
  "& .MuiDataGrid-selectedRowCount": {
    visibility: "hidden",
  },
  "& .MuiTablePagination-root": {
    overflow: "hidden !important",
    "& *": {
      scrollbarWidth: "none !important",
      msOverflowStyle: "none !important",
      "&::-webkit-scrollbar": {
        display: "none !important",
        width: "0 !important",
        height: "0 !important",
      }
    }
  }
});

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
      <IconButton 
        onClick={handleClick}
        sx={{
          color: "#667eea",
          "&:hover": {
            background: "rgba(102, 126, 234, 0.1)",
          }
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)} 
        onClose={handleClose}
        PaperProps={{
          sx: {
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            minWidth: "200px",
          }
        }}
      >
        {Cookies.get("userType")?.toLowerCase() === "admin" ? (
          <>
            <MenuItem onClick={handleEdit} sx={{ color: "#667eea", fontWeight: 500 }}>
              Renew {label} Expiry
            </MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color: "#ef4444", fontWeight: 500 }}>
              Delete
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleOpen} sx={{ color: "#667eea", fontWeight: 500 }}>
            Request {label} Expiry Renewal
          </MenuItem>
        )}
      </Menu>

      <Dialog 
        open={openConfirmation} 
        onClose={handleCloseConfirmation}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }
        }}
      >
        <DialogTitle sx={{ color: "#1a202c", fontWeight: 600 }}>
          Renew {label} Certificate
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#64748b" }}>
            Are you sure you want to renew the {label.toLowerCase()} certificate?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "16px 24px" }}>
          <Button 
            onClick={handleCloseConfirmation} 
            sx={{ 
              color: "#64748b",
              fontWeight: 500,
              "&:hover": {
                background: "rgba(100, 116, 139, 0.1)",
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            sx={{ 
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              color: "white",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(135deg, #5a6fd8, #6a4190)",
              }
            }}
            variant="contained"
          >
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
    certificate_type: item.certificate_type,
    pricing_usd: item.pricing_usd,
    no_of_days: item.no_of_days,
    start_date: item.start_date,
    expiry_date: item.expiry_date,
    registered_by: item.user,
    authority: item.authority,
    notes: item.notes,
    duration: item.duration,
    vendor: item.vendor,
    po_status: item.po_status,
    _realId: item._id,
  }));

const formatDomainRows = (data) =>
  data?.map((item, idx) => ({
    id: idx + 1,
    domain: item.domain,
    no_of_days: item.no_of_days,
    start_date: new Date(item.start_date).toLocaleDateString(),
    expiry_date: item.expiry_date ? new Date(item.expiry_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
    registered_by: item.user,
    authority: item.authority,
    notes: item.notes,
    duration: item.duration,
    vendor: item.vendor,
    certificate_type: item.certificate_type,
    pricing_usd: item.pricing_usd,
    _realId: item._id,
  }));

function getStatusAndColor(days) {
  if (days <= 0) return { status: 'Expired', color: { fill: { fgColor: { rgb: 'FFF8D7DA' } } } };
  if (days < 60) return { status: 'Near to Expire', color: { fill: { fgColor: { rgb: 'FFFFF3CD' } } } };
  return { status: 'Safe Zone', color: { fill: { fgColor: { rgb: 'FFD4EDDA' } } } };
}

const sslColumns = (setOpen, setEdit, setId, id, label) => [
  { 
    field: "id", 
    headerName: "ID", 
    width: 70,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ fontWeight: 600, color: '#1a202c' }}>
          {params.value}
        </Typography>
      </Box>
    )
  },
  { 
    field: "ssl", 
    headerName: "SSL Common Name", 
    width: 200,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ fontWeight: 600, color: '#1a202c' }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: "certificate_type", 
    headerName: "Certificate Type", 
    width: 180,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#374151' }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: "pricing_usd", 
    headerName: "Pricing USD", 
    width: 120,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#374151' }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: "no_of_days", 
    headerName: "No. of Days (From Expiry Date)", 
    width: 180,
    renderCell: (params) => {
      const days = Number(params.value);
      const isExpired = days <= 0;
      const isNearExpire = days > 0 && days <= 30;
      const isSafe = days > 30;
      
      return (
        <StatusContainer>
          <DaysDisplay
            sx={{
              color: isExpired ? "#dc2626" : isNearExpire ? "#ea580c" : "#059669",
              fontWeight: isExpired ? 700 : 600,
              background: isExpired 
                ? "rgba(220, 38, 38, 0.15)" 
                : isNearExpire 
                ? "rgba(234, 88, 12, 0.15)" 
                : "rgba(5, 150, 105, 0.15)",
              border: isExpired 
                ? "1px solid rgba(220, 38, 38, 0.25)" 
                : isNearExpire 
                ? "1px solid rgba(234, 88, 12, 0.25)" 
                : "1px solid rgba(5, 150, 105, 0.25)",
            }}
          >
            {Math.floor(days)} days
          </DaysDisplay>
        </StatusContainer>
      );
    }
  },
  { 
    field: "start_date", 
    headerName: "Renew Date", 
    width: 150, 
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#374151', fontSize: '0.8rem' }}>
          {params.value ? new Date(params.value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
        </Typography>
      </Box>
    )
  },
  { 
    field: "expiry_date", 
    headerName: "Expiry Date", 
    width: 150, 
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#374151', fontSize: '0.8rem' }}>
          {params.value ? new Date(params.value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
        </Typography>
      </Box>
    )
  },
  {
    field: "registered_by",
    headerName: "Registered / Renew By",
    width: 200,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#374151' }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: "authority", 
    headerName: "Authority", 
    width: 150,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#374151' }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: "notes", 
    headerName: "Notes", 
    width: 250,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#374151' }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: "duration_1", 
    headerName: "1 Year", 
    width: 80, 
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#059669', fontWeight: 600, fontSize: '1.2rem' }}>
          {Array.isArray(params.row.duration) ? params.row.duration.includes(1) ? '✓' : '' : params.row.duration === 1 ? '✓' : ''}
        </Typography>
      </Box>
    )
  },
  { 
    field: "duration_2", 
    headerName: "2 Years", 
    width: 80, 
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#059669', fontWeight: 600, fontSize: '1.2rem' }}>
          {Array.isArray(params.row.duration) ? params.row.duration.includes(2) ? '✓' : '' : params.row.duration === 2 ? '✓' : ''}
        </Typography>
      </Box>
    )
  },
  { 
    field: "duration_3", 
    headerName: "3 Years", 
    width: 80, 
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#059669', fontWeight: 600, fontSize: '1.2rem' }}>
          {Array.isArray(params.row.duration) ? params.row.duration.includes(3) ? '✓' : '' : params.row.duration === 3 ? '✓' : ''}
        </Typography>
      </Box>
    )
  },
  { 
    field: "vendor", 
    headerName: "Vendor", 
    width: 150,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#374151' }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: "po_status", 
    headerName: "PO Status", 
    width: 130,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#374151' }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    flex: 0,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <ActionsMenu
          row={{...params.row, id: params.row._realId}}
          setId={setId}
          id={id}
          setEdit={setEdit}
          setOpen={setOpen}
          label={label}
        />
      </Box>
    ),
  },
];

const domainColumns = (setOpen, setEdit, setId, id, label) => [
  { 
    field: "id", 
    headerName: "ID", 
    width: 70,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ fontWeight: 600, color: '#1a202c' }}>
          {params.value}
        </Typography>
      </Box>
    )
  },
  { 
    field: "domain", 
    headerName: `${label} Name`, 
    width: 200,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ fontWeight: 600, color: '#1a202c' }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: "certificate_type", 
    headerName: "TLD (Top Level Domain)", 
    width: 180,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#374151' }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: "pricing_usd", 
    headerName: "Pricing USD", 
    width: 120,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#374151' }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: "no_of_days", 
    headerName: "No. of Days", 
    width: 150,
    renderCell: (params) => {
      const days = Number(params.value);
      const isExpired = days <= 0;
      const isNearExpire = days > 0 && days <= 30;
      const isSafe = days > 30;
      
      return (
        <StatusContainer>
          <DaysDisplay
            sx={{
              color: isExpired ? "#dc2626" : isNearExpire ? "#ea580c" : "#059669",
              fontWeight: isExpired ? 700 : 600,
              background: isExpired 
                ? "rgba(220, 38, 38, 0.15)" 
                : isNearExpire 
                ? "rgba(234, 88, 12, 0.15)" 
                : "rgba(5, 150, 105, 0.15)",
              border: isExpired 
                ? "1px solid rgba(220, 38, 38, 0.25)" 
                : isNearExpire 
                ? "1px solid rgba(234, 88, 12, 0.25)" 
                : "1px solid rgba(5, 150, 105, 0.25)",
            }}
          >
            {Math.floor(days)} days
          </DaysDisplay>
        </StatusContainer>
      );
    }
  },
  { 
    field: "start_date", 
    headerName: "Start Date", 
    width: 150,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#374151', fontSize: '0.8rem' }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: "expiry_date", 
    headerName: "Expiry Date", 
    width: 150,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#374151', fontSize: '0.8rem' }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: "vendor", 
    headerName: "Vendor", 
    width: 150,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#374151' }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  {
    field: "registered_by",
    headerName: "Registered By",
    width: 200,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#374151' }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: "authority", 
    headerName: "Authority", 
    width: 150,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#374151' }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: "notes", 
    headerName: "Notes", 
    width: 250,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#374151' }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: "duration_1", 
    headerName: "1 Year", 
    width: 80, 
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#059669', fontWeight: 600, fontSize: '1.2rem' }}>
          {Array.isArray(params.row.duration) ? params.row.duration.includes(1) ? '✓' : '' : params.row.duration === 1 ? '✓' : ''}
        </Typography>
      </Box>
    )
  },
  { 
    field: "duration_2", 
    headerName: "2 Years", 
    width: 80, 
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#059669', fontWeight: 600, fontSize: '1.2rem' }}>
          {Array.isArray(params.row.duration) ? params.row.duration.includes(2) ? '✓' : '' : params.row.duration === 2 ? '✓' : ''}
        </Typography>
      </Box>
    )
  },
  { 
    field: "duration_3", 
    headerName: "3 Years", 
    width: 80, 
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ color: '#059669', fontWeight: 600, fontSize: '1.2rem' }}>
          {Array.isArray(params.row.duration) ? params.row.duration.includes(3) ? '✓' : '' : params.row.duration === 3 ? '✓' : ''}
        </Typography>
      </Box>
    )
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    flex: 0,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <ActionsMenu
          row={{...params.row, id: params.row._realId}}
          setId={setId}
          id={id}
          setEdit={setEdit}
          setOpen={setOpen}
          label={label}
        />
      </Box>
    ),
  },
];

export default function DataTable({ data, setOpen, setEdit, setId, id, onResetFilter }) {
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

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <TableContainer>
        <ActionButtonsContainer>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" sx={{ color: "#1a202c", fontWeight: 600 }}>
              {label} Certificates
            </Typography>
            <Chip 
              label={`${rows.length} Total`}
              size="small"
              sx={{ 
                background: "rgba(102, 126, 234, 0.1)",
                color: "#667eea",
                fontWeight: 600
              }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <ActionButton
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setOpen(true)}
            >
              <FiPlus size={16} style={{ color: "#fff" }} />
              Add {label}
            </ActionButton>

            <SecondaryButton
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleExport}
            >
              <FiDownload size={16} style={{ color: "#667eea" }} />
              Export
            </SecondaryButton>

            <SecondaryButton
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={onResetFilter}
            >
              <FiRefreshCw size={16} style={{ color: "#667eea" }} />
              Reset All
            </SecondaryButton>
          </Box>
        </ActionButtonsContainer>

        <Box sx={{ height: "600px", padding: "16px" }}>
          <StyledDataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            pageSizeOptions={[5, 10, 15, 20]}
            checkboxSelection
            getRowId={(row) => row._realId || row.id}
            onRowClick={(params) => setId(params.row.id)}
            getRowClassName={(params) => {
              const days = Number(params.row.no_of_days);
              if (days <= 0) return 'row-red';
              if (days < 60) return 'row-orange';
              return 'row-green';
            }}
            disableVirtualization={true}
            autoHeight={false}
            density="standard"
            sx={{
              border: "none",
              width: "100%",
              "& .MuiDataGrid-root": {
                border: "none",
                width: "100%",
              },
              "& .MuiDataGrid-main": {
                width: "100%",
              },
              "& .MuiDataGrid-virtualScroller": {
                overflow: "auto !important",
                width: "100%",
              },
              "& .MuiDataGrid-virtualScrollerContent": {
                overflow: "auto !important",
                width: "100%",
              },
              "& .MuiDataGrid-columnHeaders": {
                width: "100%",
                minHeight: "60px",
              },
              "& .MuiDataGrid-row": {
                width: "100%",
              },
              "& .MuiDataGrid-columnHeader": {
                minWidth: "120px",
                padding: "8px 4px",
              },
              "& .MuiDataGrid-cell": {
                minWidth: "120px",
                padding: "8px 4px",
              }
            }}
          />
        </Box>
      </TableContainer>
    </motion.div>
  );
}
