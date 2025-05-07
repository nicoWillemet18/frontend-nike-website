import styles from './detailsCart.module.css';

const detailsCart: React.FC = () => {

  return (
    <div className={styles.cartContainer}>
      <h2>Resumen de compra</h2>
      <div className={styles.summaryItem}>
        <span>Subtotal</span>
      </div>
      <div className={styles.summaryItem}>
        <span>Costo de envío</span>
      </div>
      <div className={styles.summaryTotal}>
        <span>Total</span>
      </div>

      <h3>Dirección de envío</h3>
      <div className={styles.addressForm}>
        <input
          type="text"
          name="street"
          placeholder="Calle"
        />
        <input
          type="text"
          name="number"
          placeholder="Numeración"
        />
        <input
          type="text"
          name="city"
          placeholder="Ciudad"
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Código Postal"
        />
      </div>
    </div>
  );
};

export default detailsCart;
