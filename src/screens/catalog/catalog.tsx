import Filter from "../../ui/filters/filters";
import Footer from "../../ui/footer/footer";
import Header from "../../ui/header/header";
import NavBar from "../../ui/navBar/navBar";
import styles from "./catalog.module.css"
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function Catalog() {
  return(
  <>
  <div className={styles.catalogContainer}>
    <div>
      <Header />
      <NavBar />
    </div>
    <div className={styles.catalogItems}>
      <div className={styles.barItem}>
        <h2>Zapatillas (500)</h2>
        <button>Ocultar filtros <i className="bi bi-filter"></i></button>
        </div>
      <div className={styles.filtersAndGrid}>
        <Filter/>

      </div>

    </div>
    <Footer />
  </div>
  </>
  )
}