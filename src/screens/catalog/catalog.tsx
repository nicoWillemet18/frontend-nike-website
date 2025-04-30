import Filter from "../../ui/filters/filters";
import Footer from "../../ui/footer/footer";
import Header from "../../ui/header/header";
import NavBar from "../../ui/navBar/navBar";
import GridProducts from "../../ui/gridProducts/gridProducts";
import styles from "./catalog.module.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Catalog() {
  const products = Array.from({ length: 40 }, (_, i) => {
    let gender = '';
    if (i < 18) gender = 'Zapatillas para hombre';
    else if (i < 36) gender = 'Zapatillas para mujer';
    else gender = 'Zapatillas para niño/a';

    return {
      id: i + 1,
      name: `Zapatilla ${i + 1}`,
      price: '$189.999',
      gender,
      image: ''
    };
  });

  return (
    <div className={styles.catalogContainer}>
      <div>
        <Header />
        <NavBar />
      </div>
      <div className={styles.catalogItems}>
        <div className={styles.barItem}>
          <h2>Zapatillas (500)</h2>
          <button>
            Ocultar filtros <i className="bi bi-filter"></i>
          </button>
        </div>
        <div className={styles.filtersAndGrid}>
          <Filter />
          <GridProducts products={products} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
