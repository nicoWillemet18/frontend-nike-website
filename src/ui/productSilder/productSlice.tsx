import React, { useEffect, useState } from 'react';
import ProductCard from '../productCard/productCard'; 
import styles from './productSlice.module.css';
import { useNavigate } from 'react-router-dom';
import { ListarProductos } from '../../data/productsController/productsController';

interface ProductSliceProps {
  isAdmin?: boolean; 
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  genero: string;
}

const ProductSlice: React.FC<ProductSliceProps> = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Producto[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await ListarProductos();
        setProducts(data.slice(0, 8));
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    loadProducts();
  }, []);

  const total = products.length;

  if (total === 0) {
    return <p>Cargando productos...</p>;
  }

  const getVisibleProducts = () => {
    const visibleProducts = [];
    for (let i = 0; i < visibleCount; i++) {
      visibleProducts.push(products[(startIndex + i) % total]);
    }
    return visibleProducts;
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  const handleClick = (productId: number) => {
    if (isAdmin) {
      navigate(`/admin/edit-product/${productId}`);
    } else {
      navigate(`/product/${productId}`);
    }
  };

  return (
    <div className={styles.sliceContainer}>
      {total > visibleCount && (
        <button className={`${styles.arrowButton} ${styles.left}`} onClick={handlePrev}>&lt;</button>
      )}

      <div className={styles.slice}>
        {getVisibleProducts().map((product) => (
          <div key={product.id} onClick={() => handleClick(product.id)}>
            <ProductCard 
              productName={product.nombre} 
              productPrice={`${product.precio}`} 
              productGender={`Zapatillas para ${product.genero}`} 
            />
          </div>
        ))}
      </div>

      {total > visibleCount && (
        <button className={`${styles.arrowButton} ${styles.right}`} onClick={handleNext}>&gt;</button>
      )}
    </div>
  );
};

export default ProductSlice;
