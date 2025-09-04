import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

// Function to clear all authentication data
export const clearAuthData = () => {
  // Clear all cookies
  Cookies.remove('token');
  Cookies.remove('userType');
  Cookies.remove('user');
  Cookies.remove('authToken');
  
  // Clear localStorage if any auth data is stored there
  localStorage.removeItem('token');
  localStorage.removeItem('userType');
  localStorage.removeItem('user');
  localStorage.removeItem('authToken');
  
  // Clear sessionStorage if any auth data is stored there
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userType');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('authToken');
};

// Function to handle 401 unauthorized errors
export const handleUnauthorizedError = () => {
  console.log('Unauthorized error detected. Logging out user...');
  
  // Show notification to user
  toast.warning('Session expired. Redirecting to login...', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: {
      background: "linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(245, 158, 11, 0.2))",
      color: "white",
      borderRadius: "16px",
      border: "1px solid rgba(245, 158, 11, 0.3)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    },
  });
  
  // Clear all authentication data
  clearAuthData();
  
  // Small delay to show the toast before redirecting
  setTimeout(() => {
    window.location.href = '/';
  }, 1000);
};

// Function to check if response is unauthorized
export const isUnauthorizedResponse = (response) => {
  return response.status === 401;
};

// Enhanced fetch wrapper that handles 401 errors automatically
export const authenticatedFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    
    // Check if response is unauthorized
    if (isUnauthorizedResponse(response)) {
      handleUnauthorizedError();
      throw new Error('Unauthorized - Redirecting to login');
    }
    
    return response;
  } catch (error) {
    // If it's a network error or other error, still check if we should logout
    if (error.message.includes('Unauthorized') || error.message.includes('401')) {
      handleUnauthorizedError();
    }
    throw error;
  }
};

// Function to handle API response and check for 401 errors
export const handleApiResponse = async (response) => {
  if (isUnauthorizedResponse(response)) {
    handleUnauthorizedError();
    throw new Error('Unauthorized - Redirecting to login');
  }
  
  return response;
};
