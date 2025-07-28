import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiSendLoginRequest,
  apiCreateSSLRequest,
  apiCreateDomainRequest,
  fetchSSL,
  fetchDomain,
  fetchSSLByID,
  fetchDomainByID,
  apiListRequesApi,
  apiListLogs,
  apiUpdateSSLRequest,
  apiUpdateDomainRequest,
  requestRenewSSL,
  requestRenewDomain,
  apiUpdateStatusSSL
} from "./action";
import { useQuery } from "@tanstack/react-query";

import Cookies from "js-cookie";

export const useLogin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: apiSendLoginRequest,
    onSuccess: (data) => {
      console.log("User Login Successful:", data);
      if (data?.token) {
        Cookies.set("token", data.token, { expires: 3 });
        Cookies.set("userType", data.user, { expires: 3 });
         Cookies.set("user", data.name, { expires: 3 });
        queryClient.setQueryData(["userData"], data);
        queryClient.invalidateQueries(["userData"]);
      }
    },
    onError: (error) => {
      console.error("Error Logging in:", error);
    },
  });

  return {
    loginUser: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useCreateSSL = () => {
  const mutation = useMutation({
    mutationFn: apiCreateSSLRequest,
    onSuccess: (data) => {
      console.log("User registered:", data);

      // queryClient.setQueryData(['invitedUser'], data);
    },
    onError: (error) => {
      console.error("Error Registering user:", error);
    },
  });

  return {
    createSSL: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
export const useCreateDomain = () => {
  const mutation = useMutation({
    mutationFn: apiCreateDomainRequest,
    onSuccess: (data) => {
      console.log("User registered:", data);

      // queryClient.setQueryData(['invitedUser'], data);
    },
    onError: (error) => {
      console.error("Error Registering user:", error);
    },
  });

  return {
    createDomain: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
export const useUpdateSSL = () => {
  const mutation = useMutation({
    mutationFn: ({ id, data }) => apiUpdateSSLRequest(id, data),
    onSuccess: (data) => {
      console.log("SSL updated:", data);
    },
    onError: (error) => {
      console.error("Error updating SSL:", error);
    },
  });

  return {
    updateSSL: (id, data) => mutation.mutateAsync({ id, data }),
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
export const useUpdateStatusSSL = () => {
  const mutation = useMutation({
 
    mutationFn: ({ id, data }) => apiUpdateStatusSSL({ id, data }),
    onSuccess: (data) => {
      console.log("SSL status updated:", data);
    },
    onError: (error) => {
      console.error("Error updating SSL:", error);
    },
  });

  return {
    updateStatusSSL: (id, data) => mutation.mutateAsync({ id, data }),
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useUpdateDomain = () => {
  const mutation = useMutation({
    mutationFn: ({ id, data }) => apiUpdateDomainRequest(id, data),
    onSuccess: (data) => {
      console.log("Domain updated:", data);
    },
    onError: (error) => {
      console.error("Error updating domain:", error);
    },
  });

  return {
    updateDomain: (id, data) => mutation.mutateAsync({ id, data }),
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useSetNewPassword = () => {
  const mutation = useMutation({
    mutationFn: apiSetNewPassword,
    onSuccess: (data) => {
      console.log("User registered:", data);
    },
    onError: (error) => {
      console.error("Error Registering user:", error);
    },
  });

  return {
    setNewPassword: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useSSL = () => {
  const queryClient = useQueryClient();

  const { data, error, refetch, isLoading, isError } = useQuery({
    queryKey: ["ssl"],
    queryFn: fetchSSL,
    onSuccess: (data) => {
      queryClient.setQueryData(["sslList"], data);
    },
    onError: (error) => {
      console.error("Error fetching assessment:", error);
    },
  });

  return {
    data,
    refetch,
    error,
    isLoading,
    isError,
  };
};
export const useDomain = () => {
  const queryClient = useQueryClient();

  const { data, error, refetch, isLoading, isError } = useQuery({
    queryKey: ["domain"],
    queryFn: fetchDomain,
    onSuccess: (data) => {
      queryClient.setQueryData(["domainList"], data);
    },
    onError: (error) => {
      console.error("Error fetching assessment:", error);
    },
  });

  return {
    data,
    refetch,
    error,
    isLoading,
    isError,
  };
};

export const useSSLById = (id, options = {}) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["ssl", id],
    queryFn: () => fetchSSLByID(id),
    enabled: !!id,
    onSuccess: (data) => {
      queryClient.setQueryData(["sslById", id], data);
    },
    onError: (error) => {
      console.error("Error fetching SSL:", error);
    },
    ...options,
  });

  return {
    data,
    error,
    isLoading,
    isError,
    refetch,
  };
};

export const useDomainByID = (id, options = {}) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["domain", id],
    queryFn: () => fetchDomainByID(id),
    enabled: !!id,
    onSuccess: (data) => {
      queryClient.setQueryData(["domainById", id], data);
    },
    onError: (error) => {
      console.error("Error fetching domain:", error);
    },
    ...options,
  });

  return {
    data,
    error,
    isLoading,
    isError,
    refetch,
  };
};

export const useListRequests = () => {
  const mutation = useMutation({
    mutationFn: apiListRequesApi,
    onSuccess: (data) => {
      console.log("listRequests:", data);

      // queryClient.setQueryData(['invitedUser'], data);
    },
    onError: (error) => {
      console.error("Error listRequests:", error);
    },
  });

  return {
    listRequests: mutation.mutate,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};



export const useListLogs = () => {
  const mutation = useMutation({
    mutationFn: apiListLogs,
    onSuccess: (data) => {
      console.log("listLogs:", data);

      // queryClient.setQueryData(['invitedUser'], data);
    },
    onError: (error) => {
      console.error("Error listLogs:", error);
    },
  });

  return {
    listLogs: mutation.mutate,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};





export const useRequestRenewSSL = (options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => requestRenewSSL(id),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["sslById", variables], data);
    },
    onError: (error) => {
      console.error("Error renewing SSL:", error);
    },
    ...options,
  });

  return {
    requestRenewSSL: mutation.mutate,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};


export const useRequestRenewDomain = (options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => requestRenewDomain(id),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["domainById", variables], data);
    },
    onError: (error) => {
      console.error("Error renewing domain:", error);
    },
    ...options,
  });

  return {
    requestRenewDomain: mutation.mutate,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
