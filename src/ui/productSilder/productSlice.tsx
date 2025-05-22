import React, { useState } from 'react';
import ProductCard from '../productCard/productCard'; 
import styles from './ProductSlice.module.css';
import { useNavigate } from 'react-router-dom';

interface ProductSliceProps {
  isAdmin?: boolean; 
}

const ProductSlice: React.FC<ProductSliceProps> = ({ isAdmin = false }) => {
  const navigate = useNavigate();

  const products = [
    { productName: "Nike Air Zoom", productPrice: "$120.00", productGender: "Zapatillas para hombre", size: "small" },
    { productName: "Nike Air Max 270", productPrice: "$150.00", productGender: "Zapatillas para mujer", size: "small" },
    { productName: "Nike React Infinity", productPrice: "$130.00", productGender: "Zapatillas para hombre", size: "small" },
    { productName: "Nike Free Run 5.0", productPrice: "$110.00", productGender: "Zapatillas para mujer", size: "small" },
    { productName: "Nike C1TY", productPrice: "$120.00", productGender: "Zapatillas para hombre", size: "small" },
    { productName: "Air Max 10", productPrice: "$150.00", productGender: "Zapatillas para mujer", size: "small" },
    { productName: "Nike Mountain", productPrice: "$130.00", productGender: "Zapatillas para hombre", size: "small" },
    { productName: "Nike Jordan", productPrice: "$110.00", productGender: "Zapatillas para mujer", size: "small" },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  const total = products.length;

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

  const handleClick = (index: number) => {
    if (isAdmin) {
      navigate(`/admin/edit-product/${index}`);
    } else {
      navigate(`/product/${index}`);
    }
  };

  return (
    <div className={styles.sliceContainer}>
      <button className={`${styles.arrowButton} ${styles.left}`} onClick={handlePrev}>&lt;</button>

      <div className={styles.slice}>
        {getVisibleProducts().map((product, i) => (
          <div key={startIndex + i} onClick={() => handleClick((startIndex + i) % total)}>
            <ProductCard 
              productName={product.productName} 
              productPrice={product.productPrice} 
              productGender={product.productGender} 
            />
          </div>
        ))}
      </div>

      <button className={`${styles.arrowButton} ${styles.right}`} onClick={handleNext}>&gt;</button>
    </div>
  );
};

export default ProductSlice;
