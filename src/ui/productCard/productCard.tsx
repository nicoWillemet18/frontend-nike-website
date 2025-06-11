import React from 'react';
import styles from './productCard.module.css';

interface ProductCardProps {
  productImage: string;
  productName: string;
  productPrice: string;
  productDescripcion: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ productImage, productName, productPrice, productDescripcion }) => {
  return (
    <div className={styles.card}>
      <img src={productImage} alt={productName} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.productName}>{productName}</h3>
        <h4 className={styles.productGender}>{productDescripcion}</h4>
        <p className={styles.productPrice}>$ {productPrice}</p>
      </div>
    </div>
  );
};

export default ProductCard;

