import axios from 'axios';
import { Producto } from '../../types/products';

const API_URL = import.meta.env.VITE_API_BASE_URL;
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuaWNvMjAzMCIsImlhdCI6MTc0OTUwODQwMiwiZXhwIjoxNzQ5NTk0ODAyfQ.U6GKDMqR75BjR5sZXmZ7t_NaBfOBPueDEoKO_SZWzEM';

// Listar todos los productos
export const ListarProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}api/productos`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Crear nuevo producto
export const CrearProducto = async (nuevoProducto: Producto) => {
  try {
    const response = await axios.post(`${API_URL}api/productos`, nuevoProducto, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Producto creado:', response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error de Axios:', error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error('Error general:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
};

// Producto por id
export const ListarProductoByID = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}api/productos/${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};


