import axios from 'axios';
import { OrdenCompra } from '../../types/ordenCompra';

const API_URL = import.meta.env.VITE_API_BASE_URL;



export const CrearOdenCompra = async (nuevaOrden: OrdenCompra) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}pay/mp`, nuevaOrden, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      }
    });
    console.log('Orden de compra creada:', response.data);
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

export const ActualizarOrdenCompraByPreferenceId = async (preferenceId: string, status: string) => {
  try {
    const token = localStorage.getItem('token');
    await axios.patch(
      `${API_URL}pay/update-status/preference/${preferenceId}?nuevoEstado=${status}`,
      null, // o {} si tu endpoint espera un body vacío
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Orden de compra actualizada:');
    return true;
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

export const ListarOrdenesCompra = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}api/ordenes`,{
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching ordenes:', error);
    throw error;
  }
};