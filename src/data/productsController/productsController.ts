import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJOaWMiLCJpYXQiOjE3NDkyMjI0MTUsImV4cCI6MTc0OTMwODgxNX0.JxTwvUgt7jbenLmERUwlCg_QwHc_fYIEbMIH_x6snzk';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}api/productos`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
