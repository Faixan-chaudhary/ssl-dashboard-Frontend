"use client"

import { useState, useEffect } from "react"
import {
  AppBar,
  Box,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Avatar,
  useTheme,
  useMediaQuery,
  Typography,
  IconButton,
  Chip,
  Badge,
  Tooltip,
  Divider
} from "@mui/material"
import { motion, AnimatePresence } from "framer-motion"
import { styled } from "@mui/system"
import { useNavigate, useLocation } from "react-router-dom"
import { 
  FiMenu, 
  FiBell, 
  FiSearch, 
  FiSettings, 
  FiUser, 
  FiLogOut, 
  FiShield,
  FiGlobe,
  FiFileText,
  FiList
} from "react-icons/fi"
import { FaCrown } from "react-icons/fa"
import MobileNavigation from "./MobileNavigation"
import logoImg from "../assets/logos.png";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.95) 0%, 
      rgba(255, 255, 255, 0.98) 50%,
      rgba(248, 250, 252, 0.95) 100%
    )
  `,
  backdropFilter: "blur(25px)",
  borderBottom: "1px solid rgba(102, 126, 234, 0.1)",
  boxShadow: `
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8)
  `,
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  height: "72px",
  zIndex: 1200,
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.03), transparent)",
    opacity: 0,
    transition: "opacity 0.4s ease",
  },
  "&:hover::before": {
    opacity: 1,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "60%",
    height: "2px",
    background: "linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.3), transparent)",
    borderRadius: "1px",
  }
}))

const LogoSection = styled(motion.div)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
  padding: "8px 16px",
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.15)",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  }
})

const LogoIcon = styled(motion.div)({
  width: "36px",
  height: "36px",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-2px",
    left: "-2px",
    right: "-2px",
    bottom: "-2px",
    background: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
    borderRadius: "12px",
    zIndex: -1,
    opacity: 0.5,
    filter: "blur(6px)",
  }
})

const LogoText = styled(Typography)({
  color: "#1a202c",
  fontWeight: 700,
  fontSize: "1.2rem",
  letterSpacing: "0.5px",
  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
})

const ActionButton = styled(motion.button)({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "12px",
  padding: "8px 12px",
  color: "#1a202c",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "0.9rem",
  fontWeight: 500,
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.2)",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  }
})

const UserAvatar = styled(motion.div)({
  position: "relative",
  cursor: "pointer",
  padding: "4px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
  border: "1px solid rgba(102, 126, 234, 0.2)",
  transition: "all 0.3s ease",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-2px",
    left: "-2px",
    right: "-2px",
    bottom: "-2px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    borderRadius: "50%",
    zIndex: -1,
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  "&:hover": {
    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15))",
    border: "1px solid rgba(102, 126, 234, 0.3)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.25)",
  },
  "&:hover::before": {
    opacity: 0.2,
  }
})

const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    background: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(25px)",
    borderRadius: "20px",
    border: "1px solid rgba(102, 126, 234, 0.1)",
    boxShadow: `
      0 20px 60px rgba(0, 0, 0, 0.12),
      0 8px 25px rgba(102, 126, 234, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.8)
    `,
    minWidth: "240px",
    overflow: "hidden",
    padding: "8px",
  }
})



const AnimatedLogo = styled(motion.div)({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  padding: "8px 16px",
  borderRadius: "16px",
  background: "rgba(102, 126, 234, 0.05)",
  border: "1px solid rgba(102, 126, 234, 0.1)",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  "&:hover": {
    background: "rgba(102, 126, 234, 0.1)",
    border: "1px solid rgba(102, 126, 234, 0.2)",
    transform: "translateY(-1px)",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.15)",
  },
  "&:hover::before": {
    opacity: 1,
  }
});



const StyledMenuItem = styled(MenuItem)({
  padding: "14px 20px",
  color: "#1a202c",
  fontWeight: 500,
  borderRadius: "12px",
  margin: "2px 0",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  "&:hover": {
    background: "rgba(102, 126, 234, 0.08)",
    color: "#667eea",
    transform: "translateX(4px)",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.15)",
  },
  "&:hover::before": {
    opacity: 1,
  },
  "&.logout": {
    "&:hover": {
      background: "rgba(239, 68, 68, 0.08)",
      color: "#ef4444",
      boxShadow: "0 4px 12px rgba(239, 68, 68, 0.15)",
    }
  }
})

const ResponsiveAppBar = ({ toggleSidebar }) => {
  const [userMenu, setUserMenu] = useState(null)
  const [notifications, setNotifications] = useState(3)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (route) => {
    setUserMenu(null)

    if (route === "/") {
      // Clear cookies
      document.cookie = "authToken=; Max-Age=0; path=/; domain=" + window.location.hostname
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
      })
    }

    navigate(route)
  }

  const getCurrentPageTitle = () => {
    const path = location.pathname
    switch (path) {
      case "/ssl": return "SSL Certificates"
      case "/domains": return "Domains"
      case "/requests": return "Requests"
      case "/logs": return "Logs"
      case "/profile": return "Profile"
      case "/settings": return "Settings"
      default: return "Dashboard"
    }
  }

  const logoVariants = {
    animate: {
      rotate: [0, 3, -3, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatDelay: 8,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 },
    },
  }

  const avatarVariants = {
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  }

  return (
    <StyledAppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between", py: 1, height: "72px" }}>
          {/* Left Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {isMobile && <MobileNavigation />}
            
            <AnimatedLogo
              variants={logoVariants}
              whileHover="hover"
              initial="initial"
              sx={{ ml: isMobile ? "0px" : "60px" }}
            >
              <img
                src={logoImg}
                alt="Logo"
                style={{ height: 48, width: "auto", cursor: "pointer" }}
              />
            </AnimatedLogo>


          </Box>

          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  padding: "6px 12px",
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))",
                  border: "1px solid rgba(34, 197, 94, 0.2)",
                  color: "#16a34a",
                  fontSize: "0.85rem",
                  fontWeight: 500
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#22c55e",
                    boxShadow: "0 0 8px rgba(34, 197, 94, 0.5)",
                    animation: "pulse 2s ease-in-out infinite"
                  }}
                />
                Online
              </Box>
            </motion.div>

            {/* User Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <UserAvatar
                variants={avatarVariants}
                animate="animate"
                whileHover="hover"
                onClick={(e) => setUserMenu(e.currentTarget)}
              >
                <Avatar
                  alt="Admin User"
                  sx={{
                    width: 44,
                    height: 44,
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    border: "2px solid rgba(255,255,255,0.9)",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                      transform: "scale(1.05)",
                    }
                  }}
                >
                  <FiUser size={22} style={{ color: "#fff" }} />
                </Avatar>
              </UserAvatar>
            </motion.div>
          </Box>
        </Toolbar>
      </Container>

      {/* User Menu */}
      <StyledMenu
        anchorEl={userMenu}
        open={Boolean(userMenu)}
        onClose={() => setUserMenu(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ 
          p: 3, 
          borderBottom: "1px solid rgba(102, 126, 234, 0.1)",
          background: "linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
            opacity: 0,
            transition: "opacity 0.3s ease",
          },
          "&:hover::before": {
            opacity: 1,
          }
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                border: "2px solid rgba(255,255,255,0.9)",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)"
              }}
            >
              <FiUser size={18} style={{ color: "#fff" }} />
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#1a202c", fontSize: "1rem" }}>
                Admin User
              </Typography>
              <Typography variant="caption" sx={{ color: "#667eea", fontWeight: 500, fontSize: "0.8rem" }}>
                Premium Account
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 8px rgba(34, 197, 94, 0.5)"
              }}
            />
            <Typography variant="caption" sx={{ color: "#16a34a", fontWeight: 500 }}>
              Online • Last active now
            </Typography>
          </Box>
        </Box>
        
        <StyledMenuItem onClick={() => handleNavigation("/profile")}>
          <FiUser size={16} style={{ marginRight: 12, color: "#1a202c" }} />
          Profile
        </StyledMenuItem>
        
        <StyledMenuItem onClick={() => handleNavigation("/settings")}>
          <FiSettings size={16} style={{ marginRight: 12, color: "#1a202c" }} />
          Settings
        </StyledMenuItem>
        
        <Divider sx={{ my: 1 }} />
        
        <StyledMenuItem 
          className="logout"
          onClick={() => handleNavigation("/")}
        >
          <FiLogOut size={16} style={{ marginRight: 12, color: "#1a202c" }} />
          Logout
        </StyledMenuItem>
      </StyledMenu>
    </StyledAppBar>
  )
}

export default ResponsiveAppBar
