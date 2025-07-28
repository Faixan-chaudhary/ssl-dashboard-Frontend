import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Box, IconButton, Typography, useTheme, Paper } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { BiMenu, BiX } from "react-icons/bi";
import { styled } from "@mui/system";

const menuItems = [
  { id: 1, title: "SSL Certificates", path: "/ssl" },
  { id: 2, title: "Domains", path: "/domains" },
  { id: 3, title: "Requests", path: "/requests" },
  { id: 4, title: "Logs", path: "/logs" },
];

const MenuOverlay = styled(motion(Paper))(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
}));

const MenuItem = styled(motion.div)`
  cursor: pointer;
  padding: ${(props) => props.theme.spacing(2)};
  margin: ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  width: 80%;
  max-width: 300px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.palette.action.hover};
    transform: scale(1.05);
  }
`;

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate(); // React Router navigation

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    initial: { x: 50, opacity: 0 },
    animate: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" },
    }),
  };

  return (
    <Box sx={{ position: "relative", zIndex: 1100 }}>
      <IconButton
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        sx={{
          position: "fixed",
          top: 10,
          background: theme.palette.background.paper,
          boxShadow: theme.shadows[2],
          "&:hover": { background: theme.palette.action.hover },
        }}
      >
        {isOpen ? <BiX size={24} /> : <BiMenu size={24} />}
      </IconButton>

      <AnimatePresence>
        {isOpen && (
          <MenuOverlay initial="initial" animate="animate" exit="exit" variants={menuVariants}>
            {menuItems.map((item, index) => (
              <MenuItem
                key={item.id}
                custom={index}
                variants={itemVariants}
                initial="initial"
                animate="animate"
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate(item.path); // Navigate to the selected page
                  toggleMenu(); // Close the menu
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                  {item.title}
                </Typography>
              </MenuItem>
            ))}
          </MenuOverlay>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default MobileNavigation;
