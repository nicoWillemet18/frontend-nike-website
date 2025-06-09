export interface ProductoEnCarrito {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  talle: string;
  imagen?: string;
  descripcion?: string;
}