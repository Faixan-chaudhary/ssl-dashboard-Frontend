import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import { CssBaseline, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";

// Pages
import SSL from "./pages/SSL";
import WebsiteDomain from "./pages/WebsiteDomain";
import Requests from "./pages/Requests";
import Logs from "./pages/Logs";
import LoginPage from "./layout/authentication/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

// Components
import Sidebar from "./components/Sidebar";
import ResponsiveAppBar from "./components/Navbar";

// Styles
import "./App.css";

// Initialize QueryClient
const queryClient = new QueryClient();

// Layout component wraps all pages (except login) with sidebar and navbar
const Layout = ({ children }) => {
  const theme = useTheme();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isAuthenticated = true; // You can plug your auth logic here
  const isLoginPage = location.pathname === "/";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawerWidth = 240;
  const collapsedDrawerWidth = 60;
  const navbarHeight = 60;

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
            height: isLoginPage ? "100vh" : `calc(100vh - ${navbarHeight}px)`,
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

// App Component
const App = () => {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2",
      },
      background: {
        default: "#ffffff",
        paper: "#f5f5f5",
      },
      text: {
        primary: "#212121",
        secondary: "#757575",
      },
    },
  });

  return (
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
              </Route>
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;



// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import SSL from "./pages/SSL";
// import WebsiteDomain from "./pages/WebsiteDomain";
// import Sidebar from "./components/Sidebar";
// import ResponsiveAppBar from "./components/Navbar";
// import Box from "@mui/material/Box";
// import LoginPage from "./layout/authentication/Login";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import { useMediaQuery, CssBaseline } from "@mui/material";
// import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
// import Requests from "./pages/Requests";
// import Logs from "./pages/Logs";
// import "./App.css";
// import cookies from 'js-cookie'

// // Initialize QueryClient
// const queryClient = new QueryClient();

// const Layout = ({ children }) => {
//   const theme = useTheme();
//   const location = useLocation();
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const isAuthenticated = true; // Replace with actual authentication logic
//   const isLoginPage = location.pathname === "/";
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const drawerWidth = 240;
//   const collapsedDrawerWidth = 60;
//   const navbarHeight = 60;

//   // Toggle sidebar collapse state
//   const toggleSidebar = () => setIsSidebarCollapsed(prev => !prev);

//   return (
//     <>
//       {/* Navbar (Only show if authenticated and not on login page) */}
//       {isAuthenticated && !isLoginPage && (
//         <Box
//           sx={{
//             width: "100%",
//             height: `${navbarHeight}px`,
//             position: "fixed",
//             top: 0,
//             left: 0,
//             zIndex: 1000,
//             backgroundColor: theme.palette.background.paper,
//           }}
//         >
//           <ResponsiveAppBar toggleSidebar={toggleSidebar} />
//         </Box>
//       )}

//       <Box
//         sx={{
//           display: "flex",
//           height: "100vh",
//           width: "100vw",
//           overflow: "hidden",
//         }}
//       >
//         {/* Sidebar (Hidden on mobile) */}
//         {isAuthenticated && !isLoginPage && !isMobile && (
//           <Box
//             sx={{
//               width: `${isSidebarCollapsed ? collapsedDrawerWidth : drawerWidth}px`,
//               flexShrink: 0,
//               position: "fixed",
//               left: 0,
//               top: `${navbarHeight}px`,
//               height: `calc(100vh - ${navbarHeight}px)`,
//               transition: "width 0.3s ease",
//             }}
//           >
//             <Sidebar />
//           </Box>
//         )}

//         {/* Main Content */}
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             width: "100%",
//             bgcolor: "background.default",
//             transition: "margin-left 0.3s ease",
//             marginLeft: isLoginPage || isMobile ? "0px" : `${isSidebarCollapsed ? collapsedDrawerWidth : drawerWidth}px`,
//             height: isLoginPage ? "100vh" : `calc(100vh - ${navbarHeight}px)`,
//             overflowY: "auto",
//             marginTop: isLoginPage ? "0px" : `${navbarHeight}px`,
//             // padding: { xs: 1, md: 2 }, // Adjust padding for responsiveness
//           }}
//         >
//           {children}
//         </Box>
//       </Box>
//     </>
//   );
// };

// const App = () => {
//   const theme = useTheme();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   React.useEffect(() => {
//     const authToken = cookies.get("token");
//     setIsAuthenticated(!!authToken); // Set authentication state based on token existence
//   }, []);
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <Router>
//           <Routes>
//             {/* Public Route */}
//             <Route path="/" element={<LoginPage />} />

//             {/* Protected Routes */}
//             <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
//               <Route element={<Layout />}>
//                 <Route path="/ssl" element={<SSL />} />
//                 <Route path="/domains" element={<WebsiteDomain />} />
//                 <Route path="/requests" element={<Requests />} />
//                 <Route path="/logs" element={<Logs />} />
//               </Route>
//             </Route>

//             {/* Redirect unknown routes */}
//             <Route path="*" element={<LoginPage />} />
//           </Routes>
//         </Router>
//       </ThemeProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;