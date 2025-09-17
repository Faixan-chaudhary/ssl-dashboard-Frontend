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
import { useRequestRenewSSL, useDeleteSSL } from "../api/hooks/mutations";
import * as XLSX from 'xlsx';
import { FiDownload, FiRefreshCw, FiPlus, FiShield, FiGlobe } from "react-icons/fi";

const TableContainer = styled(Box)({
  padding: "20px",
  background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
  borderRadius: "16px",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  
  // Simple container without acceleration
  transform: "none",
  willChange: "auto",
  backfaceVisibility: "visible",
  
  // Remove all optimization that interferes with scroll
  contain: "none",
  isolation: "auto",
  perspective: "none",
  transformStyle: "flat",
  
  // Add keyframes for gradient animation
  "@keyframes gradientShift": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },
  
  // Simplified global scrollbar styling
  "& *": {
    scrollbarWidth: "thin",
    scrollbarColor: "#94a3b8 #f1f5f9",
    
    // Basic scroll behavior
    scrollBehavior: "auto",
    overscrollBehavior: "auto",
    overscrollBehaviorX: "auto",
    overscrollBehaviorY: "auto",
  },
  
  "& *::-webkit-scrollbar": {
    width: "14px",
    height: "14px",
    
    // Prevent scrollbar rendering glitches
    background: "transparent",
    borderRadius: "0",
  },
  
  "& *::-webkit-scrollbar-track": {
    background: "#f8fafc",
    borderRadius: "7px",
    border: "1px solid #e2e8f0",
    
    // Ensure stable track rendering
    boxSizing: "border-box",
    margin: "0",
    padding: "0",
  },
  
  "& *::-webkit-scrollbar-thumb": {
    background: "linear-gradient(135deg, #94a3b8, #64748b)",
    borderRadius: "7px",
    border: "2px solid #f8fafc",
    minWidth: "20px",
    minHeight: "20px",
    
    // Prevent thumb glitches during movement
    boxSizing: "border-box",
    backgroundClip: "padding-box",
    
    "&:hover": {
      background: "linear-gradient(135deg, #64748b, #475569)",
      transition: "background 0.1s ease-out",
    },
    
    "&:active": {
      background: "linear-gradient(135deg, #475569, #334155)",
      transition: "none",
    },
  },
  
  "& *::-webkit-scrollbar-corner": {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    
    // Prevent corner rendering issues
    boxSizing: "border-box",
  },
});

const ActionButtonsContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "24px 32px",
  borderBottom: "1px solid #e2e8f0",
  background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
  borderRadius: "16px 16px 0 0",
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

