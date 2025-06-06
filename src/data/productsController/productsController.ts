import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}productos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
