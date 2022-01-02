import { useEffect, useState } from "react";

interface State<T> {
  data?: T;
  error?: Error;
}
function useFetch<T = unknown>(url?: string, options?: RequestInit): State<T> {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setData(undefined);
      setError(undefined);

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as T;

        setData(data);
      } catch (error) {
        setError(error as Error);
      }
    };

    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, error };
}

export default useFetch;
