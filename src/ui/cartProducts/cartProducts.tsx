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
];

const cartProducts: React.FC = () => {

  return (
    <table className={styles.cartTable}>
      <tbody>
        {sampleProducts.map((product) => (
          <tr key={product.id} className={styles.row}>
            <td>
              <img src={product.img} alt={product.name} className={styles.image} />
            </td>
            <td>
              <div className={styles.details}>
                <div className={styles.name}>{product.name}</div>
                <div className={styles.description}>{product.description}</div>
                <div className={styles.size}>Talle: {product.size}</div>
                <div className={styles.quantity}>Cantidad:{product.quantity}</div>
              </div>
            </td>
            <td>
            <button className={styles.deleteButton}>
                <i className="bi bi-trash3"></i>
            </button>
            </td>
            <td className={styles.price}>${product.price.toLocaleString('es-AR')}</td>
            </tr>
        ))}
      </tbody>
    </table>
  );
};

export default cartProducts;
