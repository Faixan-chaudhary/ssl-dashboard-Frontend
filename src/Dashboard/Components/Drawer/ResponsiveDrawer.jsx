import * as React from "react";
import PropTypes from "prop-types";
// import AppBar from '@mui/material/AppBar';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
// import IconButton from '@mui/material/IconButton';
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { Container } from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from "@mui/material/Toolbar";
// import Typography from '@mui/material/Typography';
import ResponsiveAppBar from "../AppBar/ResponsiveAppBar";
import FileUploader from "../FileUploader/FileUploader";
import ImageCard from "../../../components/ImageCard/ImageCard";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

// function ResponsiveDrawer(props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const [isClosing, setIsClosing] = React.useState(false);

//   const handleDrawerClose = () => {
//     setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     setIsClosing(false);
//   };

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const drawer = (
//     <Box sx={{ background: "#1976d2", height: "100%" }}>
//       <Toolbar />
//       <Divider />
//       <List sx={{ mt: "40px" }}>
//         {["Media", "Subscriptions"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? (
//                   <InboxIcon style={{ color: "white" }} />
//                 ) : (
//                   <MailIcon style={{ color: "white" }} />
//                 )}
//               </ListItemIcon>
//               <ListItemText primary={text} sx={{ color: "white" }} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   // Remove this const when copying and pasting into your project.
//   const container =
//     window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       {/* <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//         }}
//       > */}

//       {/* <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton> */}
//       {/* <Typography variant="h6" noWrap component="div">
//             Responsive drawer
//           </Typography> */}
//       <ResponsiveAppBar
//         drawerWidth={drawerWidth}
//         handleDrawerToggle={handleDrawerToggle}
//       />

//       {/* </AppBar> */}
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//         aria-label="mailbox folders"
//       >
//         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onTransitionEnd={handleDrawerTransitionEnd}
//           onClose={handleDrawerClose}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//           slotProps={{
//             root: {
//               keepMounted: true, // Better open performance on mobile.
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: "none", sm: "block" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//         }}
//       >
//         <Toolbar />

//         <FileUploader />
//         <ImageCard />
//       </Box>
//     </Box>
//   );
// }

// ResponsiveDrawer.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * Remove this when copying and pasting into your project.
//    */
//   window: PropTypes.func,
// };

// export default ResponsiveDrawer;




// import React from 'react'
// import Box from "@mui/material/Box";

function ResponsiveDrawer(props) {

const navigate = useNavigate()
  const { window ,mobileOpen,setMobileOpen} = props;
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  

    const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box sx={{ background: "#1976d2", height: "100%" }}>
      <Toolbar />
      <Divider />
      <List sx={{ mt: "40px" }}>
  {["Media", "Subscriptions"].map((text, index) => (
    <ListItem key={text} disablePadding>
      <ListItemButton onClick={() => navigate(`/dashboard/${text.toLowerCase()}`)}>

        <ListItemIcon>
          {index % 2 === 0 ? (
            <InboxIcon style={{ color: "white" }} />
          ) : (
            <MailIcon style={{ color: "white" }} />
          )}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ color: "white" }} />
      </ListItemButton>
    </ListItem>
  ))}
</List>

    </Box>
  );

  
  return (
    <Box
    component="nav"
    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    aria-label="mailbox folders"

  >
    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onTransitionEnd={handleDrawerTransitionEnd}
      onClose={handleDrawerClose}
      sx={{
        height:'100%',
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          marginTop: "0px",
        },
      }}
      slotProps={{
        root: {
          keepMounted: true, // Better open performance on mobile.
        },
      }}
    >
      {drawer}
    </Drawer>
    <Drawer
      variant="permanent"
      sx={{
        height:"100%",
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
      open
    >
      {drawer}
    </Drawer>
  </Box>
  )
}

export default ResponsiveDrawer