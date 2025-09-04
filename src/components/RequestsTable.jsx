import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography, Chip } from '@mui/material';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import Cookies from 'js-cookie';
import { useRequestRenewSSL } from '../api/hooks/mutations';
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
  background: status === 'Pending' 
    ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
    : status === 'Approved'
    ? "linear-gradient(135deg, #10b981, #059669)"
    : "linear-gradient(135deg, #ef4444, #dc2626)",
  color: "white",
  fontWeight: 700,
  fontSize: "0.7rem",
  height: "24px",
  border: "none",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  "& .MuiChip-label": {
    padding: "0 8px",
    letterSpacing: "0.3px",
  }
}));

const CategoryChip = styled(Chip)(({ category }) => ({
  background: category === 'SSL' 
    ? "linear-gradient(135deg, #667eea, #764ba2)"
    : "linear-gradient(135deg, #10b981, #059669)",
  color: "white",
  fontWeight: 600,
  fontSize: "0.7rem",
  height: "20px",
  border: "none",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  "& .MuiChip-label": {
    padding: "0 6px",
    letterSpacing: "0.2px",
  }
}));

const StyledDataGrid = styled(DataGrid)({
  border: "none",
  "& .MuiDataGrid-columnHeaders": {
    background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
    borderBottom: "2px solid #e2e8f0",
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
    "&.row-pending": {
      background: "linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(245, 158, 11, 0.08))",
      borderLeft: "4px solid #fbbf24",
      "&:hover": {
        background: "linear-gradient(135deg, rgba(251, 191, 36, 0.12), rgba(245, 158, 11, 0.12))",
      }
    },
    "&.row-approved": {
      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(5, 150, 105, 0.08))",
      borderLeft: "4px solid #10b981",
      "&:hover": {
        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(5, 150, 105, 0.12))",
      }
    },
    "&.row-rejected": {
      background: "linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(220, 38, 38, 0.08))",
      borderLeft: "4px solid #ef4444",
      "&:hover": {
        background: "linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(220, 38, 38, 0.12))",
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
              Renew Expiry
            </MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color: "#ef4444", fontWeight: 500 }}>
              Delete
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleOpen} sx={{ color: "#667eea", fontWeight: 500 }}>
            Request to Renew Expiry
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
          Renew SSL Certificate
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#64748b" }}>
            Are you sure you want to renew the SSL certificate?
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

const columns = ({ id, setUserId, setCategory, setId, setOpen, setItemId }) => [
  { 
    field: '_id', 
    headerName: 'Request ID', 
    width: 250,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ 
          fontFamily: 'monospace', 
          fontSize: '0.8rem', 
          color: '#667eea',
          fontWeight: 600,
          background: 'rgba(102, 126, 234, 0.1)',
          padding: '4px 8px',
          borderRadius: '6px',
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: 'name', 
    headerName: 'Domain Name', 
    width: 200,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        height: '100%',
        width: '100%'
      }}>
        <FiGlobe size={14} style={{ color: '#667eea' }} />
        <Typography sx={{ 
          fontWeight: 600, 
          color: '#1a202c'
        }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: 'category', 
    headerName: 'Category', 
    width: 150,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <CategoryChip 
          label={params.value || "N/A"} 
          category={params.value || "N/A"}
          size="small"
        />
      </Box>
    )
  },
  { 
    field: 'requested_by', 
    headerName: 'Requested By', 
    width: 180, 
    valueGetter: (params) => {
      try {
        return params?.row?.user_id?.username || "N/A";
      } catch (error) {
        console.error('Error getting requested by:', error);
        return "N/A";
      }
    },
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ 
          color: params.value === "N/A" ? '#9ca3af' : '#374151',
          fontStyle: params.value === "N/A" ? 'italic' : 'normal',
          fontWeight: 500
        }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: 's_date', 
    headerName: 'Start Date', 
    width: 150, 
    valueGetter: (params) => {
      try {
        if (params?.row?.s_date) {
          return new Date(params.row.s_date).toLocaleDateString('en-GB', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
        }
        return "N/A";
      } catch (error) {
        console.error('Error formatting start date:', error);
        return "N/A";
      }
    },
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ 
          color: params.value === "N/A" ? '#9ca3af' : '#374151',
          fontStyle: params.value === "N/A" ? 'italic' : 'normal',
          fontSize: '0.8rem',
          fontWeight: 500
        }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: 'e_date', 
    headerName: 'Expiry Date', 
    width: 150, 
    valueGetter: (params) => {
      try {
        if (params?.row?.e_date) {
          return new Date(params.row.e_date).toLocaleDateString('en-GB', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
        }
        return "N/A";
      } catch (error) {
        console.error('Error formatting expiry date:', error);
        return "N/A";
      }
    },
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Typography sx={{ 
          color: params.value === "N/A" ? '#9ca3af' : '#374151',
          fontStyle: params.value === "N/A" ? 'italic' : 'normal',
          fontSize: '0.8rem',
          fontWeight: 500
        }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <StatusChip 
          label={params.row?.status || "N/A"} 
          status={params.row?.status || "N/A"}
          size="small"
        />
      </Box>
    ),
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
          row={params.row}
          setId={setId}
          setUserId={setUserId}
          setItemId={setItemId}
          setCategory={setCategory}
          id={id}
          setOpen={setOpen}
        />
      </Box>
    ),
  },
];

export default function RequestsTable({ setUserId, setOpen, setCategory, setItemId, data, id, setId }) {
  console.log('data4444444444444444444444444444444444444',data)

  // Ensure data is properly structured and handle edge cases
  const safeData = React.useMemo(() => {
    if (!data?.requestList) {
      return [];
    }
    
    // Filter out any invalid rows and ensure all required fields exist
    return data.requestList.filter(row => {
      return row && typeof row === 'object' && row._id;
    }).map(row => ({
      ...row,
      // Ensure all fields have fallback values
      _id: row._id || `temp_${Math.random()}`,
      name: row.name || "N/A",
      category: row.category || "N/A",
      status: row.status || "N/A",
      s_date: row.s_date || null,
      e_date: row.e_date || null,
      user_id: row.user_id || { username: "N/A" }
    }));
  }, [data]);

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
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <TableContainer>
        <ActionButtonsContainer>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" sx={{ color: "#1a202c", fontWeight: 600 }}>
              Certificate Requests
            </Typography>
            <Chip 
              label={`${safeData.length} Total`}
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
              New Request
            </ActionButton>

            <SecondaryButton
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => window.location.reload()}
            >
              <FiRefreshCw size={16} style={{ color: "#667eea" }} />
              Refresh
            </SecondaryButton>
          </Box>
        </ActionButtonsContainer>

        <Box sx={{ height: "600px", padding: "16px" }}>
          <StyledDataGrid
            rows={safeData}
            columns={columns({ id, setUserId, setCategory, setId, setOpen, setItemId })}
            getRowId={(row) => row._id}
            pageSizeOptions={[5, 10, 15, 20]}
            pageSize={10}
            checkboxSelection
            getRowClassName={(params) => {
              const status = params.row.status?.toLowerCase();
              if (status === 'pending') return 'row-pending';
              if (status === 'approved') return 'row-approved';
              if (status === 'rejected') return 'row-rejected';
              return '';
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
