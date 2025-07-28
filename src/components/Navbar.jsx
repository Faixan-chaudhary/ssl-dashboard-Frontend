import React, { useState } from "react";
import {
  AppBar,
  Box,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import MobileNavigation from "./MobileNavigation";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "white",
  transition: "all 0.3s ease-in-out"
}));

const MenuLink = styled(motion.div)(({ theme }) => ({
  cursor: "pointer",
  padding: "8px 16px",
  borderRadius: "4px",
  transition: "all 0.3s ease-in-out"
}));

const AnimatedLogo = styled(motion.div)({
  display: "flex",
  alignItems: "center",
  cursor: "pointer"
});

const ResponsiveAppBar = () => {
  const [userMenu, setUserMenu] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    setUserMenu(null);

    if (route === "/") {
      // Clear cookies only
      document.cookie = 'authToken=; Max-Age=0; path=/; domain=' + window.location.hostname;

      // Optionally, remove all cookies if needed
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    }

    navigate(route);
  };

  const logoVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  };

  const avatarVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1,
        repeat: Infinity
      }
    }
  };

  return (
    <StyledAppBar sx={{ zIndex: "99", height: "fit-content" }} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            {isMobile && (
              <>
                <MobileNavigation />
              </>
            )}

            <AnimatedLogo
              variants={logoVariants}
              whileHover="hover"
              initial="initial"
              sx={{ ml: "60px" }}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 700,
                  letterSpacing: "0.1rem",
                  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                NetShield
              </Typography>
            </AnimatedLogo>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Menu
              anchorEl={userMenu}
              open={Boolean(userMenu)}
              onClose={() => setUserMenu(null)}
            >
              <MenuItem onClick={() => handleNavigation("/profile")}>Profile</MenuItem>
              <MenuItem onClick={() => handleNavigation("/settings")}>Settings</MenuItem>
              <MenuItem onClick={() => handleNavigation("/")}>Logout</MenuItem>
            </Menu>
          </Box>

          <motion.div
            variants={avatarVariants}
            animate="pulse"
            onClick={(e) => setUserMenu(e.currentTarget)}
          >
            <Avatar
              alt="User"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
              sx={{ cursor: "pointer" }}
            />
          </motion.div>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default ResponsiveAppBar;
