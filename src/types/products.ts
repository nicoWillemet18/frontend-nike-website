    import { Talle } from './talles'

    export interface Producto {
    id?: number
    nombre: string;
    categoriaId: number;
    color: number;
    precio: number;
    descripcion: string;
    imagen: string;
    estado: boolean;
    genero: string;
    stock: number;
    talles: Talle[];
    
    }