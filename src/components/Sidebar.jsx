import React, { useState } from "react";
import { styled } from "@mui/system";
import { Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { FiMenu, FiHome, FiSettings, FiUser, FiBarChart, FiMail } from "react-icons/fi";
import { FaShieldAlt, FaGlobe, FaFileAlt, FaListAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const AnimatedDrawer = styled(motion.div)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  height: "100vh",
  overflow: "hidden",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "20px",
  justifyContent: "flex-end",
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: "10px",
  color: "#fff",
}));

const AnimatedSidebar = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menuItems = [
    { text: "SSL Certificates", icon: <FaShieldAlt size={20} />, route: "/ssl" },
    { text: "Domains", icon: <FaGlobe size={20} />, route: "/domains" },
    { text: "Requests", icon: <FaFileAlt size={20} />, route: "/requests" },
    { text: "Logs", icon: <FaListAlt size={20} />, route: "/logs" },
  ]
  const backgroundVariants = {
    animate: {
      background: [
        "linear-gradient(45deg,rgb(131, 193, 232) 0%,rgb(176, 132, 233) 50%,rgb(109, 154, 237) 100%)",
        "linear-gradient(45deg,rgb(220, 165, 231) 0%,rgb(71, 117, 216) 50%,rgb(37, 146, 235) 100%)",
        "linear-gradient(45deg,rgb(7, 180, 254) 0%, #2196F3 50%,rgb(230, 191, 243) 100%)",
      ],
      // background: [
      //   "linear-gradient(45deg, #2196F3 0%, #21CBF3 50%, #00BCD4 100%)",
      //   "linear-gradient(45deg, #21CBF3 0%, #00BCD4 50%, #2196F3 100%)",
      //   "linear-gradient(45deg, #00BCD4 0%,rgb(77, 168, 243) 50%, #21CBF3 100%)",
      // ],
      transition: {
        duration: 4,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const drawer = (
    <AnimatedDrawer
      initial="initial"
      animate="animate"
      variants={backgroundVariants}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "#fff" }}>
          <FiMenu size={24} />
        </IconButton>
      </DrawerHeader>
      <List sx={{ color: "#fff", marginTop:'25px', }}>
      {menuItems.map((item) => (
        <Link key={item.route} to={item.route} style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem
            button
            sx={{
             
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" ,minWidth:'46px',marginLeft:'7px'}}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        </Link>
      ))}

      </List>
    </AnimatedDrawer>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {isMobile ? (
        <Drawer
          variant="temporary"
          anchor="left"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer variant="permanent" open>
          {drawer}
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <MenuButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: "none" } }}
        >
          <FiMenu size={24} />
        </MenuButton>
      </Box>
    </Box>
  );
};

export default AnimatedSidebar;
