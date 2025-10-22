import axios from 'axios';

const useFetch = () => {
  const fetchData = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any
  ) => {
    try {
      const res = await axios({
        url,
        method,
        data,
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000,
      });
      return res.data;
    } catch (err) {
      console.error('API Error:', err);
      throw err; // throw so callers can handle it
    }
  };

  return { fetchData };
};

export default useFetch;