const StyledDataGrid = styled(DataGrid)({
  border: "none",
  width: "100%",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  transform: "translate3d(0, 0, 0)",
  willChange: "transform",
  backfaceVisibility: "hidden",
  
  // Root container styling
  "& .MuiDataGrid-root": {
    border: "none",
    fontSize: "14px",
    overflow: "hidden",
    transform: "translate3d(0, 0, 0)",
  },

  // Main container optimizations
  "& .MuiDataGrid-main": {
    overflow: "hidden",
    transform: "translate3d(0, 0, 0)",
    willChange: "transform",
  },

  // Column headers - Beautiful professional styling with resize functionality
  "& .MuiDataGrid-columnHeaders": {
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)",
    borderBottom: "3px solid #e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    minHeight: "70px !important",
    position: "sticky",
    top: 0,
    zIndex: 10,
    
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)",
      backgroundSize: "300% 100%",
      animation: "gradientShift 4s ease-in-out infinite",
    },
    
    "& .MuiDataGrid-columnHeader": {
      borderRight: "1px solid #d1d5db",
      padding: "0 !important",
      fontSize: "13px",
      fontWeight: "700",
      color: "#111827",
      background: "transparent",
      transition: "all 0.3s ease",
      position: "relative",
      
      "&::before": {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "0",
        height: "0",
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent)",
        borderRadius: "50%",
        transition: "all 0.3s ease",
        zIndex: -1,
      },
      
      "&:first-of-type": {
        borderTopLeftRadius: "12px",
        
        "&::before": {
          borderTopLeftRadius: "12px",
        },
      },
      
      "&:last-of-type": {
        borderRight: "none",
        borderTopRightRadius: "12px",
        
        "&::before": {
          borderTopRightRadius: "12px",
        },
      },
      
      "&:hover": {
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.08))",
        color: "#1e40af",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
        
        "&::before": {
          width: "100%",
          height: "100%",
        },
      },
      
      // Enhanced column resize handle
      "& .MuiDataGrid-columnSeparator": {
        color: "#6b7280",
        opacity: 0.7,
        transition: "all 0.2s ease",
        cursor: "col-resize",
        width: "20px",
        
        "&:hover": {
          color: "#3b82f6",
          opacity: 1,
          transform: "scaleX(1.5)",
        },
        
        "&.MuiDataGrid-columnSeparator--sideRight": {
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
          
          "&::after": {
            content: '""',
            width: "2px",
            height: "60%",
            background: "linear-gradient(180deg, #3b82f6, #8b5cf6)",
            borderRadius: "1px",
            opacity: 0.6,
            transition: "all 0.2s ease",
          },
          
          "&:hover::after": {
            opacity: 1,
            height: "80%",
            width: "3px",
            boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
          },
        },
      },
      
      "& .MuiDataGrid-columnHeaderTitle": {
        fontWeight: "700 !important",
        fontSize: "13px",
        color: "#111827",
        letterSpacing: "0.5px",
        textAlign: "center !important",
        width: "100%",
        display: "flex !important",
        justifyContent: "center !important",
        alignItems: "center !important",
        lineHeight: "1.4",
        padding: "16px 12px",
        textTransform: "uppercase",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        margin: "0 auto",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        position: "relative",
        
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "0",
          height: "2px",
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
          borderRadius: "1px",
          transition: "width 0.3s ease",
        },
      },
      
      "&:hover .MuiDataGrid-columnHeaderTitle::after": {
        width: "60%",
      },
      
      "& .MuiDataGrid-columnHeaderTitleContainer": {
        justifyContent: "center !important",
        width: "100%",
        padding: "0 !important",
        margin: "0 !important",
        height: "70px",
        display: "flex !important",
        alignItems: "center !important",
        textAlign: "center",
        position: "relative",
      },
      
      "& .MuiDataGrid-columnHeaderTitleContainerContent": {
        display: "flex !important",
        alignItems: "center !important",
        justifyContent: "center !important",
        width: "100%",
        padding: "0",
        textAlign: "center",
        margin: "0 auto",
        position: "relative",
      },
      
      "& .MuiDataGrid-iconButtonContainer": {
        visibility: "visible",
        width: "auto",
        marginLeft: "auto",
      },
      
      "& .MuiDataGrid-menuIcon": {
        opacity: "0.6",
        "&:hover": {
          opacity: "1",
        },
      },
      
      "&:focus": {
        outline: "none",
      },
    },
  },

  // Table rows - Enhanced beautiful styling with reduced height
  "& .MuiDataGrid-row": {
    borderBottom: "1px solid #e2e8f0",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    minHeight: "50px !important",
    position: "relative",
    background: "#ffffff",
    border: "1px solid transparent",
    margin: "1px 4px",
    borderRadius: "6px",
    
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "5px",
      background: "transparent",
      transition: "all 0.4s ease",
      borderRadius: "4px 0 0 4px",
    },
    
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "transparent",
      transition: "all 0.4s ease",
      borderRadius: "8px",
      zIndex: -1,
    },
    
    "&:nth-of-type(even)": {
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    },
    
    "&:hover": {
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%) !important",
      transform: "translateY(-3px) scale(1.003)",
      boxShadow: "0 12px 30px rgba(59, 130, 246, 0.18), 0 6px 15px rgba(0, 0, 0, 0.12)",
      borderRadius: "12px",
      margin: "6px 8px",
      zIndex: 3,
      border: "1px solid rgba(59, 130, 246, 0.25)",
      
      "&::before": {
        background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
        width: "8px",
        borderRadius: "4px 0 0 4px",
        boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
      },
      
      "&::after": {
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(29, 78, 216, 0.03))",
      },
    },
    
    "&.Mui-selected": {
      background: "linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(29, 78, 216, 0.08))",
      border: "1px solid rgba(59, 130, 246, 0.3)",
      
      "&:hover": {
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.18), rgba(29, 78, 216, 0.12)) !important",
      },
    },
    
    // Complete row background changes based on status
    "&.row-red": {
      background: "linear-gradient(135deg, rgba(254, 242, 242, 0.95), rgba(252, 231, 231, 0.85)) !important",
      border: "1px solid rgba(239, 68, 68, 0.2)",
      boxShadow: "0 2px 8px rgba(239, 68, 68, 0.1)",
      
      "&::before": {
        background: "linear-gradient(135deg, #ef4444, #dc2626)",
        boxShadow: "0 0 10px rgba(239, 68, 68, 0.3)",
      },
      
      "&::after": {
        background: "linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(220, 38, 38, 0.05))",
      },
      
      "&:hover": {
        background: "linear-gradient(135deg, #fef2f2, #fee2e2) !important",
        boxShadow: "0 12px 30px rgba(239, 68, 68, 0.25), 0 6px 15px rgba(0, 0, 0, 0.12)",
        border: "1px solid rgba(239, 68, 68, 0.4)",
        
        "&::before": {
          background: "linear-gradient(135deg, #dc2626, #b91c1c)",
          width: "10px",
          boxShadow: "0 0 20px rgba(220, 38, 38, 0.6)",
        },
        
        "&::after": {
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(220, 38, 38, 0.08))",
        },
      }
    },
    
    "&.row-orange": {
      background: "linear-gradient(135deg, rgba(255, 251, 235, 0.95), rgba(254, 243, 199, 0.85)) !important",
      border: "1px solid rgba(245, 158, 11, 0.2)",
      boxShadow: "0 2px 8px rgba(245, 158, 11, 0.1)",
      
      "&::before": {
        background: "linear-gradient(135deg, #f59e0b, #d97706)",
        boxShadow: "0 0 10px rgba(245, 158, 11, 0.3)",
      },
      
      "&::after": {
        background: "linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(217, 119, 6, 0.05))",
      },
      
      "&:hover": {
        background: "linear-gradient(135deg, #fffbeb, #fef3c7) !important",
        boxShadow: "0 12px 30px rgba(245, 158, 11, 0.25), 0 6px 15px rgba(0, 0, 0, 0.12)",
        border: "1px solid rgba(245, 158, 11, 0.4)",
        
        "&::before": {
          background: "linear-gradient(135deg, #d97706, #b45309)",
          width: "10px",
          boxShadow: "0 0 20px rgba(217, 119, 6, 0.6)",
        },
        
        "&::after": {
          background: "linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(217, 119, 6, 0.08))",
        },
      }
    },
    
    "&.row-dark-orange": {
      background: "linear-gradient(135deg, rgba(255, 247, 237, 0.95), rgba(254, 237, 213, 0.85)) !important",
      border: "1px solid rgba(234, 88, 12, 0.2)",
      boxShadow: "0 2px 8px rgba(234, 88, 12, 0.1)",
      
      "&::before": {
        background: "linear-gradient(135deg, #ea580c, #c2410c)",
        boxShadow: "0 0 10px rgba(234, 88, 12, 0.3)",
      },
      
      "&::after": {
        background: "linear-gradient(135deg, rgba(234, 88, 12, 0.08), rgba(194, 65, 12, 0.05))",
      },
      
      "&:hover": {
        background: "linear-gradient(135deg, #fff7ed, #fed7aa) !important",
        boxShadow: "0 12px 30px rgba(234, 88, 12, 0.25), 0 6px 15px rgba(0, 0, 0, 0.12)",
        border: "1px solid rgba(234, 88, 12, 0.4)",
        
        "&::before": {
          background: "linear-gradient(135deg, #c2410c, #9a3412)",
          width: "10px",
          boxShadow: "0 0 20px rgba(194, 65, 12, 0.6)",
        },
        
        "&::after": {
          background: "linear-gradient(135deg, rgba(234, 88, 12, 0.12), rgba(194, 65, 12, 0.08))",
        },
      }
    },
    
    "&.row-yellow": {
      background: "linear-gradient(135deg, rgba(254, 252, 232, 0.95), rgba(253, 246, 178, 0.85)) !important",
      border: "1px solid rgba(202, 138, 4, 0.2)",
      boxShadow: "0 2px 8px rgba(202, 138, 4, 0.1)",
      
      "&::before": {
        background: "linear-gradient(135deg, #ca8a04, #a16207)",
        boxShadow: "0 0 10px rgba(202, 138, 4, 0.3)",
      },
      
      "&::after": {
        background: "linear-gradient(135deg, rgba(202, 138, 4, 0.08), rgba(161, 98, 7, 0.05))",
      },
      
      "&:hover": {
        background: "linear-gradient(135deg, #fefce8, #fde047) !important",
        boxShadow: "0 12px 30px rgba(202, 138, 4, 0.25), 0 6px 15px rgba(0, 0, 0, 0.12)",
        border: "1px solid rgba(202, 138, 4, 0.4)",
        
        "&::before": {
          background: "linear-gradient(135deg, #a16207, #854d0e)",
          width: "10px",
          boxShadow: "0 0 20px rgba(161, 98, 7, 0.6)",
        },
        
        "&::after": {
          background: "linear-gradient(135deg, rgba(202, 138, 4, 0.12), rgba(161, 98, 7, 0.08))",
        },
      }
    },
    
    "&.row-green": {
      background: "linear-gradient(135deg, rgba(240, 253, 244, 0.95), rgba(220, 252, 231, 0.85)) !important",
      border: "1px solid rgba(16, 185, 129, 0.2)",
      boxShadow: "0 2px 8px rgba(16, 185, 129, 0.1)",
      
      "&::before": {
        background: "linear-gradient(135deg, #10b981, #059669)",
        boxShadow: "0 0 10px rgba(16, 185, 129, 0.3)",
      },
      
      "&::after": {
        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(5, 150, 105, 0.05))",
      },
      
      "&:hover": {
        background: "linear-gradient(135deg, #f0fdf4, #dcfce7) !important",
        boxShadow: "0 12px 30px rgba(16, 185, 129, 0.25), 0 6px 15px rgba(0, 0, 0, 0.12)",
        border: "1px solid rgba(16, 185, 129, 0.4)",
        
        "&::before": {
          background: "linear-gradient(135deg, #059669, #047857)",
          width: "10px",
          boxShadow: "0 0 20px rgba(5, 150, 105, 0.6)",
        },
        
        "&::after": {
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(5, 150, 105, 0.08))",
        },
      }
    }
  },

  // Table cells - Beautiful styling with reduced height and perfect alignment
  "& .MuiDataGrid-cell": {
    borderRight: "1px solid #e2e8f0",
    padding: "10px 16px !important",
    fontSize: "14px",
    color: "#1f2937",
    fontWeight: "500",
    lineHeight: "1.4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50px",
    textAlign: "center",
    position: "relative",
    transition: "all 0.3s ease",
    background: "transparent",
    
    "&:first-of-type": {
      borderTopLeftRadius: "6px",
      borderBottomLeftRadius: "6px",
      paddingLeft: "20px !important",
    },
    
    "&:last-of-type": {
      borderRight: "none",
      borderTopRightRadius: "6px",
      borderBottomRightRadius: "6px",
      paddingRight: "20px !important",
    },
    
    "&:hover": {
      background: "rgba(59, 130, 246, 0.08)",
      color: "#1e40af",
      fontWeight: "600",
      transform: "scale(1.02)",
      borderRadius: "6px",
      boxShadow: "0 2px 8px rgba(59, 130, 246, 0.15)",
    },
    
    "&:focus": {
      outline: "2px solid #3b82f6",
      outlineOffset: "-2px",
      borderRadius: "6px",
      background: "rgba(59, 130, 246, 0.1)",
    },
    
    // Enhanced text handling with better styling
    "& .MuiTypography-root": {
      fontSize: "14px",
      fontWeight: "500",
      color: "inherit",
      textAlign: "center",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: "1.6",
      
      "&.status-badge": {
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "0.6px",
        minWidth: "75px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(8px)",
        transition: "all 0.2s ease",
        
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: "0 3px 6px rgba(0, 0, 0, 0.12), 0 2px 3px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    overflow: "hidden",
    
    "&:last-child": {
      borderRight: "none",
    },
    
    "&:focus": {
      outline: "none",
    },
    
    "&:focus-within": {
      outline: "2px solid #667eea",
      outlineOffset: "-2px",
      borderRadius: "4px",
    },
  },

  // Cell content wrapper - Match header padding exactly with text overflow
  "& .MuiDataGrid-cellContent": {
    width: "100%",
    padding: "12px 8px !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "20px",
    textAlign: "center",
    margin: "0 !important",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  // Checkbox styling
  "& .MuiDataGrid-cellCheckbox": {
    padding: "8px",
    "& .MuiCheckbox-root": {
      padding: "4px",
      "&.Mui-checked": {
        color: "#667eea",
      },
    },
  },

  // Footer styling
  "& .MuiDataGrid-footerContainer": {
    borderTop: "1px solid #e2e8f0",
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    minHeight: "56px",
    padding: "0 16px",
    
    "& .MuiTablePagination-root": {
      color: "#6b7280",
      fontSize: "14px",
      
      "& .MuiTablePagination-toolbar": {
        minHeight: "56px",
        paddingLeft: "0",
        paddingRight: "0",
      },
      
      "& .MuiTablePagination-selectLabel": {
        fontSize: "14px",
        color: "#6b7280",
      },
      
      "& .MuiTablePagination-displayedRows": {
        fontSize: "14px",
        color: "#374151",
        fontWeight: "500",
      },
      
      "& .MuiTablePagination-actions": {
        "& .MuiIconButton-root": {
          color: "#6b7280",
          "&:hover": {
            background: "rgba(102, 126, 234, 0.1)",
            color: "#667eea",
          },
          "&.Mui-disabled": {
            color: "#d1d5db",
          },
        },
      },
    },
  },

  // Hide selected row count
  "& .MuiDataGrid-selectedRowCount": {
    visibility: "hidden",
  },

  // Anti-glitch virtual scroller with direct scroll handling
  "& .MuiDataGrid-virtualScroller": {
    scrollBehavior: "auto",
    overflowX: "scroll",
    overflowY: "scroll",
    scrollbarWidth: "thin",
    
    // Critical: Prevent all forms of scroll interference
    transform: "none !important",
    willChange: "auto",
    backfaceVisibility: "visible",
    
    // Disable all scroll optimization that causes glitches
    overscrollBehavior: "auto",
    overscrollBehaviorX: "auto", 
    overscrollBehaviorY: "auto",
    
    // Remove virtualization artifacts
    scrollSnapType: "none",
    scrollSnapAlign: "none",
    
    // Direct scrolling without layers
    isolation: "auto",
    contain: "none",
    perspective: "none",
    transformStyle: "flat",
    
    "&::-webkit-scrollbar": {
      width: "14px",
      height: "14px",
      backgroundColor: "#f8fafc",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f5f9",
      borderRadius: "7px",
      border: "1px solid #e2e8f0",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#94a3b8",
      borderRadius: "7px",
      border: "2px solid #f1f5f9",
      minWidth: "30px",
      minHeight: "30px",
      
      "&:hover": {
        background: "#64748b",
      },
      "&:active": {
        background: "#475569",
      },
    },
    "&::-webkit-scrollbar-corner": {
      background: "#f1f5f9",
    },
    
    "&::-webkit-scrollbar:horizontal": {
      height: "14px",
    },
    "&::-webkit-scrollbar-thumb:horizontal": {
      minWidth: "30px",
    },
    
    "&::-webkit-scrollbar:vertical": {
      width: "14px", 
    },
    "&::-webkit-scrollbar-thumb:vertical": {
      minHeight: "30px",
    },
  },

  // Direct content scrolling without virtualization interference
  "& .MuiDataGrid-virtualScrollerContent": {
    // Remove all transforms that cause scroll-back glitches
    transform: "none !important",
    willChange: "auto",
    backfaceVisibility: "visible",
    position: "static",
    
    // Disable all optimizations that interfere with scroll
    transition: "none !important",
    transformStyle: "flat",
    contain: "none",
    isolation: "auto",
    perspective: "none",
  },

  // Simple render zone without acceleration
  "& .MuiDataGrid-virtualScrollerRenderZone": {
    // Remove all transforms and optimizations
    transform: "none !important", 
    willChange: "auto",
    position: "static",
    
    // Disable all performance features that cause glitches
    transition: "none !important",
    contain: "none",
    isolation: "auto",
    backfaceVisibility: "visible",
    transformStyle: "flat",
    perspective: "none",
  },

  // Smooth column transitions
  "& .MuiDataGrid-columnHeaders": {
    transform: "translate3d(0, 0, 0)",
    willChange: "transform",
  },

  "& .MuiDataGrid-row": {
    transform: "translate3d(0, 0, 0)",
    willChange: "transform",
  },

  // Loading overlay
  "& .MuiDataGrid-loadingOverlay": {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(4px)",
  },

  // No rows overlay
  "& .MuiDataGrid-overlay": {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(4px)",
  },
});

const ActionsMenu = ({ row, setId, setOpen, setEdit, id, label }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const { requestRenewSSL } = useRequestRenewSSL();
  const { deleteSSL } = useDeleteSSL();

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
    setSelectedRow(row);
    setOpenDeleteConfirmation(true);
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

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleConfirmDelete = () => {
    console.log(`${label} Certificate Delete Confirmed`, selectedRow);
    if (selectedRow && selectedRow._realId) {
      deleteSSL(selectedRow._realId);
    }
    setOpenDeleteConfirmation(false);
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
        {Cookies.get("userType")?.toLowerCase() === "admin" ? [
          <MenuItem key="renew" onClick={handleEdit} sx={{ color: "#667eea", fontWeight: 500 }}>
            Renew {label} Expiry
          </MenuItem>,
          <MenuItem key="delete" onClick={handleDelete} sx={{ color: "#ef4444", fontWeight: 500 }}>
            Delete
          </MenuItem>
        ] : (
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

      <Dialog 
        open={openDeleteConfirmation} 
        onClose={handleCloseDeleteConfirmation}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }
        }}
      >
        <DialogTitle sx={{ color: "#dc2626", fontWeight: 600 }}>
          Delete {label} Certificate
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#64748b" }}>
            Are you sure you want to delete this {label.toLowerCase()} certificate? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "16px 24px" }}>
          <Button 
            onClick={handleCloseDeleteConfirmation} 
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
            onClick={handleConfirmDelete} 
            sx={{ 
              background: "linear-gradient(135deg, #dc2626, #b91c1c)",
              color: "white",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(135deg, #b91c1c, #991b1b)",
              }
            }}
            variant="contained"
          >
            Delete
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
    flex: 0,
    renderCell: (params) => (
      <Typography 
        sx={{ 
          fontWeight: 600, 
          color: '#1a202c',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%', textAlign: 'center',
          textAlign: 'center'
        }}
      >
        {params.value}
      </Typography>
    )
  },
  { 
    field: "ssl", 
    headerName: "SSL Common Name", 
    width: 240,
    flex: 0,
    renderCell: (params) => (
      <Typography 
        sx={{ 
          fontWeight: 600, 
          color: '#1a202c',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%', textAlign: 'center'
        }}
        title={params.value || "N/A"}
      >
        {params.value || "N/A"}
      </Typography>
    )
  },
  { 
    field: "certificate_type", 
    headerName: "Certificate Type", 
    width: 220,
    flex: 0,
    renderCell: (params) => (
      <Typography 
        sx={{ 
          color: '#374151',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%', textAlign: 'center'
        }}
        title={params.value || "N/A"}
      >
        {params.value || "N/A"}
      </Typography>
    )
  },
  { 
    field: "pricing_usd", 
    headerName: "Pricing USD", 
    width: 120,
    flex: 0,
    renderCell: (params) => (
      <Typography 
        sx={{ 
          color: '#374151',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%', textAlign: 'center'
        }}
        title={params.value || "N/A"}
      >
        {params.value || "N/A"}
      </Typography>
    )
  },
  { 
    field: "no_of_days", 
    headerName: "No. of Days (From Expiry Date)", 
    width: 220,
    flex: 0,
    renderCell: (params) => {
      const days = Number(params.value);
      const isExpired = days <= 0;
      const isNearExpire = days > 0 && days <= 30;
      const isSafe = days > 30;
      
      return (
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
      );
    }
  },
  { 
    field: "start_date", 
    headerName: "Renew Date", 
    width: 150,
    flex: 0, 
    renderCell: (params) => (
      <Typography 
        sx={{ 
          color: '#374151', 
          fontSize: '0.8rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%', textAlign: 'center'
        }}
        title={params.value ? new Date(params.value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
      >
        {params.value ? new Date(params.value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
      </Typography>
    )
  },
  { 
    field: "expiry_date", 
    headerName: "Expiry Date", 
    width: 150,
    flex: 0, 
    renderCell: (params) => (
      <Typography 
        sx={{ 
          color: '#374151', 
          fontSize: '0.8rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%', textAlign: 'center'
        }}
        title={params.value ? new Date(params.value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
      >
        {params.value ? new Date(params.value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
      </Typography>
    )
  },
  {
    field: "registered_by",
    headerName: "Registered / Renew By",
    width: 240,
    flex: 0,
    renderCell: (params) => (
      <Typography 
        sx={{ 
          color: '#374151',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%', textAlign: 'center'
        }}
        title={params.value || "N/A"}
      >
        {params.value || "N/A"}
      </Typography>
    )
  },
  { 
    field: "authority", 
    headerName: "Authority", 
    width: 150,
    flex: 0,
    renderCell: (params) => (
      <Typography sx={{ color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', textAlign: 'center' }} title={params.value || "N/A"}>
        {params.value || "N/A"}
      </Typography>
    )
  },
  { 
    field: "notes", 
    headerName: "Notes", 
    width: 250,
    flex: 0,
    renderCell: (params) => (
      <Typography sx={{ color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', textAlign: 'center' }} title={params.value || "N/A"}>
        {params.value || "N/A"}
      </Typography>
    )
  },
  { 
    field: "duration_1", 
    headerName: "1 Year", 
    width: 80,
    flex: 0, 
    renderCell: (params) => (
      <Typography sx={{ color: '#059669', fontWeight: 600, fontSize: '1.2rem', textAlign: 'center', width: '100%' }}>
        {Array.isArray(params.row.duration) ? params.row.duration.includes(1) ? '✓' : '' : params.row.duration === 1 ? '✓' : ''}
      </Typography>
    )
  },
  { 
    field: "duration_2", 
    headerName: "2 Years", 
    width: 80,
    flex: 0, 
    renderCell: (params) => (
      <Typography sx={{ color: '#059669', fontWeight: 600, fontSize: '1.2rem', textAlign: 'center', width: '100%' }}>
        {Array.isArray(params.row.duration) ? params.row.duration.includes(2) ? '✓' : '' : params.row.duration === 2 ? '✓' : ''}
      </Typography>
    )
  },
  { 
    field: "duration_3", 
    headerName: "3 Years", 
    width: 80,
    flex: 0, 
    renderCell: (params) => (
      <Typography sx={{ color: '#059669', fontWeight: 600, fontSize: '1.2rem', textAlign: 'center', width: '100%' }}>
        {Array.isArray(params.row.duration) ? params.row.duration.includes(3) ? '✓' : '' : params.row.duration === 3 ? '✓' : ''}
      </Typography>
    )
  },
  { 
    field: "vendor", 
    headerName: "Vendor", 
    width: 150,
    flex: 0,
    renderCell: (params) => (
      <Typography 
        sx={{ 
          color: '#374151',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%', textAlign: 'center'
        }}
        title={params.value || "N/A"}
      >
        {params.value || "N/A"}
      </Typography>
    )
  },
  { 
    field: "po_status", 
    headerName: "PO Status", 
    width: 130,
    flex: 0,
    renderCell: (params) => (
      <Typography 
        sx={{ 
          color: '#374151',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%', textAlign: 'center'
        }}
        title={params.value || "N/A"}
      >
        {params.value || "N/A"}
      </Typography>
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
  { 
    field: "id", 
    headerName: "ID", 
    flex: 0,
    width: 70,
    renderCell: (params) => (
      <Typography sx={{ fontWeight: 600, color: '#1a202c' }}>
        {params.value}
      </Typography>
    )
  },
  { 
    field: "domain", 
    headerName: `${label} Name`, 
    width: 200,
    flex: 0,
    renderCell: (params) => (
      <Typography sx={{ fontWeight: 600, color: '#1a202c' }}>
        {params.value || "N/A"}
      </Typography>
    )
  },
  { 
    field: "certificate_type", 
    headerName: "TLD (Top Level Domain)", 
    width: 180,
    flex: 0,
    renderCell: (params) => (
      <Typography sx={{ color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', textAlign: 'center' }} title={params.value || "N/A"}>
        {params.value || "N/A"}
      </Typography>
    )
  },
  { 
    field: "pricing_usd", 
    headerName: "Pricing USD", 
    width: 120,
    flex: 0,
    renderCell: (params) => (
      <Typography sx={{ color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', textAlign: 'center' }} title={params.value || "N/A"}>
        {params.value || "N/A"}
      </Typography>
    )
  },
  { 
    field: "no_of_days", 
    headerName: "No. of Days", 
    width: 180,
    flex: 0,
    renderCell: (params) => {
      const days = Number(params.value);
      const isExpired = days <= 0;
      const isNearExpire = days > 0 && days <= 30;
      const isSafe = days > 30;
      
      return (
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
      );
    }
  },
  { 
    field: "start_date", 
    headerName: "Start Date", 
    width: 150,
    flex: 0,
    renderCell: (params) => (
      <Typography sx={{ color: '#374151', fontSize: '0.8rem' }}>
        {params.value || "N/A"}
      </Typography>
    )
  },
  { 
    field: "expiry_date", 
    headerName: "Expiry Date", 
    width: 150,
    flex: 0,
    renderCell: (params) => (
      <Typography sx={{ color: '#374151', fontSize: '0.8rem' }}>
        {params.value || "N/A"}
      </Typography>
    )
  },
  { 
    field: "vendor", 
    headerName: "Vendor", 
    width: 150,
    flex: 0,
    renderCell: (params) => (
      <Typography sx={{ color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', textAlign: 'center' }} title={params.value || "N/A"}>
        {params.value || "N/A"}
      </Typography>
    )
  },
  {
    field: "registered_by",
    headerName: "Registered By",
    width: 220,
    flex: 0,
    renderCell: (params) => (
      <Typography sx={{ color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', textAlign: 'center' }} title={params.value || "N/A"}>
        {params.value || "N/A"}
      </Typography>
    )
  },
  { 
    field: "authority", 
    headerName: "Authority", 
    width: 150,
    flex: 0,
    renderCell: (params) => (
      <Typography sx={{ color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', textAlign: 'center' }} title={params.value || "N/A"}>
        {params.value || "N/A"}
      </Typography>
    )
  },
  { 
    field: "notes", 
    headerName: "Notes", 
    width: 250,
    flex: 0,
    renderCell: (params) => (
      <Typography sx={{ color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', textAlign: 'center' }} title={params.value || "N/A"}>
        {params.value || "N/A"}
      </Typography>
    )
  },
  { 
    field: "duration_1", 
    headerName: "1 Year", 
    width: 80,
    flex: 0, 
    renderCell: (params) => (
      <Typography sx={{ color: '#059669', fontWeight: 600, fontSize: '1.2rem', textAlign: 'center', width: '100%' }}>
        {Array.isArray(params.row.duration) ? params.row.duration.includes(1) ? '✓' : '' : params.row.duration === 1 ? '✓' : ''}
      </Typography>
    )
  },
  { 
    field: "duration_2", 
    headerName: "2 Years", 
    width: 80,
    flex: 0, 
    renderCell: (params) => (
      <Typography sx={{ color: '#059669', fontWeight: 600, fontSize: '1.2rem', textAlign: 'center', width: '100%' }}>
        {Array.isArray(params.row.duration) ? params.row.duration.includes(2) ? '✓' : '' : params.row.duration === 2 ? '✓' : ''}
      </Typography>
    )
  },
  { 
    field: "duration_3", 
    headerName: "3 Years", 
    width: 80,
    flex: 0, 
    renderCell: (params) => (
      <Typography sx={{ color: '#059669', fontWeight: 600, fontSize: '1.2rem', textAlign: 'center', width: '100%' }}>
        {Array.isArray(params.row.duration) ? params.row.duration.includes(3) ? '✓' : '' : params.row.duration === 3 ? '✓' : ''}
      </Typography>
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

        <Box sx={{ height: "600px", padding: "16px", overflow: "hidden" }}>
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
              if (days <= 7) return 'row-red';
              if (days <= 15) return 'row-dark-orange';
              if (days <= 30) return 'row-orange';
              if (days <= 60) return 'row-yellow';
              return 'row-green';
            }}
            disableColumnResize={false}
            disableVirtualization={true}
            autoHeight={false}
            density="comfortable"
            columnBuffer={0}
            rowBuffer={0}
            rowHeight={50}
            headerHeight={70}
            hideFooterSelectedRowCount={true}
            scrollbarSize={14}
            disableColumnSelector={false}
            keepNonExistentRowsSelected={false}
            experimentalFeatures={{ 
              newEditingApi: true,
              lazyLoading: false,
            }}
            throttleRowsMs={0}
            disableRowSelectionOnClick={true}
            hideFooter={false}
            sx={{
              border: "none",
              width: "100%",
              height: "100%",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              
              // Simplified main container without optimizations
              "& .MuiDataGrid-main": {
                overflow: "visible",
                position: "static",
              },
              
              "& .MuiDataGrid-virtualScroller": {
                overflow: "auto !important",
                scrollBehavior: "auto",
                
                // Remove all acceleration and optimization that causes glitches
                transform: "none !important",
                willChange: "auto",
                backfaceVisibility: "visible",
                contain: "none",
                perspective: "none",
                transformStyle: "flat",
                isolation: "auto",
                
                // Simple scrollbar without complex styling
                "&::-webkit-scrollbar": {
                  width: "14px",
                  height: "14px",
                  background: "#f8fafc",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f5f9",
                  borderRadius: "7px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#94a3b8",
                  borderRadius: "7px",
                  minWidth: "30px",
                  minHeight: "30px",
                  
                  "&:hover": {
                    background: "#64748b",
                  },
                  "&:active": {
                    background: "#475569",
                  },
                },
              },
              
              "& .MuiDataGrid-virtualScrollerContent": {
                width: "auto !important",
                minWidth: "100%",
                position: "static",
                
                // No transforms or optimizations
                transform: "none !important",
                willChange: "auto",
                backfaceVisibility: "visible",
                transition: "none !important",
                contain: "none",
              },
              
              "& .MuiDataGrid-virtualScrollerRenderZone": {
                // Simple positioning without transforms
                transform: "none !important",
                willChange: "auto",
                position: "static",
                transition: "none !important",
                contain: "none",
                isolation: "auto",
              },
              
              // Simple column headers with centered text
              "& .MuiDataGrid-columnHeaders": {
                position: "sticky",
                top: 0,
                zIndex: 1,
                overflow: "visible",
                
                // No transforms
                transform: "none !important",
                willChange: "auto",
                backfaceVisibility: "visible",
                contain: "none",
              },
              
              // Ensure header text is centered
              "& .MuiDataGrid-columnHeader": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                
                "& .MuiDataGrid-columnHeaderTitle": {
                  textAlign: "center",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
                
                "& .MuiDataGrid-columnHeaderTitleContainer": {
                  justifyContent: "center !important",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                },
                
                "& .MuiDataGrid-columnHeaderTitleContainerContent": {
                  justifyContent: "center !important",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  textAlign: "center",
                },
              },
              
              // Simple rows without optimization
              "& .MuiDataGrid-row": {
                transform: "none !important",
                willChange: "auto",
                backfaceVisibility: "visible",
                transition: "none !important",
                contain: "none",
                isolation: "auto",
              },
              
              // Simple cells
              "& .MuiDataGrid-cell": {
                transform: "none !important",
                willChange: "auto",
                backfaceVisibility: "visible",
                contain: "none",
                transition: "none !important",
              },
            }}
          />
        </Box>
      </TableContainer>
    </motion.div>
  );
}
