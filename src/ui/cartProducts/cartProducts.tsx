import React from 'react';
import styles from './cartProducts.module.css';
import imgCard from '../../assets/imgCard.png';

interface Product {
  id: number;
  img: string;
  name: string;
  description: string;
  size: string;
  quantity: number;
  price: number;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    img: imgCard,
    name: 'Nike Court Vision Low Next Natura',
    description: 'Zapatillas urbanas para hombre',
    size: '40',
    quantity: 1,
    price: 259999,
  },
  {
    id: 2,
    img: imgCard,
    name: 'Nike C1TY',
    description: 'Zapatillas urbanas para hombre',
    size: '42',
    quantity: 2,
    price: 399999,
  },
  {
    id: 3,
    img: imgCard,
    name: 'Nike Court Vision Low Next Natura',
    description: 'Zapatillas urbanas para hombre',
    size: '42',
    quantity: 5,
    price: 259999,
  },
  {
    id: 4,
    img: imgCard,
    name: 'Nike C1TY',
    description: 'Zapatillas urbanas para hombre',
    size: '42',
    quantity: 1,
    price: 399999,
  },
];

const cartProducts: React.FC = () => {

  return (
  <div className={styles.cartConainer}>
  <h2 className={styles.cartTitle}>Carrito de Compras</h2>
  <div className={styles.cartTable}>
      {sampleProducts.map((product) => (
        <div key={product.id} className={styles.row}>
          <div>
            <img src={product.img} alt={product.name} className={styles.image} />
          </div>
          <div className={styles.details}>
            <div className={styles.name}>{product.name}</div>
            <div className={styles.description}>{product.description}</div>
            <div className={styles.size}>Talle: {product.size}</div>
            <div className={styles.quantity}>Cantidad: {product.quantity}</div>
          </div>
          <div>
            <button className={styles.deleteButton}>
              <i className="bi bi-trash3"></i>
            </button>
          </div>
          <div className={styles.price}>
            ${product.price.toLocaleString('es-AR')}
          </div>
        </div>
      ))}
  </div>
</div>

  );
};

export default cartProducts;
