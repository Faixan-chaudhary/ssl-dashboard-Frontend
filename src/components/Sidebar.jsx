import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { 
  Box, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  useMediaQuery, 
  useTheme,
  Typography,
  Divider,
  Avatar,
  Chip,
  Tooltip
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiHome, FiSettings, FiUser, FiBarChart, FiMail, FiBell, FiSearch, FiShield } from "react-icons/fi";
import { FaShieldAlt, FaGlobe, FaFileAlt, FaListAlt, FaCrown, FaLock } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 280;

const AnimatedDrawer = styled(motion.div)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  height: "100%",
  overflow: "hidden",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)",
    backgroundSize: "200% 200%",
    animation: "gradientShift 8s ease infinite",
    zIndex: -1,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"25\" cy=\"25\" r=\"1\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"75\" cy=\"75\" r=\"1\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"50\" cy=\"10\" r=\"0.5\" fill=\"rgba(255,255,255,0.05)\"/><circle cx=\"10\" cy=\"60\" r=\"0.5\" fill=\"rgba(255,255,255,0.05)\"/><circle cx=\"90\" cy=\"40\" r=\"0.5\" fill=\"rgba(255,255,255,0.05)\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>')",
    opacity: 0.4,
    zIndex: -1,
  },
  "@keyframes gradientShift": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" }
  }
}));

const LightRay = styled(motion.div)({
  position: "absolute",
  width: "2px",
  height: "100px",
  background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)",
  zIndex: 0,
});

const FloatingParticle = styled(motion.div)({
  position: "absolute",
  width: "4px",
  height: "4px",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.6)",
  zIndex: 0,
  filter: "blur(1px)",
});

const GlowOrb = styled(motion.div)({
  position: "absolute",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
  zIndex: 0,
  filter: "blur(8px)",
});

const DrawerHeader = styled(motion.div)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "32px 20px 24px",
  position: "relative",
  flexShrink: 0,
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "20px",
    right: "20px",
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
  }
}));

const LogoSection = styled(motion.div)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  position: "relative",
});

const LogoIcon = styled(motion.div)({
  width: "48px",
  height: "48px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 20px rgba(79, 70, 229, 0.3)",
  position: "relative",
  border: "2px solid rgba(255, 255, 255, 0.2)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-1px",
    left: "-1px",
    right: "-1px",
    bottom: "-1px",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    borderRadius: "13px",
    zIndex: -1,
    opacity: 0.3,
  }
});

const LogoText = styled(Typography)({
  color: "#fff",
  fontWeight: 700,
  fontSize: "1.3rem",
  letterSpacing: "0.5px",
  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
  lineHeight: 1.2,
});

const NavigationSection = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const StyledListItem = styled(motion.div)(({ isActive }) => ({
  margin: "4px 4px",
  borderRadius: "16px",
  overflow: "hidden",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
    opacity: isActive ? 1 : 0,
    transition: "opacity 0.3s ease",
  },
  "&:hover::before": {
    opacity: 1,
  },
}));

const MenuItemContent = styled(Link)({
  display: "flex",
  alignItems: "center",
  padding: "14px 24px",
  textDecoration: "none",
  color: "inherit",
  position: "relative",
  zIndex: 1,
});

const IconWrapper = styled(motion.div)({
  width: "44px",
  height: "44px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "18px",
  background: "rgba(255, 255, 255, 0.12)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.25)",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "12px",
    background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
    opacity: 0,
    transition: "opacity 0.3s ease",
  }
});

const MenuText = styled(Typography)({
  color: "#fff",
  fontWeight: 600,
  fontSize: "1rem",
  letterSpacing: "0.5px",
  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
});

const UserSection = styled(motion.div)({
  margin: "20px",
  padding: "20px",
  background: "rgba(255,255,255,0.12)",
  borderRadius: "20px",
  backdropFilter: "blur(15px)",
  border: "1px solid rgba(255,255,255,0.25)",
  position: "relative",
  flexShrink: 0,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "20px",
    background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  "&:hover::before": {
    opacity: 1,
  }
});

