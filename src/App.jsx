import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import { CssBaseline, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import { handleUnauthorizedError } from "./utils/authHandler";

// Pages
import SSL from "./pages/SSL";
import WebsiteDomain from "./pages/WebsiteDomain";
import Requests from "./pages/Requests";
import Logs from "./pages/Logs";
import ComingSoon from "./pages/ComingSoon";
import LoginPage from "./layout/authentication/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

// Components
import Sidebar from "./components/Sidebar";
import ResponsiveAppBar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";

// Styles
import "./App.css";

// Initialize QueryClient with global error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 401 errors
        if (error?.message?.includes('Unauthorized') || error?.message?.includes('401')) {
          return false;
        }
        return failureCount < 3;
      },
      onError: (error) => {
        // Handle 401 errors globally
        if (error?.message?.includes('Unauthorized') || error?.message?.includes('401')) {
          handleUnauthorizedError();
        }
      },
    },
    mutations: {
      onError: (error) => {
        // Handle 401 errors globally for mutations
        if (error?.message?.includes('Unauthorized') || error?.message?.includes('401')) {
          handleUnauthorizedError();
        }
      },
    },
  },
});

// Layout component wraps all pages (except login) with sidebar and navbar
const Layout = ({ children }) => {
  const theme = useTheme();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isAuthenticated = true; // You can plug your auth logic here
  const isLoginPage = location.pathname === "/";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawerWidth = 280; 
  const collapsedDrawerWidth = 80;
  const navbarHeight = 72;

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  return (
    <>
      {isAuthenticated && !isLoginPage && (
        <Box
          sx={{
            width: "100vw",
            height: `${navbarHeight}px`,
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1200,
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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
          background: "#f8fafc",
        }}
      >
        {/* Sidebar */}
        {isAuthenticated && !isLoginPage && (
          <Box
            sx={{
              width: isMobile ? 0 : `${isSidebarCollapsed ? collapsedDrawerWidth : drawerWidth}px`,
              flexShrink: 0,
              position: "fixed",
              left: 0,
              top: `${navbarHeight}px`,
              height: `calc(100vh - ${navbarHeight}px)`,
              transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: 1100,
              overflow: "hidden",
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
            background: "#f8fafc",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            marginLeft: isLoginPage || isMobile
              ? "0px"
              : `${isSidebarCollapsed ? collapsedDrawerWidth : drawerWidth}px`,
            height: isLoginPage ? "100vh" : `calc(100vh - ${navbarHeight}px)`,
            overflowY: "auto",
            marginTop: isLoginPage ? "0px" : `${navbarHeight}px`,
            padding: { xs: 1, sm: 2, md: 2 },
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              maxWidth: "100%",
              margin: "0 auto",
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              overflow: "hidden",
              minHeight: "calc(100vh - 120px)",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

// App Component
const App = () => {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#667eea",
      },
      secondary: {
        main: "#764ba2",
      },
      background: {
        default: "#f8fafc",
        paper: "#ffffff",
      },
      text: {
        primary: "#1a202c",
        secondary: "#4a5568",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: "2.5rem",
      },
      h2: {
        fontWeight: 600,
        fontSize: "2rem",
      },
      h3: {
        fontWeight: 600,
        fontSize: "1.5rem",
      },
      h4: {
        fontWeight: 600,
        fontSize: "1.25rem",
      },
      h5: {
        fontWeight: 600,
        fontSize: "1.125rem",
      },
      h6: {
        fontWeight: 600,
        fontSize: "1rem",
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          },
        },
      },
    },
  });

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Layout>
              <Routes>
                {/* Public login route */}
                <Route path="/" element={<LoginPage />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute isAuthenticated={true} />}>
                  <Route path="/ssl" element={<SSL />} />
                  <Route path="/domains" element={<WebsiteDomain />} />
                  <Route path="/requests" element={<Requests />} />
                  <Route path="/logs" element={<Logs />} />
                  <Route path="/profile" element={<ComingSoon feature="Profile" />} />
                  <Route path="/settings" element={<ComingSoon feature="Settings" />} />
                </Route>
              </Routes>
            </Layout>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;