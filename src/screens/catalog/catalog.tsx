import Filter from "../../ui/filters/filters";
import Footer from "../../ui/footer/footer";
import Header from "../../ui/header/header";
import NavBar from "../../ui/navBar/navBar";
import GridProducts from "../../ui/gridProducts/gridProducts";
import styles from "./catalog.module.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from "react";


export default function Catalog() {

  const [showFilters, setShowFilters] = useState(true);

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
          <button onClick={() => setShowFilters(prev => !prev)}>
            {showFilters ? "Ocultar filtros" : "Mostrar filtros"} <i className="bi bi-filter"></i>
          </button>
        </div>
        <div className={styles.filtersAndGrid}>
          <div
            className={`${styles.filterPanel} ${!showFilters ? styles.hideFilter : ""}`}
          >
            <Filter />
          </div>
          <div
            className={`${styles.gridPanel} ${!showFilters ? styles.fullWidthGrid : ""}`}
          >
            <GridProducts products={products} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
