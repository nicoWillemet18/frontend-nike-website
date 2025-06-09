import React, { useEffect, useState } from 'react';
import CustomButton from '../customButton/customButton';
import styles from './detailsCart.module.css';

interface ProductoEnCarrito {
  precio: number;
  cantidad: number;
}

const DetailsCart: React.FC = () => {
  const [productos, setProductos] = useState<ProductoEnCarrito[]>([]);

  const cargarCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    setProductos(carrito);
  };

  useEffect(() => {
    cargarCarrito();

    const handleCarritoActualizado = () => {
      cargarCarrito();
    };

    window.addEventListener('carritoActualizado', handleCarritoActualizado);

    return () => {
      window.removeEventListener('carritoActualizado', handleCarritoActualizado);
    };
  }, []);

  const subtotal = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const costoEnvio = productos.length > 0 ? 3700 : 0;
  const total = subtotal + costoEnvio;

  return (
    <div className={styles.detailsContainer}>
      <h2 className={styles.summaryTitle}>Resumen de compra</h2>
      <div className={styles.items}>
        <div className={styles.summaryItem}>
          <span>Subtotal:</span>
          <span>${subtotal.toLocaleString('es-AR')}</span>
        </div>
        <div className={styles.summaryItem}>
          <span>Costo de envío:</span>
          <span>${costoEnvio.toLocaleString('es-AR')}</span>
        </div>
        <div className={styles.summaryTotal}>
          <span>Total:</span>
          <span>${total.toLocaleString('es-AR')}</span>
        </div>

        <div className={styles.addressForm}>
          <h3 className={styles.addressTitle}>Dirección de envío:</h3>
          <input type="text" name="street" placeholder="Calle" />
          <input type="text" name="number" placeholder="Numeración" />
          <input type="text" name="city" placeholder="Ciudad" />
          <input type="text" name="postalCode" placeholder="Código Postal" />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <CustomButton
          text="Confirmar compra"
          onClick={() => console.log('Compra confirmada')}
        />
      </div>
    </div>
  );
};

export default DetailsCart;
