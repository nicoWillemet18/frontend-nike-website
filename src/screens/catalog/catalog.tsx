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
  const [totalProductos, setTotalProductos] = useState(0);


  return (  
    <div className={styles.catalogContainer}>
        <Header />
      <div className={styles.stickyNav}>
        <NavBar />
      </div>
      <div className={styles.catalogItems}>
        <div className={styles.barItem}>
          <h2>Zapatillas ({totalProductos})</h2>
          <button onClick={() => setShowFilters(prev => !prev)}>
            {showFilters ? "Ocultar filtros" : "Mostrar filtros"} <i className="bi bi-filter"></i>
          </button>
        </div>
        <div className={styles.filtersAndGrid}>
          <div className={`${styles.filterPanel} ${!showFilters ? styles.hideFilter : ""}`}>
            <Filter />
          </div>
          <div className={`${styles.gridPanel} ${!showFilters ? styles.fullWidthGrid : ""}`}>
            <GridProducts setTotal={setTotalProductos} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
