import { IImage } from "../../types/IImage";

const TOKEN  = localStorage.getItem('token');

const URL_API = import.meta.env.VITE_API_BASE_URL;

// Función para obtener las imágenes desde la API
export const getImages = async (): Promise<IImage[]> => {
  const res = await fetch(`${URL_API}images/getImages`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  const data = await res.json();
  return data;
};

// Función para subir múltiples archivos al servidor
export const uploadImages = async (files: FileList): Promise<Response> => {
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append("uploads", file);
  });

  const response = await fetch(`${URL_API}images/uploads`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    body: formData,
  });

  return response;
};

// Función para eliminar una imagen del servidor
export const deleteImage = async (
  uuid: string,
  publicId: string,
  folderName?: string
): Promise<Response> => {
  const formData = new FormData();
  formData.append("uuid", uuid);
  formData.append(
    "publicId",
    `${folderName && folderName.length > 0 ? `${folderName}/` : ""}${publicId}`
  );

  const response = await fetch(`${URL_API}images/deleteImg`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    body: formData,
  });

  return response;
};
