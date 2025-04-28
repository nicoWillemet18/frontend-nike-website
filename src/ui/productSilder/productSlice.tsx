import React from 'react';
import ProductCard from '../productCard/productCard'; 
import styles from './ProductSlice.module.css';

const ProductSlice: React.FC = () => {
  const products = [
    { 
      productName: "Nike Air Zoom", 
      productPrice: "$120.00", 
      productGender: "Zapatillas para hombre", 
      size: "small"
    },
    { 
      productName: "Nike Air Max 270", 
      productPrice: "$150.00", 
      productGender: "Zapatillas para mujer", 
      size: "small"
    },
    { 
      productName: "Nike React Infinity", 
      productPrice: "$130.00", 
      productGender: "Zapatillas para hombre", 
      size: "small"
    },
    { 
      productName: "Nike Free Run 5.0", 
      productPrice: "$110.00", 
      productGender: "Zapatillas para mujer", 
      size: "small"
    },
  ];

  return (
    <div className={styles.sliceContainer}>
      <button className={`${styles.arrowButton} ${styles.left}`}>&lt;</button>

      <div className={styles.slice}>
        {products.map((product, index) => (
          <ProductCard 
            key={index} 
            productName={product.productName} 
            productPrice={product.productPrice} 
            productGender={product.productGender} 
            size="small"
          />
        ))}
      </div>

      <button className={`${styles.arrowButton} ${styles.right}`}>&gt;</button>
    </div>
  );
};

export default ProductSlice;
