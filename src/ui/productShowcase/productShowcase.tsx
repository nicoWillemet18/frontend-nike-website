import React, { useEffect, useState } from 'react';
import ProductCard from '../productCard/productCard'; 
import styles from './ProductShowcase.module.css';
import { useNavigate } from 'react-router-dom';
import { ListarProductos } from '../../data/productsController/productsController';
import { Producto } from '../../types/IProducts';

interface ProductShowcaseProps {
  isAdmin?: boolean; 
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Producto[]>([]);

  useEffect(() => {
  const loadProducts = async () => {
    try {
      const data = await ListarProductos(); 
      const productosConStock = data.filter((p: Producto) => p.stock > 0);
      setProducts(productosConStock.slice(0, 4));
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  loadProducts();
}, []);

  const handleClick = (id?: number) => {
    if (id === undefined) return;

    if (isAdmin) {
      navigate(`/admin/edit-product/${id}`);
    } else {
      navigate(`/product/${id}`);
    }
  };

  return (
    <div className={styles.showcase}>
      {products.map((product) => (
        product.id !== undefined && (
          <div key={product.id} onClick={() => handleClick(product.id)}>
            <ProductCard
              productImage={product.imagen}
              productName={product.nombre}
              productPrice={`${product.precio}`}
              productDescripcion={`${product.descripcion}`}
            />
          </div>
        )
      ))}
    </div>
  );
};

export default ProductShowcase;
