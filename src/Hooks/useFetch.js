import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const getTableData = async (url) => {
    setData([]);
    setError(false);
    if (url) {
      try {
        const streamObj = await fetch(url);
        if (streamObj.status === 200) {
          const resp = await streamObj.json();
          setData(resp);
          setLoading(false);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getTableData(url);
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
