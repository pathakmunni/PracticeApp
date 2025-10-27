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
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.error('API Error: status=', err.response?.status, 'data=', err.response?.data);
      } else {
        console.error('API Error (non-axios):', err);
      }
      throw err;
    }
  };

  return { fetchData };
};

export default useFetch;
