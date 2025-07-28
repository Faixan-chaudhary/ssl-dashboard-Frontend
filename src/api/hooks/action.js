import { endpoints } from '../endpoints';
import Cookies from 'js-cookie'
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

const getAuthHeaders = () => {
    const storedToken = Cookies.get("token"); // Get token from cookies
  
    return {
      "Content-Type": "application/json",
      Authorization: storedToken ? `Bearer ${storedToken}` : "", // Use token dynamically
    };
  };
const getHeaders = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
});


// import Cookies from "js-cookie";

export const apiCreateDomainRequest = async (data, authToken) => {
  try {
    // Get user info from cookie
    const user = Cookies.get("user") || null;

    // Append user to the data payload
    const payload = {
      ...data,
      user, // add user field here
    };

    const response = await fetch(endpoints.domain.create, {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    return await response.json();
  } catch (error) {
    console.error("Create Domain failed:", error.message);
    return { error: error.message };
  }
};

// import Cookies from "js-cookie";

export const apiCreateSSLRequest = async (data, authToken) => {
  try {
    // Get user info from cookie
    const user = Cookies.get("user") || null;

    // Append user to the data payload
    const payload = {
      ...data,
      user, // add user field here
    };

    const response = await fetch(endpoints.ssl.create, {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    return await response.json();
  } catch (error) {
    console.error("Create SSL failed:", error.message);
    return { error: error.message };
  }
};

// import Cookies from "js-cookie";

export const apiUpdateDomainRequest = async (id, data) => {
  try {
    // Get user info from cookie
    const user = Cookies.get("user") || null;

    // Append user to the existing data payload
    const payload = {
      ...data,
      user, // add user field here
    };

    const response = await fetch(endpoints.domain.update(id), {
      method: "POST", // Consider using PUT for updates if your backend supports it
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.json();
  } catch (error) {
    console.error("Update Domain failed:", error.message);
    return { error: error.message };
  }
};


// import Cookies from "js-cookie";

export const apiUpdateSSLRequest = async (id, data) => {
  console.log('Payload data:', data);
  // Get user info from cookie
  const user = Cookies.get("user") || null;

  // Append user to data
  const payload = {
    ...data,
    user,
  };
  console.log('Paylddddddddddddddddddddddddddddddddddddoad:', payload);
  try {
    const response = await fetch(endpoints.ssl.update(id), {
      method: "POST", // consider PUT if your backend supports it for updates
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.json();
  } catch (error) {
    console.error("Update SSL failed:", error.message);
    return { error: error.message };
  }
};




// import Cookies from "js-cookie";

export const apiUpdateStatusSSL = async (id, data) => {
  console.log('Data payload:', data);
  console.log('Updating SSL status for ID:', id);

  // Get user info from cookie
  const user = Cookies.get("user") || null;

  // Append user to data
  const payload = {
    ...data,
    user,
  };

  try {
    const response = await fetch(endpoints.ssl.status.update(id), {
      method: "POST", // or PUT if your backend expects it
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.json();
  } catch (error) {
    console.error("Update SSL Status failed:", error.message);
    return { error: error.message };
  }
};





export const apiSendLoginRequest = async (data, authToken) => {
  try {
    const response = await fetch(endpoints.auth.login, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    return await response.json();
  } catch (error) {
    console.error('Login failed:', error.message);
    return { error: error.message };
  }
};
  
// import Cookies from "js-cookie";

export const requestRenewDomain = async (id) => {
  try {
    const user = Cookies.get("user") || null;

    const payload = {
      user,
    };

    const response = await fetch(endpoints.domain.requestRenew(id), {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    return await response.json();
  } catch (error) {
    console.error("Domain renewal request failed:", error.message);
    return { error: error.message };
  }
};



// export const apiSubmitOTP = async (data, authToken) => {
//   try {
//     const response = await fetch(endpoints.auth.verifyOtp, {
//       method: 'POST',
//       headers: getHeaders(),
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText);
//     }
//     return await response.json();
//   } catch (error) {
   
//     return { error: error.message };
//   }
// };
// export const apiSendEmail = async (data, authToken) => {
//   try {
//     const response = await fetch(endpoints.auth.sendEmail, {
//       method: 'POST',
//       headers: getHeaders(),
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText);
//     }
//     return await response.json();
//   } catch (error) {
//     return { error: error.message };
//   }
// };



// export const apiInviteUser = async (data, authToken) => {
//   try {
//     const response = await fetch(endpoints.email.inviteUser, {
//       method: 'POST',
//       headers: getHeaders(authToken),
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Email sending to invite user failed:', error.message);
//     return { error: error.message };
//   }
// };

// export const apiSendRegisterRequest = async (data, authToken) => {
//   try {
//     const response = await fetch(endpoints.auth.register, {
//       method: 'POST',
//       headers: getHeaders(),
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Registering failed:', error.message);
//     return { error: error.message };
//   }
// };

// export const apiSetNewPassword = async (data) => {
//   try {
//     const response = await fetch(endpoints.auth.setNewPassword, {
//       method: "POST",
//       headers: getHeaders(),
//       body: JSON.stringify(data),
//     });

//     const textResponse = await response.text(); // Read response as text

//     // Check if response is JSON
//     try {
//       const jsonResponse = JSON.parse(textResponse);
//       if (!response.ok) {
//         throw new Error(jsonResponse.message || "An error occurred.");
//       }
//       return jsonResponse;
//     } catch (jsonError) {
//       // If parsing fails, assume response is plain text
//       throw new Error(textResponse);
//     }
// } catch (error) {
//     console.error("Registering failed:", error.message);
//     return { error: error.message };
// }
// };

export const fetchSSL = async () => {
  try {
    const response = await fetch(endpoints.ssl.list, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    console.log('Response Status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Fetched SSL Data:', data);

    return data.data;
  } catch (error) {
    console.error('SSL fetch failed:', error.message);
    return { error: error.message };
  }
};
export const fetchDomain = async () => {
  try {
    const response = await fetch(endpoints.domain.list, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    console.log('Response Status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Fetched SSL Data:', data);

    return data.data;
  } catch (error) {
    console.error('SSL fetch failed:', error.message);
    return { error: error.message };
  }
};

export const fetchSSLByID = async (id) => {
    try {
      const response = await fetch(endpoints.ssl.get(id), {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      return await response.json();
    } catch (error) {
      console.error('SSL not found:', error.message);
      return { error: error.message };
    }
  };
  
  export const fetchDomainByID = async (id) => {
    try {
      const response = await fetch(endpoints.domain.get(id), {
        method: "GET",
        headers: getAuthHeaders(),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Get error message as text
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
  
      const data = await response.json();
      console.log("Fetched Domain Data:", data.data); // Log the parsed JSON response
      return data;
  
    } catch (error) {
      console.error("Domain not found:", error.message);
      return { error: error.message }; // Return error in a consistent format
    }
  };
  




  export const apiListRequesApi = async (data, authToken) => {
    try {
      const response = await fetch(endpoints.requests.list, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      return await response.json();
    } catch (error) {
      console.error('Create Domain failed:', error.message);
      return { error: error.message };
    }
  };
  export const apiListLogs = async (data, authToken) => {
    try {
      const response = await fetch(endpoints.logs.list, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      return await response.json();
    } catch (error) {
      console.error('Create Domain failed:', error.message);
      return { error: error.message };
    }
  };




  // export const requestRenewSSL = async (id) => {
  //   console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
  //   try {
  //     const response = await fetch(endpoints.ssl.requestRenew(id), {
  //       method: 'POST',
  //       headers: getAuthHeaders(),
  //     });
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(errorText);
  //     }
  //     return await response.json();
  //   } catch (error) {
  //     console.error('SSL not found:', error.message);
  //     return { error: error.message };
  //   }
  // };


// import Cookies from "js-cookie";

export const requestRenewSSL = async (payload) => {
  console.log("Sending SSL renewal request with transformed keys...");

  // Extract ssl/domain and rest of payload
  const { ssl, domain, ...rest } = payload;
  const name = ssl || domain || ""; // Pick whichever exists

  // Get user from cookie
  const user = Cookies.get("user") || null;

  const transformedPayload = {
    name,          // renamed from ssl/domain
    action: "renew", // added action key
    user,          // appended user from cookie
    ...rest,       // keep other keys as is
  };

  try {
    const response = await fetch(endpoints.ssl.requestRenew, {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformedPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.json();
  } catch (error) {
    console.error("SSL renewal error:", error.message);
    return { error: error.message };
  }
};



  




// export const apiSendLoginRequest = async (data, authToken) => {
//   try {
//     const response = await fetch(endpoints.auth.login, {
//       method: 'POST',
//       headers: getAuthHeaders(authToken),
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Login failed:', error.message);
//     return { error: error.message };
//   }
// };

// export const fetchTechnologies = async (
//   domainIds = [],
//   authToken = getHeaders(),
// ) => {
//   if (!authToken) {
//     throw new Error('Authorization token is missing');
//   }

//   const headers = authToken;

//   const body = {
//     domain_ids: domainIds.length > 0 ? domainIds : [],
//   };

//   const requestOptions = {
//     method: 'POST',
//     headers,
//     body: JSON.stringify(body),
//   };

//   try {
//     const response = await fetch(
//       endpoints.technologies.technology,
//       requestOptions,
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Technologies fetch failed:', error.message);
//     return { error: error.message };
//   }
// };

// export const fetchDomain = async authToken => {
//   if (!authToken) {
//     throw new Error('Authorization token is missing');
//   }
//   try {
//     const response = await fetch(endpoints.Domains.Domain, {
//       method: 'GET',
//       headers: getHeaders(authToken),
//     });
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Domain not found:', error.message);
//     return { error: error.message };
//   }
// };

// export const fetchCompanies = async (userId, authToken = getHeaders()) => {
//   if (!authToken) {
//     throw new Error('Authorization token is missing');
//   }
//   try {
//     const response = await fetch(endpoints.Companies.Company(userId), {
//       method: 'GET',
//       headers: getHeaders(authToken),
//     });
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Company not found:', error.message);
//     return { error: error.message };
//   }
// };

// export const fetchCompanyRange = async authToken => {
//   if (!authToken) {
//     throw new Error('Authorization token is missing');
//   }
//   try {
//     const response = await fetch(endpoints.Companies.Range, {
//       method: 'GET',
//       headers: getHeaders(authToken),
//     });
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Range not found:', error.message);
//     return { error: error.message };
//   }
// };

// export const addCompanyRequest = async (data, authToken = getHeaders()) => {
//   if (!authToken) {
//     throw new Error('Authorization token is missing');
//   }
//   console.log(data);
//   try {
//     const response = await fetch(endpoints.Companies.AddCompany, {
//       method: 'POST',
//       headers: getHeaders(),
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Add Company failed:', error.message);
//     return { error: error.message };
//   }
// };

// export const addProjectRequest = async (data, authToken) => {
//   try {
//     const response = await fetch(endpoints.Projects.AddProject, {
//       method: 'POST',
//       headers: getHeaders(authToken),
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('add project  failed:', error.message);
//     return { error: error.message };
//   }
// };

// export const fetchProjects = async (
//   userId,
//   organizationId,
//   authToken = getHeaders(),
// ) => {
//   if (!authToken) {
//     throw new Error('Authorization token is missing');
//   }
//   try {
//     const response = await fetch(
//       endpoints.Projects.project(userId, organizationId),
//       {
//         method: 'GET',
//         headers: getHeaders(authToken),
//       },
//     );
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('projects not found:', error.message);
//     return { error: error.message };
//   }
// };
