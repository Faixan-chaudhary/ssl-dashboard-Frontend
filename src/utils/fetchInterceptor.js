import { handleUnauthorizedError } from './authHandler';

// Store the original fetch function
const originalFetch = window.fetch;

// Create a custom fetch function that intercepts responses
const customFetch = async (...args) => {
  try {
    const response = await originalFetch(...args);
    
    // Check if the response is a 401 error
    if (response.status === 401) {
      console.log('401 Unauthorized detected in fetch interceptor');
      handleUnauthorizedError();
      return response; // Return the response so the calling code can handle it if needed
    }
    
    return response;
  } catch (error) {
    // If it's a network error or other error, check if it's related to 401
    if (error.message?.includes('Unauthorized') || error.message?.includes('401')) {
      console.log('401 Unauthorized detected in fetch interceptor (error)');
      handleUnauthorizedError();
    }
    throw error;
  }
};

// Replace the global fetch with our custom one
export const setupFetchInterceptor = () => {
  window.fetch = customFetch;
  console.log('Fetch interceptor setup complete');
};

// Function to restore the original fetch (useful for testing)
export const restoreOriginalFetch = () => {
  window.fetch = originalFetch;
  console.log('Original fetch restored');
};
