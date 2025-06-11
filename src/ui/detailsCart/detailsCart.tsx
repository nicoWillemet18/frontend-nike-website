import React, { useEffect, useState } from 'react';
import CustomButton from '../customButton/customButton';
import styles from './detailsCart.module.css';
import { Direccion } from '../../types/direccion';
import { AsignarDireccion, CrearDireccion } from '../../data/productsController/direccionController';
import { CrearOdenCompra } from '../../data/productsController/ordenCompraController';
import { OrdenCompra } from '../../types/ordenCompra';
import Swal from 'sweetalert2';
import { UsuarioDireccion } from '../../types/usuarioDireccion';

interface ProductoEnCarrito {
  id: number
  precio: number;
  cantidad: number;
}

const DetailsCart: React.FC = () => {
  const [productos, setProductos] = useState<ProductoEnCarrito[]>([]);
  const [direccion, setDireccion] = useState<Omit<Direccion, 'id' | 'createdAt' | 'updatedAt'>>({
    calle: '',
    numero: '',
    ciudad: '',
    provincia: '',
    cpa: '',
    pais: '',
  });

  const userId = parseInt(localStorage.getItem('userId') || '', 10);

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
  const costoEnvio = 0;//productos.length > 0 ? 3700 : 0;
  const total = subtotal + costoEnvio;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDireccion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = async () => {
    const payloadDireccion: Direccion = {
      ...direccion,
    };

    try {
      const responseCreateDireccion = await CrearDireccion(payloadDireccion);

      if (responseCreateDireccion.status !== 200) {
        Swal.fire("Error", "No se pudo generar direccion. Intenta nuevamente.", "error");
      }

      const payloadUsuarioDireccion: UsuarioDireccion = {
        direccionId: responseCreateDireccion.data.id,
        usuarioId: userId,
      };

      const responseAsignarDireccion = await AsignarDireccion(payloadUsuarioDireccion);

      if (responseAsignarDireccion.status !== 200) {
        Swal.fire("Error", "No se pudo asignar direccion. Intenta nuevamente.", "error");
      }

      const payloadOrdenCompra: OrdenCompra = {
        id: productos.flatMap(producto =>
          Array(producto.cantidad).fill(producto.id)
        ),
      };

      const responseCreateOrdenCompra = await CrearOdenCompra(payloadOrdenCompra);
      if (responseCreateOrdenCompra.status !== 200) {
        Swal.fire("Error", "No se pudo generar la orden de compra. Intenta nuevamente.", "error");
      }

      const urlMP = responseCreateOrdenCompra.data.urlMP;

      Swal.fire("Éxito", "Orden de compra creada con éxito! Puedes pagar en MercadoPago", "success")
        .then(() => {
          window.location.href = urlMP;
        });

    } catch (error) {
      Swal.fire("Error", `Error al crear orden de compra: ${error}`, "error");
    }
  };


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
          {/*<span>${costoEnvio.toLocaleString('es-AR')}</span>*/}
          <span>Gratis</span>
        </div>
        <div className={styles.summaryTotal}>
          <span>Total:</span>
          <span>${total.toLocaleString('es-AR')}</span>
        </div>

        <div className={styles.addressForm}>
          <h3 className={styles.addressTitle}>Dirección de envío:</h3>
          <input
            type="text"
            name="calle"
            placeholder="Calle"
            value={direccion.calle}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="numero"
            placeholder="Numeración"
            value={direccion.numero}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="ciudad"
            placeholder="Ciudad"
            value={direccion.ciudad}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cpa"
            placeholder="Código Postal"
            value={direccion.cpa}
            onChange={handleInputChange}
          />
        </div>

      </div>
      <div className={styles.buttonContainer}>
        <CustomButton text="Confirmar compra" onClick={handleConfirm} />
      </div>
    </div>
  );
};

export default DetailsCart;
