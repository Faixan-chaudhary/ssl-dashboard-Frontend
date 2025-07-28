import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import ResponsiveAppBar from "./Components/AppBar/ResponsiveAppBar";
import ResponsiveDrawer from "./Components/Drawer/ResponsiveDrawer";
import { Outlet, useLocation } from "react-router-dom";

const drawerWidth = 240;

function Dashboard(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { pathname } = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <ResponsiveAppBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={() => setMobileOpen(!mobileOpen)}
      />

      <ResponsiveDrawer mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
