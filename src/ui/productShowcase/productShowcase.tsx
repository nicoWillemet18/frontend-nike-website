import React, { useEffect, useState } from 'react';
import ProductCard from '../productCard/productCard'; 
import styles from './productShowcase.module.css';
import { useNavigate } from 'react-router-dom';
import { ListarProductos } from '../../data/productsController/productsController';

interface ProductShowcaseProps {
  isAdmin?: boolean; 
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  genero: string;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Producto[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await ListarProductos(); 
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    loadProducts();
  }, []);

  const handleClick = (id: number) => {
    if (isAdmin) {
      navigate(`/admin/edit-product/${id}`);
    } else {
      navigate(`/product/${id}`);
    }
  };

  return (
    <div className={styles.showcase}>
      {products.map((product) => (
        <div key={product.id} onClick={() => handleClick(product.id)}>
          <ProductCard
            productName={product.nombre}
            productPrice={`${product.precio}`}
            productGender={`Zapatillas para ${product.genero}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductShowcase;
