import { API_URL } from './constant';

export const baseUrl = API_URL;

export const endpoints = {
    auth: {
      register: `${baseUrl}/auth/register`,
      login: `${baseUrl}/auth/login`,
      verifyOtp: `${baseUrl}/auth/verify-user`,
      verify: `${baseUrl}/ENDPOINT`,
      update: (userId) => `${baseUrl}/ENDPOINT/${userId}`,
      role: `${baseUrl}/api/Auth/Roles`,
      sendEmail: `${baseUrl}/auth/forgot-password`,
      setNewPassword: `${baseUrl}/auth/reset-password`,
    },
    ssl: {
      create: `${baseUrl}/ssl/create_ssl`,
      update:  (id) => `${baseUrl}/ssl/update_ssl/${id}`,
      list: `${baseUrl}/ssl/ssl_list`,
      get: (id) => `${baseUrl}/ssl/find_ssl/${id}`,
      delete: (id) => `${baseUrl}/ssl/delete_ssl/${id}`,
      // requestRenew: (id) => `${baseUrl}/approve_ssl/${id}`,
      status: {
        update:  (id) =>   `${baseUrl}/user/approve_ssl/${id}`,
      },
      requestRenew: `${baseUrl}/user/add_request`,
    },
    
    domain: {
      create: `${baseUrl}/domain/create_domain`,
      update:  (id) => `${baseUrl}/domain/update_domain/${id}`,
      list: `${baseUrl}/domain/domain_list`,
      get: (id) => `${baseUrl}/domain/find_domain/${id}`,
      requestRenew: (id) => `${baseUrl}/approve_domain/${id}`,
    },
    requests: {
      
      list: `${baseUrl}/user/request_list`,
  
    },
    logs: {
      
      list: `${baseUrl}/user/activity_logs`,
  
    },
  };
  
