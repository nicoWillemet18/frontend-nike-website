import axios from 'axios';
import { RegisterUserData } from '../../types/IRegisterUserData';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}auth/register`;

export const registerUser = async (userData: RegisterUserData) => {
  try {
    const dataToSend = {
      ...userData,
      rol: userData.rol || 'CLIENT',
    };

    const response = await axios.post(API_URL, dataToSend);

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Ocurrió un error al registrar el usuario';
    throw errorMessage;
  }
};

export const loginUser = async (credentials: { usuario: string; password: string }) => {
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}auth/login`;

  try {
    const response = await axios.post(API_URL, credentials);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Usuario o contraseña incorrectos';
    throw errorMessage;
  }
};
