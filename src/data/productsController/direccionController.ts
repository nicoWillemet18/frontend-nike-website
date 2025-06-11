import axios from 'axios';
import { Direccion } from '../../types/direccion';
import { UsuarioDireccion } from '../../types/usuarioDireccion';

const API_URL = import.meta.env.VITE_API_BASE_URL;


export const ListarDirecciones = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}api/direcciones`,{
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const CrearDireccion = async (nuevaDireccion: Direccion) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}api/direcciones`, nuevaDireccion, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      }
    });
    console.log('Direccion creada:', response.data);
    return response;
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

export const AsignarDireccion = async (usuarioDireccion: UsuarioDireccion) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}api/usuario-direcciones`, usuarioDireccion, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      }
    });
    console.log('Direccion asignada a usuario:', response.data);
    return response;
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

export const ListarDireccionByID = async (id: number) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}api/direcciones/${id}`,{
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching direccion by ID:', error);
    throw error;
  }
};


