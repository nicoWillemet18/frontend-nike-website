import CustomButton from '../customButton/customButton';
import styles from './detailsCart.module.css';

const detailsCart: React.FC = () => {

  return (
    <div className={styles.detailsContainer}>
      <h2 className={styles.summaryTitle}>Resumen de compra</h2>
        <div className={styles.items}>
        <div className={styles.summaryItem}>
          <span>Subtotal:</span>
          <span>$1.319.996</span>
        </div>
        <div className={styles.summaryItem}>
          <span>Costo de envío:</span>
          <span>$3.700</span>
        </div>
        <div className={styles.summaryTotal}>
          <span>Total:</span>
          <span>$1.323.696</span>
        </div>

        <div className={styles.addressForm}>
          <h3 className={styles.addressTitle}>Dirección de envío:</h3>
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
      <div className={styles.buttonContainer}>
        <CustomButton text="Confirmar compra" onClick={() => console.log('Compra confirmada')} />
      </div>
    </div>
  );
};

export default detailsCart;
