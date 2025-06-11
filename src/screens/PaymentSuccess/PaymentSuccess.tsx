import { FC, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "./PaymentSuccess.module.css";
import Header from "../../ui/header/header";
import NavBar from "../../ui/navBar/navBar";
import Footer from "../../ui/footer/footer";
import { ActualizarOrdenCompraByPreferenceId } from "../../data/productsController/ordenCompraController";

export const PaymentSuccess: FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const preferenceId = searchParams.get("preference_id") || "";
  const paymentId = searchParams.get("payment_id") || "";


  useEffect(() => {
    const actualizarEstado = async () => {
      if (!preferenceId) return;

      try {
        await ActualizarOrdenCompraByPreferenceId(preferenceId, "APROBADO");
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
        <div className={styles.containerPageSuccess}>
          <div className={styles.containerCardSuccess}>
            <h1>¡Pago exitoso! 🎉</h1>
            <p>Gracias por tu compra.</p>
            {preferenceId && (
              <p>Tu id de pago Mercadopago es: <strong>{paymentId}</strong></p>
            )}
            <Link className={styles.btnSuccessLink} to={"/"}>
              Volver al inicio
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
