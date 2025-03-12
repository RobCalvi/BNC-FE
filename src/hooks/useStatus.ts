import { useState } from 'react';

interface UseStatus {
  success: boolean;
  error: string | null;
  loading: boolean;
}

const useStatus = () => {
  const [status, setStatus] = useState<UseStatus>({
    success: false,
    error: null,
    loading: false,
  });

  const setLoading = (loading: boolean) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      loading,
    }));
  };

  const setSuccess = (success: boolean) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      success,
      error: null
    }));
  };

  const setError = (error: string | null) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      error,
      success: false,
    }));
  };

  return {
    status,
    setLoading,
    setSuccess,
    setError,
  }
}

export default useStatus;