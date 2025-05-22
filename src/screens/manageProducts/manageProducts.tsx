import { useState } from "react";
import AdminHeader from "../../ui/adminHeader/adminHeader";
import CustomButton from "../../ui/customButton/customButton";
import Filter from "../../ui/filters/filters";
import Footer from "../../ui/footer/footer";
import TableProducts from "../../ui/tableProducts/tableProducts";
import styles from "./manageProducts.module.css";
import { useNavigate } from "react-router-dom";
import imgTable from "../../assets/imgCard.png"

export default function ManageProducts() {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(true);

  const products = Array.from({ length: 40 }, (_, i) => {
    let gender = '';
    if (i < 18) gender = 'Zapatillas para hombre';
    else if (i < 36) gender = 'Zapatillas para mujer';
    else gender = 'Zapatillas para niño/a';

    const stock = i >= 35 ? 0 : Math.floor(Math.random() * 20) + 1;

    return {
      id: i + 1,
      name: `Zapatilla ${i + 1}`,
      price: '$189.999',
      gender,
      stock,
      image: imgTable,
    };
  });

  const handleEdit = (id: number) => {
    navigate(`/admin/edit-product/${id}`); 
    console.log(`Editar producto con ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Eliminar producto con ID: ${id}`);
  };

  return (
    <div className={styles.AdminContainer}>
      <div className={styles.stickyHeader}>
        <AdminHeader />
      </div>

      <section className={styles.barItems}>
        <div className={styles.barItem}>
          <h2>Zapatillas (500)</h2>
          <CustomButton text="Agregar producto" onClick={() => navigate('/admin/add-product')} />
        </div>
        <div>
          <button 
            className={styles.barButton}
            onClick={() => setShowFilters(prev => !prev)}
          >
            {showFilters ? "Ocultar filtros" : "Mostrar filtros"} <i className="bi bi-filter"></i>
          </button>
        </div>
      </section>

      <div className={styles.listProducts}>
        <div className={`${styles.filterSection} ${!showFilters ? styles.hideFilter : ""}`}>
          <Filter />
        </div>
        <div className={`${styles.tableSection} ${!showFilters ? styles.fullWidthTable : ""}`}>
          <TableProducts products={products} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
