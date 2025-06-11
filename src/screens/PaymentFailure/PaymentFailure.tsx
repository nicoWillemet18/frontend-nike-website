import { FC, useEffect } from "react";
import styles from "./PaymentFailure.module.css";
import { Link, useLocation } from "react-router-dom";
import Header from "../../ui/header/header";
import NavBar from "../../ui/navBar/navBar";
import Footer from "../../ui/footer/footer";
import { ActualizarOrdenCompraByPreferenceId } from "../../data/productsController/ordenCompraController";

const PaymentFailure: FC = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const preferenceId = searchParams.get("preference_id") || "";

  useEffect(() => {
    const actualizarEstado = async () => {
      if (!preferenceId) return;

      try {
        await ActualizarOrdenCompraByPreferenceId(preferenceId, "RECHAZADO");
        localStorage.removeItem('carrito');
        console.log("Orden actualizada con éxito");
      } catch (error) {
        console.error("Error al actualizar la orden:", error);
      }
    };

    actualizarEstado();
  }, [preferenceId]);

  return (
    <>
      <div className={styles.landingContainer}>
        <Header />
        <div className={styles.stickyNav}>
          <NavBar />
        </div>
        <div className={styles.containerScreenPaymentFailure}>
          <div className={styles.containerCardFailure}>
            <h1>❌ El pago no se pudo procesar</h1>
            <p>Algo salió mal. Podés intentar de nuevo o contactar al soporte.</p>
            <Link className={styles.btnLinkFailure} to="/">
              Volver al inicio
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>

  );
};

export default PaymentFailure;
