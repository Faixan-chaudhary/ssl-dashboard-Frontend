// Dynamic API URL configuration
const getApiUrl = () => {
  console.log('Current hostname:', window.location.hostname);
  console.log('Current protocol:', window.location.protocol);
  console.log('Current location:', window.location.href);
  
  // Check if we're accessing through ngrok (HTTPS)
  if (window.location.hostname.includes('ngrok-free.app') && window.location.protocol === 'https:') {
    console.log('Detected HTTPS ngrok access, using relative URL');
    // Use relative URL since backend will serve both frontend and API
    return '';
  }
  
  // For local development, use the environment variable
  const localUrl = import.meta.env.VITE_BACKEND_BASEURL || 'http://localhost:5000';
  console.log('Using local URL:', localUrl);
  return localUrl;
};

export const API_URL = getApiUrl();
console.log('Final API_URL:', API_URL);

// Also export a function to get the API URL dynamically
export const getDynamicApiUrl = () => {
  if (window.location.hostname.includes('ngrok-free.app') && window.location.protocol === 'https:') {
    return '';
  }
  return import.meta.env.VITE_BACKEND_BASEURL || 'http://localhost:5000';
};