const AnimatedSidebar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const menuItems = [
    { 
      text: "SSL Certificates", 
      icon: <FaShieldAlt size={20} style={{ color: "#fff" }} />, 
      route: "/ssl",
      description: "Manage SSL certificates"
    },
    { 
      text: "Domains", 
      icon: <FaGlobe size={20} style={{ color: "#fff" }} />, 
      route: "/domains",
      description: "Domain management"
    },
    { 
      text: "Requests", 
      icon: <FaFileAlt size={20} style={{ color: "#fff" }} />, 
      route: "/requests",
      description: "Certificate requests"
    },
    { 
      text: "Logs", 
      icon: <FaListAlt size={20} style={{ color: "#fff" }} />, 
      route: "/logs",
      description: "System logs"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.15, 
      rotate: 0, 
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      } 
    }
  };

  const logoVariants = {
    animate: {
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatDelay: 5,
        ease: "easeInOut"
      }
    }
  };

  // Light ray animations
  const lightRayVariants = {
    animate: {
      y: [-100, 400],
      opacity: [0, 0.8, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut"
      }
    }
  };

  // Floating particle animations
  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Glow orb animations
  const glowOrbVariants = {
    animate: {
      scale: [1, 1.3, 1],
      opacity: [0.3, 0.6, 0.3],
      x: [0, 20, 0],
      y: [0, -15, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  const drawer = (
    <AnimatedDrawer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Light Animations */}
      <LightRay
        variants={lightRayVariants}
        animate="animate"
        style={{ left: "20%", top: "-100px" }}
      />
      <LightRay
        variants={lightRayVariants}
        animate="animate"
        style={{ left: "60%", top: "-100px" }}
        transition={{ delay: 1 }}
      />
      <LightRay
        variants={lightRayVariants}
        animate="animate"
        style={{ left: "80%", top: "-100px" }}
        transition={{ delay: 2 }}
      />

      {/* Floating Particles */}
      <FloatingParticle
        variants={particleVariants}
        animate="animate"
        style={{ left: "15%", top: "20%" }}
      />
      <FloatingParticle
        variants={particleVariants}
        animate="animate"
        style={{ left: "85%", top: "30%" }}
        transition={{ delay: 1 }}
      />
      <FloatingParticle
        variants={particleVariants}
        animate="animate"
        style={{ left: "25%", top: "60%" }}
        transition={{ delay: 2 }}
      />
      <FloatingParticle
        variants={particleVariants}
        animate="animate"
        style={{ left: "75%", top: "70%" }}
        transition={{ delay: 3 }}
      />
      <FloatingParticle
        variants={particleVariants}
        animate="animate"
        style={{ left: "50%", top: "80%" }}
        transition={{ delay: 4 }}
      />

      {/* Glow Orbs */}
      <GlowOrb
        variants={glowOrbVariants}
        animate="animate"
        style={{ left: "10%", top: "15%" }}
      />
      <GlowOrb
        variants={glowOrbVariants}
        animate="animate"
        style={{ right: "10%", top: "25%" }}
        transition={{ delay: 2 }}
      />
      <GlowOrb
        variants={glowOrbVariants}
        animate="animate"
        style={{ left: "20%", bottom: "20%" }}
        transition={{ delay: 4 }}
      />

      {/* Header Section */}
      <DrawerHeader
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <LogoSection>
                     <LogoIcon
             variants={logoVariants}
             animate="animate"
           >
             <FiShield size={24} color="#fff" />
           </LogoIcon>
          <LogoText>SSL Dashboard</LogoText>
        </LogoSection>
      </DrawerHeader>

      {/* Navigation Section */}
      <NavigationSection>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Typography
            variant="caption"
            sx={{ 
              color: "rgba(255,255,255,0.8)", 
              padding: "0 24px 16px",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)"
            }}
          >
            Navigation
          </Typography>
        </motion.div>

        <List sx={{ padding: "0 8px", flex: 1, overflow: "auto" }}>
          <AnimatePresence>
            {menuItems.map((item, index) => (
              <Tooltip 
                key={item.route} 
                title={item.description}
                placement="right"
                arrow
              >
                <StyledListItem
                  isActive={isActiveRoute(item.route)}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.97 }}
                  onHoverStart={() => setHoveredItem(index)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <MenuItemContent to={item.route}>
                    <IconWrapper
                      variants={iconVariants}
                      animate={hoveredItem === index ? "hover" : "rest"}
                      style={{
                        background: isActiveRoute(item.route) 
                          ? `linear-gradient(135deg, #667eea, #764ba2)`
                          : "rgba(255, 255, 255, 0.12)",
                        border: isActiveRoute(item.route) 
                          ? `2px solid #667eea`
                          : "1px solid rgba(255, 255, 255, 0.25)",
                        boxShadow: isActiveRoute(item.route)
                          ? `0 6px 20px rgba(102, 126, 234, 0.5)`
                          : "0 2px 8px rgba(0,0,0,0.1)"
                      }}
                    >
                      {item.icon}
                    </IconWrapper>
                    <MenuText
                      style={{
                        fontWeight: isActiveRoute(item.route) ? 700 : 600,
                        color: isActiveRoute(item.route) ? "#fff" : "rgba(255,255,255,0.95)",
                        fontSize: isActiveRoute(item.route) ? "1.05rem" : "1rem"
                      }}
                    >
                      {item.text}
                    </MenuText>
                  </MenuItemContent>
                </StyledListItem>
              </Tooltip>
            ))}
          </AnimatePresence>
        </List>
      </NavigationSection>

      {/* User Section - Fixed at Bottom */}
      <UserSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
      >
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "16px",
          position: "relative",
          zIndex: 1
        }}>
          <Avatar
            sx={{ 
              width: 48, 
              height: 48,
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              border: "2px solid rgba(255,255,255,0.8)",
              boxShadow: "0 4px 15px rgba(79, 70, 229, 0.4)",
              fontSize: "1.2rem",
              fontWeight: 600
            }}
          >
            <FiUser size={24} style={{ color: "#fff" }} />
          </Avatar>
          <Box>
            <Typography sx={{ 
              color: "#fff", 
              fontSize: "1rem", 
              fontWeight: 700,
              textShadow: "0 1px 2px rgba(0,0,0,0.3)"
            }}>
              Admin User
            </Typography>
            <Typography sx={{ 
              color: "rgba(255,255,255,0.8)", 
              fontSize: "0.85rem",
              fontWeight: 500,
              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
            }}>
              Premium Account
            </Typography>
          </Box>
        </Box>
      </UserSection>
    </AnimatedDrawer>
  );

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      {isMobile ? (
        <Drawer
          variant="temporary"
          anchor="left"
          open={false}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: drawerWidth,
              background: "transparent",
              boxShadow: "none"
            }
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Box sx={{ width: drawerWidth, height: "100%" }}>
          {drawer}
        </Box>
      )}
    </Box>
  );
};

export default AnimatedSidebar;
