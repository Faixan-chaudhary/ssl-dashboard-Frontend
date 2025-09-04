import React, { useEffect } from 'react';
import { useListLogs } from '../api/hooks/mutations';
import { Box, Typography, Button } from '@mui/material';
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import LogsTable from '../components/LogsTable';

const PageContainer = styled(Box)({
  minHeight: "100vh",
  background: "#f8fafc",
  padding: "24px 16px",
  position: "relative",
  overflow: "hidden",
});

const ContentWrapper = styled(Box)({
  position: "relative",
  zIndex: 1,
  maxWidth: "1400px",
  margin: "0 auto",
  width: "100%",
});

const PageHeader = styled(motion.div)({
  textAlign: "center",
  marginBottom: "32px",
  padding: "32px 0",
});

const PageTitle = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: 700,
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  marginBottom: "8px",
  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
});

const PageSubtitle = styled(Typography)({
  fontSize: "1.1rem",
  color: "#64748b",
  fontWeight: 500,
  maxWidth: "600px",
  margin: "0 auto",
  lineHeight: 1.6,
});

function Logs() {
  const { listLogs, data, isLoading, error } = useListLogs();

  useEffect(() => {
    listLogs({ page: 1, itemsPerpage: 5 });
  }, [listLogs]);

  useEffect(() => {
    console.log('API Response:', data);
  }, [data]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Page Header */}
          <motion.div variants={itemVariants}>
            <PageHeader>
              <PageTitle>
                Activity Logs
              </PageTitle>
              <PageSubtitle>
                Track and monitor all user activities and system events across the SSL dashboard
              </PageSubtitle>
            </PageHeader>
          </motion.div>

          {/* Logs Table */}
          <motion.div variants={itemVariants}>
            {isLoading ? (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '400px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}>
                <Typography sx={{ color: '#64748b', fontSize: '1.1rem' }}>
                  Loading activity logs...
                </Typography>
              </Box>
            ) : error ? (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '400px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <Typography sx={{ color: '#ef4444', fontSize: '1.1rem', fontWeight: 600 }}>
                  Failed to load logs
                </Typography>
                <Typography sx={{ color: '#64748b', fontSize: '0.9rem' }}>
                  {error?.message || 'An error occurred while loading the activity logs'}
                </Typography>
                <Button 
                  onClick={() => listLogs({ page: 1, itemsPerpage: 5 })}
                  sx={{ 
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd8, #6a4190)',
                    }
                  }}
                >
                  Try Again
                </Button>
              </Box>
            ) : (
              <LogsTable data={data} />
            )}
          </motion.div>
        </motion.div>
      </ContentWrapper>
    </PageContainer>
  );
}

export default Logs;
