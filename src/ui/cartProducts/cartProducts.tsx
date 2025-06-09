import React, { useEffect, useState } from 'react';
import styles from './cartProducts.module.css';
import imgCard from '../../assets/imgCard.png';
import { Producto } from '../../types/products';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface ProductoEnCarrito extends Producto {
  talle: number;
  cantidad: number;
}

const CartProducts: React.FC = () => {
  const [productos, setProductos] = useState<ProductoEnCarrito[]>([]);

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    setProductos(carrito);
  }, []);

  const eliminarProducto = (index: number) => {
  toast(
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          color: 'white',
          fontWeight: '600',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        ¿Eliminar producto?
        <div
          style={{
            marginTop: 12,
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            width: '100%',
            maxWidth: 220,
          }}
        >
          <button
            onClick={() => {
              const nuevoCarrito = [...productos];
              nuevoCarrito.splice(index, 1);
              setProductos(nuevoCarrito);
              localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

              window.dispatchEvent(new Event("carritoActualizado"));

              toast.dismiss();
              toast.success("Producto eliminado", { theme: 'dark' });
            }}
            style={{
              backgroundColor: '#007A33',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '8px 16px',
              cursor: 'pointer',
              fontWeight: '600',
              boxShadow: '0 2px 8px rgba(0, 122, 51, 0.5)',
              flex: 1,
            }}
          >
            Sí
          </button>
          <button
            onClick={() => toast.dismiss()}
            style={{
              backgroundColor: '#d33',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '8px 16px',
              cursor: 'pointer',
              fontWeight: '600',
              boxShadow: '0 2px 8px rgba(211, 51, 51, 0.5)',
              flex: 1,
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>,
    {
      position: "top-center",
      autoClose: 1600,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      pauseOnHover: false,
      style: {
        backgroundColor: '#111',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.7)',
        minWidth: '320px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontSize: '1rem',
      }
    }
  );
};


  return (
    <div className={styles.cartConainer}>
      <h2 className={styles.cartTitle}>Carrito de Compras</h2>
      <div className={styles.cartTable}>
        {productos.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          productos.map((product, index) => (
            <div key={`${product.id}-${product.talle}`} className={styles.row}>
              <div>
                <img
                  src={product.imagen || imgCard}
                  alt={product.nombre}
                  className={styles.image}
                />
              </div>
              <div className={styles.details}>
                <div className={styles.name}>{product.nombre}</div>
                <div className={styles.description}>
                  {product.descripcion || 'Zapatillas urbanas para hombre'}
                </div>
                <div className={styles.size}>Talle: {product.talle}</div>
                <div className={styles.quantity}>Cantidad: {product.cantidad}</div>
              </div>
              <div>
                <button
                  className={styles.deleteButton}
                  onClick={() => eliminarProducto(index)}
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
              <div className={styles.price}>
                ${(product.precio * product.cantidad).toLocaleString('es-AR')}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartProducts;
