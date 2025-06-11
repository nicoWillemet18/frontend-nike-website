import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../ui/adminHeader/adminHeader";
import Footer from "../../ui/footer/footer";
import styles from "./purchaseOrder.module.css";
import { FiSearch } from "react-icons/fi";
import imgTable from "../../assets/imgCard.png";
import { ListarOrdenesCompra } from "../../data/productsController/ordenCompraController";

type Producto = {
  id: number;
  nombre: string;
  genero: string;
  imagen: string;
  // otros campos que tenga el producto
};

type Orden = {
  id: number;
  estado: string;
  fecha: string;
  total: string;
  productos: Producto[];
  preferenceId: string;
};

export default function PurchaseOrders() {
  const [orders, setOrders] = useState<Orden[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const data = await ListarOrdenesCompra();

      const ordersFormatted = data
        .map((orden: any) => ({
          id: orden.id,
          estado: orden.estado,
          fecha: orden.fechaCompra,
          total: `$${orden.total}`,
          productos: orden.productos.length > 0 ? orden.productos : [],
          preferenceId: orden.preferenceId
        }))
        .sort((a: Orden, b: Orden) => b.id - a.id);

        console.log(ordersFormatted);
        
      setOrders(ordersFormatted);
    } catch (error) {
      console.error("Error al cargar órdenes:", error);
    }
  };

  fetchOrders();
}, []);

  // Filtrar por búsqueda (opcional)
  const filteredOrders = orders.filter((order) =>
    order.id.toString().includes(searchTerm) || order.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para mostrar/ocultar productos de una orden
  const toggleExpand = (id: number) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  return (
    <div className={styles.AdminContainer}>
      <div className={styles.stickyHeader}>
        <AdminHeader />
      </div>

      <section className={styles.barItems}>
        <div className={styles.barItem}>
          <h2>Órdenes de Compra ({filteredOrders.length})</h2>
        </div>
        <div className={styles.right}>
          <div className={styles.searchWrapper}>
            <FiSearch size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar por ID o estado"
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className={styles.ordersList}>
        {filteredOrders.map((order) => (
          <div key={order.id}>
            <div
              className={styles.orderCard}
              onClick={() => toggleExpand(order.id)}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.orderInfo}>
                <h3>Orden #{order.id}</h3>
                <p><strong>Fecha:</strong> {order.fecha}</p>
                <p><strong>Estado:</strong> {order.estado}</p>
                <p><strong>Total:</strong> {order.total}</p>
                <p><strong>ID Mercadopago:</strong> {order.preferenceId}</p>
                <p style={{ fontStyle: "italic", fontSize: "0.9rem", color: "#666" }}>
                  {expandedOrderId === order.id ? "Ocultar productos ▲" : "Mostrar productos ▼"}
                </p>
              </div>
            </div>

            {expandedOrderId === order.id && (
              <div className={styles.productsList}>
                {order.productos.length === 0 ? (
                  <p style={{ padding: "0 1rem" }}>No hay productos en esta orden.</p>
                ) : (
                  order.productos.map((prod) => (
                    <div key={prod.id} className={styles.productItem}>
                      <img
                        src={prod.imagen || imgTable}
                        alt={prod.nombre}
                        className={styles.productImageSmall}
                      />
                      <div>
                        <p><strong>Producto:</strong> {prod.nombre}</p>
                        <p><strong>Género:</strong> {prod.genero || "N/A"}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
