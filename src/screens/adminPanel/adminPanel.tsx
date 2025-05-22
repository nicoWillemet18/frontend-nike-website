import AdminHeader from "../../ui/adminHeader/adminHeader";
import CustomButton from "../../ui/customButton/customButton";
import Footer from "../../ui/footer/footer";
import GenderSelection from "../../ui/genderSelection/genderSelection";
import ProductShowcase from "../../ui/productShowcase/productShowcase";
import ProductSlice from "../../ui/productSilder/productSlice";
import styles from "./adminPanel.module.css";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();

    return (
      <>
      <div className={styles.AdminContainer}>
        <div className={styles.stickyHeader}>
          <AdminHeader />
        </div>

        <section className={styles.section}>
          <div className={styles.title}>
            <h2>Total de productos</h2>
            <CustomButton text="Ir a Editar" onClick={() => navigate('/admin/manage-products')} />
          </div>
          <ProductSlice isAdmin />
        </section>

        <section className={styles.section}>
          <h2 className={styles.title}>Editar por género</h2>
          <GenderSelection isAdmin/>
        </section>

        <section className={styles.section}>
          <h2 className={styles.title}>Más vendidos</h2>
          <ProductShowcase isAdmin/>
        </section>

        <Footer />
      </div>
      </>
    );
}