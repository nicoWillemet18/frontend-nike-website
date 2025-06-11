    import { Talle } from './ITalles'

    export interface Producto {
    id?: number
    nombre: string;
    categoriaId: number;
    precio: number;
    descripcion: string;
    imagen: string;
    estado: boolean;
    genero: string;
    stock: number;
    talles: Talle[];
    
    }