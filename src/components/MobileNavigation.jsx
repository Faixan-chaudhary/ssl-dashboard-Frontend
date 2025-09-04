"use client"

import React from "react"
import { 
  Box, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Typography,
  Avatar,
  Divider
} from "@mui/material"
import { motion } from "framer-motion"
import { styled } from "@mui/system"
import { useNavigate, useLocation } from "react-router-dom"
import { 
  FiMenu, 
  FiUser, 
  FiSettings, 
  FiLogOut, 
  FiShield,
  FiGlobe,
  FiFileText,
  FiList
} from "react-icons/fi"


const StyledDrawerPaper = styled(Box)(({ theme }) => ({
  width: 280,
  background: `
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.95) 0%, 
      rgba(255, 255, 255, 0.9) 100%
    )
  `,
  backdropFilter: "blur(20px)",
  borderRight: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  color: "#1a202c",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}))

const StyledListItem = styled(motion.div)(({ theme, active }) => ({
  margin: "4px 16px",
  borderRadius: "12px",
  background: active ? "rgba(102, 126, 234, 0.1)" : "transparent",
  color: active ? "#667eea" : "#1a202c",
  fontWeight: active ? 600 : 500,
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    background: active ? "rgba(102, 126, 234, 0.15)" : "rgba(102, 126, 234, 0.08)",
    transform: "translateX(4px)",
  },
  "&.logout-item:hover": {
    background: "rgba(239, 68, 68, 0.1)",
    color: "#ef4444",
  },
}))

const MenuButton = styled(motion.button)({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "10px",
  padding: "8px",
  color: "#1a202c",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.2)",
    transform: "scale(1.05)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  }
})

const LogoSection = styled(motion.div)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "20px",
  borderBottom: "1px solid rgba(0,0,0,0.1)",
})

const LogoIcon = styled(motion.div)({
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 15px rgba(79, 70, 229, 0.3)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
})

const LogoText = styled(Typography)({
  color: "#1a202c",
  fontWeight: 700,
  fontSize: "1.2rem",
  letterSpacing: "0.5px",
})

const UserSection = styled(Box)({
  padding: "20px",
  borderTop: "1px solid rgba(0,0,0,0.1)",
  marginTop: "auto",
  background: "rgba(102, 126, 234, 0.05)",
})

const MobileNavigation = () => {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  const handleNavigation = (route) => {
    if (route === "/") {
      // Clear cookies
      document.cookie = "authToken=; Max-Age=0; path=/; domain=" + window.location.hostname
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
      })
    }
    navigate(route)
    setOpen(false)
  }

  const menuItems = [
    { 
      text: "SSL Certificates", 
      icon: <FiShield size={20} style={{ color: "#1a202c" }} />, 
      route: "/ssl"
    },
    { 
      text: "Domains", 
      icon: <FiGlobe size={20} style={{ color: "#1a202c" }} />, 
      route: "/domains"
    },
    { 
      text: "Requests", 
      icon: <FiFileText size={20} style={{ color: "#1a202c" }} />, 
      route: "/requests"
    },
    { 
      text: "Logs", 
      icon: <FiList size={20} style={{ color: "#1a202c" }} />, 
      route: "/logs"
    },
  ]

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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  const DrawerList = (
    <StyledDrawerPaper role="presentation" onClick={toggleDrawer(false)}>
      <LogoSection
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <LogoIcon
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut"
          }}
        >
                     <FiShield size={20} color="#fff" />
        </LogoIcon>
        <LogoText>SSL Dashboard</LogoText>
      </LogoSection>

      <Box sx={{ flex: 1, overflow: "auto", py: 2 }}>
        <Typography
          variant="caption"
          sx={{ 
            color: "rgba(26, 32, 44, 0.7)", 
            padding: "0 20px 16px",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase"
          }}
        >
          Navigation
        </Typography>

        <List sx={{ padding: "0 8px" }}>
          {menuItems.map((item, index) => (
            <StyledListItem
              key={item.route}
              active={location.pathname === item.route}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              onClick={() => handleNavigation(item.route)}
            >
              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                padding: "16px 20px",
                gap: "16px"
              }}>
                <Box sx={{ 
                  color: location.pathname === item.route ? "#667eea" : "inherit",
                  display: "flex",
                  alignItems: "center"
                }}>
                  {item.icon}
                </Box>
                <Typography sx={{ 
                  fontWeight: location.pathname === item.route ? 600 : 500,
                  fontSize: "0.95rem"
                }}>
                  {item.text}
                </Typography>
              </Box>
            </StyledListItem>
          ))}
        </List>
      </Box>

      <UserSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "12px",
          mb: 2
        }}>
          <Avatar
            sx={{ 
              width: 40, 
              height: 40,
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              border: "2px solid rgba(79, 70, 229, 0.3)",
              fontSize: "1rem",
              fontWeight: 600
            }}
          >
            <FiUser size={20} style={{ color: "#fff" }} />
          </Avatar>
          <Box>
            <Typography sx={{ 
              color: "#1a202c", 
              fontSize: "0.9rem", 
              fontWeight: 600
            }}>
              Admin User
            </Typography>
            <Typography sx={{ 
              color: "#667eea", 
              fontSize: "0.75rem",
              fontWeight: 500
            }}>
              Premium Account
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <StyledListItem
          className="logout-item"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          onClick={() => handleNavigation("/")}
        >
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            padding: "12px 20px",
            gap: "16px"
          }}>
            <FiLogOut size={18} />
            <Typography sx={{ fontWeight: 500, fontSize: "0.9rem" }}>
              Logout
            </Typography>
          </Box>
        </StyledListItem>
      </UserSection>
    </StyledDrawerPaper>
  )

  return (
    <Box sx={{ display: { xs: "block", md: "none" } }}>
      <MenuButton
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={toggleDrawer(true)}
      >
        <FiMenu size={20} />
      </MenuButton>
      <Drawer 
        open={open} 
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "none"
          }
        }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  )
}

export default MobileNavigation
