import React, { useEffect } from 'react';
import ProductCard from '../productCard/productCard'; 
import styles from './ProductShowcase.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../data/productsController/productsController'; // Importa la función para obtener los productos

interface ProductShowcaseProps {
  isAdmin?: boolean; 
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ isAdmin = false }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(); // Llamada a la API para obtener los productos
        console.log('Productos obtenidos:', data); // Muestra los productos en la consola
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    loadProducts(); // Ejecuta la función al montar el componente
  }, []);

  const handleClick = () => {
    if (isAdmin) {
      navigate(`/admin/edit-product/:id`);
    } else {
      navigate(`/product/:id`);
    }
  };

  return (
    <div className={styles.showcase} onClick={handleClick}>
      <ProductCard 
        productName="Nike Air Zoom" 
        productPrice="$120.00" 
        productGender="Zapatillas para hombre" 
      />
      <ProductCard 
        productName="Nike Air Max 270" 
        productPrice="$150.00" 
        productGender="Zapatillas para mujer" 
      />
      <ProductCard 
        productName="Nike React Infinity" 
        productPrice="$130.00" 
        productGender="Zapatillas para hombre" 
      />
      <ProductCard 
        productName="Nike Free Run 5.0" 
        productPrice="$110.00" 
        productGender="Zapatillas para mujer" 
      />
    </div>
  );
};

export default ProductShowcase;





