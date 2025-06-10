import React, { useEffect, useState } from 'react';
import styles from './cartProducts.module.css';
import imgCard from '../../assets/imgCard.png';
import { Producto } from '../../types/products';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteProduct from '../toastAlerts/DeleteProduct';


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
    <DeleteProduct
      onConfirm={() => {
        const nuevoCarrito = [...productos];
        nuevoCarrito.splice(index, 1);
        setProductos(nuevoCarrito);
        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
        window.dispatchEvent(new Event("carritoActualizado"));
        toast.dismiss();
        toast.success("Producto eliminado", { theme: 'dark' });
      }}
      onCancel={() => toast.dismiss()}
    />,
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      pauseOnHover: true,
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
