import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Chip } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiShield, FiClock, FiActivity, FiDownload, FiRefreshCw } from "react-icons/fi";

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

const RoleChip = styled(Chip)(({ role }) => ({
  background: role === 'admin' 
    ? "linear-gradient(135deg, #ef4444, #dc2626)"
    : role === 'user'
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

const ActionChip = styled(Chip)(({ action }) => ({
  background: action?.toLowerCase().includes('login') 
    ? "linear-gradient(135deg, #10b981, #059669)"
    : action?.toLowerCase().includes('logout')
    ? "linear-gradient(135deg, #f59e0b, #d97706)"
    : action?.toLowerCase().includes('create') || action?.toLowerCase().includes('add')
    ? "linear-gradient(135deg, #3b82f6, #2563eb)"
    : action?.toLowerCase().includes('update') || action?.toLowerCase().includes('edit')
    ? "linear-gradient(135deg, #8b5cf6, #7c3aed)"
    : action?.toLowerCase().includes('delete') || action?.toLowerCase().includes('remove')
    ? "linear-gradient(135deg, #ef4444, #dc2626)"
    : "linear-gradient(135deg, #6b7280, #4b5563)",
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
  width: "100%",
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
        fontSize: "0.875rem",
        color: "#1a202c",
        letterSpacing: "0.2px",
        textAlign: "center",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
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
    "&:nth-child(even)": {
      background: "rgba(248, 250, 252, 0.5)",
      "&:hover": {
        background: "rgba(102, 126, 234, 0.08)",
      }
    }
  },
  "& .MuiDataGrid-cell": {
    borderRight: "1px solid #f1f5f9",
    padding: "12px 16px",
    fontSize: "0.875rem",
    color: "#374151",
    fontWeight: 500,
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
    borderRight: "none !important",
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

// Function to format time (HH:MM AM/PM)
const formatTime = (timestamp) => {
  if (!timestamp) return "";
  try {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) 
      ? "Invalid Time" 
      : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch (error) {
    console.error('Error formatting time:', error);
    return "Invalid Time";
  }
};

// Function to format date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) 
      ? "Invalid Date" 
      : date.toLocaleDateString('en-GB', { 
          weekday: 'short', 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
  } catch (error) {
    console.error('Error formatting date:', error);
    return "Invalid Date";
  }
};

const columns = [
  { 
    field: "username", 
    headerName: "Username", 
    width: 250,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        height: '100%',
        width: '100%'
      }}>
        <FiUser size={14} style={{ color: '#667eea' }} />
        <Typography sx={{ 
          fontWeight: 600, 
          color: '#1a202c',
          lineHeight: 1
        }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: "role", 
    headerName: "Role", 
    width: 150,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <RoleChip 
          label={params.value || "N/A"} 
          role={params.value?.toLowerCase() || "user"}
          size="small"
        />
      </Box>
    )
  },
  { 
    field: "email", 
    headerName: "Email", 
    width: 280,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        height: '100%',
        width: '100%'
      }}>
        <FiMail size={14} style={{ color: '#667eea' }} />
        <Typography sx={{ 
          color: '#374151',
          fontSize: '0.8rem',
          lineHeight: 1
        }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
  { 
    field: "action", 
    headerName: "Action", 
    width: 250,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '8px',
        height: '100%',
        width: '100%'
      }}>
        <FiActivity size={14} style={{ color: '#667eea' }} />
        <ActionChip 
          label={params.value || "N/A"} 
          action={params.value}
          size="small"
        />
      </Box>
    )
  },
  { 
    field: "date", 
    headerName: "Date & Time", 
    width: 250,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        height: '100%',
        width: '100%'
      }}>
        <FiClock size={14} style={{ color: '#667eea' }} />
        <Typography sx={{ 
          color: '#64748b',
          fontSize: '0.8rem',
          fontFamily: 'monospace',
          lineHeight: 1
        }}>
          {params.value || "N/A"}
        </Typography>
      </Box>
    )
  },
];

export default function LogsTable({ data }) {
  // Ensure data is properly structured and handle edge cases
  const safeData = React.useMemo(() => {
    if (!data?.activities) {
      return [];
    }
    
    // Filter out any invalid rows and ensure all required fields exist
    return data.activities.filter(activity => {
      return activity && typeof activity === 'object';
    }).map((activity, index) => {
      const formattedDate = formatDate(activity?.date);
      const formattedTime = formatTime(activity?.timestamp);
      
      return {
        id: index,
        username: activity?.user_id?.username || "N/A",
        role: activity?.user_id?.role || "N/A",
        email: activity?.user_id?.email || "N/A",
        action: activity?.action || "N/A",
        date: `${formattedDate} ${formattedTime}`,
        _originalData: activity // Keep original data for reference
      };
    });
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
              Activity Logs
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
            <SecondaryButton
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => window.location.reload()}
            >
              <FiRefreshCw size={16} style={{ color: "#667eea" }} />
              Refresh
            </SecondaryButton>

            <ActionButton
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                // Export functionality can be added here
                console.log('Export logs functionality');
              }}
            >
              <FiDownload size={16} style={{ color: "#fff" }} />
              Export Logs
            </ActionButton>
          </Box>
        </ActionButtonsContainer>

        <Box sx={{ height: "600px", padding: "16px", width: "100%" }}>
                     <StyledDataGrid
             rows={safeData}
             columns={columns}
             pageSizeOptions={[5, 10, 15, 20]}
             pageSize={10}
             checkboxSelection
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
               "& .MuiDataGrid-virtualScroller": {
                 overflow: "auto",
                 width: "100%",
               },
               "& .MuiDataGrid-virtualScrollerContent": {
                 overflow: "auto",
                 width: "100%",
               },
               "& .MuiDataGrid-main": {
                 width: "100%",
               },
               "& .MuiDataGrid-columnHeaders": {
                 width: "100%",
               },
               "& .MuiDataGrid-columnHeader:last-child": {
                 borderRight: "none !important",
               },
               "& .MuiDataGrid-cell:last-child": {
                 borderRight: "none !important",
               }
             }}
          />
        </Box>
      </TableContainer>
    </motion.div>
  );
}
