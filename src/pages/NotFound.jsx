import React, { useEffect } from "react";
import { Box, Button, Container, Typography, keyframes } from "@mui/material";
import { styled } from "@mui/system";
import { FaHome } from "react-icons/fa";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  padding: theme.spacing(3),
  textAlign: "center",
}));

const ErrorCode = styled(Typography)(({ theme }) => ({
  fontSize: "180px",
  fontWeight: 900,
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: `${float} 3s ease-in-out infinite`,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    fontSize: "120px",
  },
}));

const Message = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  animation: `${fadeIn} 1s ease-out`,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

const SubMessage = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
  maxWidth: "600px",
  animation: `${fadeIn} 1s ease-out 0.3s backwards`,
}));

const HomeButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontSize: "1.1rem",
  borderRadius: "30px",
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  color: "#fff",
  transition: "all 0.3s ease",
  animation: `${fadeIn} 1s ease-out 0.6s backwards`,
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 10px 20px rgba(33, 150, 243, 0.3)",
  },
}));

const BackgroundShape = styled(Box)({
  position: "absolute",
  width: "100%",
  height: "100%",
  background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)",
  zIndex: 0,
});

const NotFound = () => {
  useEffect(() => {
    document.title = "404 - Page Not Found";
  }, []);

  const handleHomeClick = () => {
    // Add your navigation logic here
    console.log("Navigating to home");
  };

  return (
    <StyledContainer maxWidth={false}>
      <BackgroundShape />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <ErrorCode variant="h1" aria-label="404 error">
          404
        </ErrorCode>
        <Message variant="h2" aria-label="Page not found message">
          Oops! Page Not Found
        </Message>
        <SubMessage variant="body1">
          The page you're looking for seems to have wandered off into the digital wilderness. 
          Don't worry, it happens to the best of us!
        </SubMessage>
        <HomeButton
          variant="contained"
          startIcon={<FaHome />}
          onClick={handleHomeClick}
          aria-label="Return to home page"
        >
          Return Home
        </HomeButton>
      </Box>
    </StyledContainer>
  );
};

export default NotFound;