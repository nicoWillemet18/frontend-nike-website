import React from 'react';
import styles from './ProductCard.module.css';
import imgCard from '../../assets/imgCard.png';

interface ProductCardProps {
  productName: string;
  productPrice: string;
  productGender: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ productName, productPrice, productGender }) => {
  return (
    <div className={styles.card}>
      <img src={imgCard} alt={productName} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.productName}>{productName}</h3>
        <h4 className={styles.productGender}>{productGender}</h4>
        <p className={styles.productPrice}>$ {productPrice}</p>
      </div>
    </div>
  );
};

export default ProductCard;

