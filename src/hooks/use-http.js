import { useCallback, useState } from "react";

export default function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async ({ url, method = "GET", body = null, headers = {} }, applyData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        applyData(responseData);
      } catch (error) {
        setError(error.message || "Something went wrong.");
      }
      setIsLoading(false);
    },
    []
  );

  return { isLoading, error, sendRequest };
}
