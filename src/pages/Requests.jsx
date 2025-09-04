import React, { useEffect } from 'react';
import { useListRequests } from '../api/hooks/mutations';
import RequestsTable from '../components/RequestsTable';
import { Box, Typography } from '@mui/material';
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import FormDialog from '../components/Dialog';

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

function Requests() {
  const { listRequests, data, isLoading, error } = useListRequests();
  const [id, setId] = React.useState(null);
  const [itemId, setItemId] = React.useState(null);
  const [userId,  setUserId] = React.useState(null)
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState()
    
  useEffect(() => {
    listRequests({ page: 1, itemsPerpage: 5 });
  }, [listRequests]);

  useEffect(() => {
    console.log('API Response:', data);
  }, [data,category,id, category]);

  console.log('ccccccccccccccccccccccccccccccc',category)

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
                Certificate Requests
              </PageTitle>
              <PageSubtitle>
                Manage and track all SSL certificate and domain requests in one centralized location
              </PageSubtitle>
            </PageHeader>
          </motion.div>

          {/* Requests Table */}
          <motion.div variants={itemVariants}>
            <FormDialog userId = {userId}  category={category} itemId={itemId} id={id} edit={true} setOpen={setOpen} open={open} />
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
                  Loading requests...
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
                  Failed to load requests
                </Typography>
                <Typography sx={{ color: '#64748b', fontSize: '0.9rem' }}>
                  {error?.message || 'An error occurred while loading the data'}
                </Typography>
                <Button 
                  onClick={() => listRequests({ page: 1, itemsPerpage: 5 })}
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
              <RequestsTable setUserId={setUserId} setItemId={setItemId} setCategory={setCategory} setOpen={setOpen} id={id} setId={setId} data={data}/>
            )}
          </motion.div>
        </motion.div>
      </ContentWrapper>
    </PageContainer>
  );
}

export default Requests;
