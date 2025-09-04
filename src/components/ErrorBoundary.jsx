import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { handleUnauthorizedError } from '../utils/authHandler';
import { FiAlertTriangle, FiRefreshCw, FiHome, FiMail } from 'react-icons/fi';

const ErrorContainer = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  position: 'relative',
  overflow: 'hidden',
});

const ErrorCard = styled(motion.div)({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  padding: '48px',
  maxWidth: '500px',
  width: '100%',
  textAlign: 'center',
  position: 'relative',
  zIndex: 1,
});

const ErrorIcon = styled(Box)({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px',
  boxShadow: '0 8px 24px rgba(239, 68, 68, 0.3)',
  '& svg': {
    color: 'white',
    fontSize: '32px',
  }
});

const ActionButton = styled(motion.button)({
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  padding: '12px 24px',
  fontSize: '0.9rem',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  margin: '8px',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
  }
});

const SecondaryButton = styled(motion.button)({
  background: 'rgba(255, 255, 255, 0.9)',
  color: '#64748b',
  border: '2px solid #e2e8f0',
  borderRadius: '12px',
  padding: '12px 24px',
  fontSize: '0.9rem',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.3s ease',
  margin: '8px',
  '&:hover': {
    background: '#f8fafc',
    borderColor: '#cbd5e1',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  }
});

const FloatingElement = styled(motion.div)({
  position: 'absolute',
  width: '200px',
  height: '200px',
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
  borderRadius: '50%',
  filter: 'blur(40px)',
  zIndex: 0,
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorId: null,
      retryCount: 0 
    };
  }

  static getDerivedStateFromError(error) {
    return { 
      hasError: true, 
      error,
      errorId: `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error with more context
    console.error('Error caught by boundary:', {
      error: error.message,
      stack: error.stack,
      errorInfo,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
    
    // Check if it's a 401 error
    if (error.message?.includes('Unauthorized') || 
        error.message?.includes('401') || 
        error.status === 401) {
      handleUnauthorizedError();
    }

    // You could send this to your error tracking service here
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleContactSupport = () => {
    const subject = encodeURIComponent(`SSL Dashboard Error Report - ${this.state.errorId}`);
    const body = encodeURIComponent(`
Error Details:
- Error ID: ${this.state.errorId}
- URL: ${window.location.href}
- Time: ${new Date().toISOString()}
- Browser: ${navigator.userAgent}

Please describe what you were doing when this error occurred:
    `);
    window.open(`mailto:support@yourcompany.com?subject=${subject}&body=${body}`);
  };

  getErrorMessage = () => {
    const { error } = this.state;
    
    if (error?.message?.includes('Network') || error?.message?.includes('fetch')) {
      return {
        title: 'Connection Issue',
        message: 'We\'re having trouble connecting to our servers. This might be due to a network issue or temporary service disruption.',
        suggestion: 'Please check your internet connection and try again.'
      };
    }
    
    if (error?.message?.includes('Unauthorized') || error?.message?.includes('401')) {
      return {
        title: 'Authentication Required',
        message: 'Your session has expired or you need to log in again.',
        suggestion: 'Please log in to continue using the dashboard.'
      };
    }
    
    return {
      title: 'Unexpected Error',
      message: 'Something unexpected happened while loading this page. Our team has been notified and is working to resolve this issue.',
      suggestion: 'You can try refreshing the page or contact our support team for assistance.'
    };
  };

  render() {
    if (this.state.hasError) {
      const errorInfo = this.getErrorMessage();
      
      const buttonVariants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95, transition: { duration: 0.1 } }
      };

      return (
        <ErrorContainer>
          {/* Floating background elements */}
          <FloatingElement
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ top: '10%', left: '10%' }}
          />
          <FloatingElement
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            style={{ bottom: '20%', right: '15%' }}
          />

          <ErrorCard
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ErrorIcon>
              <FiAlertTriangle />
            </ErrorIcon>

            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: '#1a202c',
                marginBottom: '16px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {errorInfo.title}
            </Typography>

            <Typography 
              variant="body1" 
              sx={{ 
                color: '#64748b', 
                marginBottom: '24px',
                lineHeight: 1.6,
                fontSize: '1rem'
              }}
            >
              {errorInfo.message}
            </Typography>

            <Typography 
              variant="body2" 
              sx={{ 
                color: '#94a3b8', 
                marginBottom: '32px',
                fontStyle: 'italic',
                fontSize: '0.9rem'
              }}
            >
              {errorInfo.suggestion}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
              <ActionButton
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={this.handleRetry}
              >
                <FiRefreshCw size={16} />
                Try Again
              </ActionButton>

              <SecondaryButton
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={this.handleGoHome}
              >
                <FiHome size={16} />
                Go Home
              </SecondaryButton>

              <SecondaryButton
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={this.handleContactSupport}
              >
                <FiMail size={16} />
                Contact Support
              </SecondaryButton>
            </Box>

            <Typography 
              variant="caption" 
              sx={{ 
                color: '#cbd5e1', 
                marginTop: '24px',
                display: 'block',
                fontSize: '0.75rem'
              }}
            >
              Error ID: {this.state.errorId}
            </Typography>
          </ErrorCard>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
