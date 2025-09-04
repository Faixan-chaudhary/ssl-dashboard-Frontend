import React from "react";
import { Box, Card, Grid, Typography, Tooltip, Chip } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { IoMdWarning } from "react-icons/io";
import { MdError, MdVerified } from "react-icons/md";
import { FiTrendingUp, FiTrendingDown, FiShield } from "react-icons/fi";

const StyledCard = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== 'bgGradient' && prop !== 'cardType'
})(({ bgGradient, cardType }) => ({
  padding: "24px 20px",
  borderRadius: "20px",
  background: bgGradient,
  width: "100%",
  minHeight: "160px",
  height: "auto",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  "&:hover::before": {
    opacity: 1,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
    opacity: 0,
    transition: "opacity 0.3s ease",
    transform: "scale(0)",
  },
  "&:hover::after": {
    opacity: 1,
    transform: "scale(1)",
  }
}));

const IconWrapper = styled(motion.div)({
  fontSize: "2.5rem",
  marginBottom: "12px",
  position: "relative",
  zIndex: 2,
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.2)",
    filter: "blur(20px)",
    zIndex: -1,
  }
});

const CountTypography = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: 800,
  marginBottom: "6px",
  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
  position: "relative",
  zIndex: 2,
  lineHeight: 1,
});

const TitleTypography = styled(Typography)({
  fontSize: "1rem",
  fontWeight: 600,
  marginBottom: "6px",
  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
  position: "relative",
  zIndex: 2,
  lineHeight: 1.2,
});

const StatusChip = styled(Chip)({
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  color: "#fff",
  fontWeight: 600,
  fontSize: "0.7rem",
  height: "20px",
  position: "relative",
  zIndex: 2,
  "& .MuiChip-label": {
    padding: "0 6px",
  }
});

const TrendIcon = styled(motion.div)({
  position: "absolute",
  top: "12px",
  right: "12px",
  fontSize: "1rem",
  opacity: 0.8,
  zIndex: 2,
});

const StatusDashboard = ({ data = [], onCardClick }) => {
  const nearToExpire = data && data.filter(item => Number(item.no_of_days) <= 30 && Number(item.no_of_days) > 0);
  const expired = data && data.filter(item => Number(item.no_of_days) <= 0);
  const safeZone = data && data.filter(item => Number(item.no_of_days) > 30);

  const cards = [
    {
      title: "Near to Expire",
      count: nearToExpire.length,
      icon: <IoMdWarning style={{ color: "#fff" }} />,
      gradient: "linear-gradient(135deg, #ff9500 0%, #ff6b35 100%)",
      description: "Certificates expiring within 30 days",
      status: "Warning",
      trend: "up",
      trendIcon: <FiTrendingUp style={{ color: "#fff" }} />
    },
    {
      title: "Expired",
      count: expired.length,
      icon: <MdError style={{ color: "#fff" }} />,
      gradient: "linear-gradient(135deg, #ff4757 0%, #ff3742 100%)",
      description: "Certificates past expiration date",
      status: "Critical",
      trend: "up",
      trendIcon: <FiTrendingUp style={{ color: "#fff" }} />
    },
    {
      title: "Safe Zone",
      count: safeZone.length,
      icon: <MdVerified style={{ color: "#fff" }} />,
      gradient: "linear-gradient(135deg, #2ed573 0%, #1e90ff 100%)",
      description: "Certificates with 30+ days remaining",
      status: "Secure",
      trend: "down",
      trendIcon: <FiTrendingDown style={{ color: "#fff" }} />
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const countVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.4,
        ease: "easeOut"
      }
    }
  };

  const trendVariants = {
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <Box sx={{ padding: { xs: "12px", md: "16px" }, marginBottom: "24px" }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        <Grid container spacing={2}>
          {cards.map((card, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
            >
              <Tooltip 
                title={card.description} 
                arrow 
                placement="top"
                componentsProps={{
                  tooltip: {
                    sx: {
                      background: "rgba(0, 0, 0, 0.8)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      padding: "8px 12px"
                    }
                  }
                }}
              >
                <StyledCard
                  bgGradient={card.gradient}
                  cardType={card.title}
                  role="button"
                  tabIndex={0}
                  aria-label={`${card.title} status card showing ${card.count} items`}
                  onClick={() => onCardClick && onCardClick(card.title)}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <TrendIcon
                    variants={trendVariants}
                    animate="animate"
                  >
                    {card.trendIcon}
                  </TrendIcon>

                  <IconWrapper
                    variants={iconVariants}
                    whileHover="hover"
                    style={{ color: "white" }}
                  >
                    {card.icon}
                  </IconWrapper>

                  <CountTypography 
                    style={{ color: "white" }}
                    variants={countVariants}
                  >
                    {card.count}
                  </CountTypography>

                  <TitleTypography style={{ color: "white" }}>
                    {card.title}
                  </TitleTypography>

                  <StatusChip
                    label={card.status}
                    size="small"
                  />
                </StyledCard>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default StatusDashboard;
