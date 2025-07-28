import React from "react";
import { Box, Card, Grid, Typography, Tooltip } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { IoMdWarning } from "react-icons/io";
import { MdError, MdVerified } from "react-icons/md";

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
`;

const moveAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(10px); }
  100% { transform: translateY(0px); }
`;

const StyledCard = styled(Card)(({ bgGradient, cardType }) => ({
  padding: "20px",
  borderRadius: "12px",
  background: bgGradient,
  width: "100%",
  height: "140px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  animation:
    cardType === "Near to Expire"
      ? `${blinkAnimation} 1s infinite`
      : cardType === "Expired"
      ? `${moveAnimation} 3s infinite`
      : "none",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
  },
}));

const IconWrapper = styled(Box)({
  fontSize: "2rem",
});

const CountTypography = styled(Typography)({
  fontSize: "2rem",
  fontWeight: "bold",
});

const StatusDashboard = ({ data = [], onCardClick }) => {
  const nearToExpire = data && data.filter(item => Number(item.no_of_days) <= 30 && Number(item.no_of_days) > 0);
  const expired =  data &&  data.filter(item => Number(item.no_of_days) <= 0);
  const safeZone =  data &&  data.filter(item => Number(item.no_of_days) > 30);

  const cards = [
    {
      title: "Near to Expire",
      count: nearToExpire.length,
      icon: <IoMdWarning />,
      gradient: "linear-gradient(135deg,rgb(246, 151, 35) 0%, #FFA500 100%)",
      description: "Items approaching expiration date",
    },
    {
      title: "Expired",
      count: expired.length,
      icon: <MdError />,
      gradient: "linear-gradient(135deg, #FF4433 0%, #FF6347 100%)",
      description: "Items past their expiration date",
    },
    {
      title: "Safe Zone",
      count: safeZone.length,
      icon: <MdVerified />,
      gradient: "linear-gradient(135deg, #32CD32 0%, #3CB371 100%)",
      description: "Items within safe period",
    },
  ];

  return (
    <Box sx={{ padding: { xs: "16px", md: "24px" } }}>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{
              animation: `fadeIn 0.5s ease-out ${index * 0.2}s forwards`,
              opacity: 0,
              "@keyframes fadeIn": {
                "0%": { opacity: 0, transform: "translateX(-20px)" },
                "100%": { opacity: 1, transform: "translateX(0)" },
              },
            }}
          >
            <Tooltip title={card.description} arrow placement="top">
              <StyledCard
                bgGradient={card.gradient}
                cardType={card.title}
                role="button"
                tabIndex={0}
                aria-label={`${card.title} status card showing ${card.count} items`}
                onClick={() => onCardClick && onCardClick(card.title)}
              >
                <IconWrapper style={{ color: "white" }}>{card.icon}</IconWrapper>
                <CountTypography style={{ color: "white" }}>{card.count}</CountTypography>
                <Typography variant="h6" style={{ color: "white" }} fontWeight="bold" gutterBottom>
                  {card.title}
                </Typography>
              </StyledCard>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatusDashboard;
