import { useState, useEffect } from 'react';
import axios, { Method } from 'axios';

// @ts-ignore
interface UseFetchParams<T> {
  url: string;
  method?: Method;
  body?: any;
  headers?: Record<string, string>;
}

const useFetch = <T,>({ url, method = 'GET', body, headers }: UseFetchParams<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (data) return;
      setLoading(true);
      setError(null);
      try {
        const response = await axios({
          url,
          method,
          data: body,
          headers,
        });
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error('An unknown error occurred'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, headers]);

  return { data, loading, error, setData };
};

export default useFetch;
