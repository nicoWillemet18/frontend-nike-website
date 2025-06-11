import axios from 'axios';
import { Producto } from '../../types/IProducts';

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Listar todos los productos
export const ListarProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}api/productos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Crear nuevo producto
export const CrearProducto = async (nuevoProducto: Producto) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}api/productos`, nuevoProducto, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
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
    const response = await axios.get(`${API_URL}api/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

// Editar Producto
export const EditarProducto = async (id: number, productoData: any) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    const response = await axios.put(`${API_URL}api/productos/${id}`, productoData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al editar el producto:', error);
    throw error;
  }
};


