import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "./components/Sidebar";
import ResponsiveAppBar from "./components/Navbar";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Layout = ({ children }) => {
  const theme = useTheme();
  const location = useLocation();
  const token = Cookies.get("token");
  const isAuthenticated = Boolean(token);
  const isLoginPage = location.pathname === "/";
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = 240;
  const collapsedDrawerWidth = 60;
  const navbarHeight = 60;

  const toggleSidebar = () => setIsSidebarCollapsed(prevState => !prevState);

  return (
    <>
      {/* Navbar */}
      {isAuthenticated && !isLoginPage && (
        <Box
          sx={{
            width: "100vw",
            height: `${navbarHeight}px`,
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
          }}
        >
          <ResponsiveAppBar toggleSidebar={toggleSidebar} />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        {isAuthenticated && !isLoginPage && (
          <Box
            sx={{
              width: `${isSidebarCollapsed ? collapsedDrawerWidth : drawerWidth}px`,
              flexShrink: 0,
              position: "fixed",
              left: 0,
              top: `${navbarHeight}px`,
              height: `calc(100vh - ${navbarHeight}px)`,
              transition: "width 0.3s ease",
            }}
          >
            <Sidebar />
          </Box>
        )}

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: "100%",
            bgcolor: "background.default",
            transition: "margin-left 0.3s ease",
            marginLeft: isLoginPage || isMobile
              ? "0px"
              : `${isSidebarCollapsed ? 0 : drawerWidth}px`,
            height: isLoginPage
              ? "100vh"
              : `calc(100vh - ${navbarHeight}px)`,
            overflowY: "auto",
            marginTop: isLoginPage ? "0px" : `${navbarHeight}px`,
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
