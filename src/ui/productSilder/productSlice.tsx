import React, { useEffect, useState } from 'react';
import ProductCard from '../productCard/productCard'; 
import styles from './productSlice.module.css';
import { useNavigate } from 'react-router-dom';
import { ListarProductos } from '../../data/productsController/productsController';
import { Producto } from '../../types/IProducts';

interface ProductSliceProps {
  isAdmin?: boolean;
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
      const productosConStock = data.filter((p: Producto) => p.stock > 0);
      setProducts(productosConStock.slice(0, 8));
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
        <button className={`${styles.arrowButton} ${styles.left}`} onClick={handlePrev}>
          &lt;
        </button>
      )}

      <div className={styles.slice}>
        {getVisibleProducts()
          .filter((product): product is Producto & { id: number } => product.id !== undefined)
          .map((product) => (
            <div key={product.id} onClick={() => handleClick(product.id)}>
              <ProductCard
                productImage={product.imagen}
                productName={product.nombre}
                productPrice={`${product.precio}`}
                productDescripcion={`${product.descripcion}`}
              />
            </div>
          ))}
      </div>

      {total > visibleCount && (
        <button className={`${styles.arrowButton} ${styles.right}`} onClick={handleNext}>
          &gt;
        </button>
      )}
    </div>
  );
};

export default ProductSlice;
