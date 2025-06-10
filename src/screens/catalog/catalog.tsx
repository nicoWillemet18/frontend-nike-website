import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import Filter from "../../ui/filters/filters";
import Footer from "../../ui/footer/footer";
import Header from "../../ui/header/header";
import NavBar from "../../ui/navBar/navBar";
import GridProducts from "../../ui/gridProducts/gridProducts";
import styles from "./catalog.module.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const generoParam = searchParams.get("genero");
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(true);
  const [totalProductos, setTotalProductos] = useState(0);

  const [filtros, setFiltros] = useState({
    genero: '',
    categoriaId: null as number | null,
    talle: '' as number | '',
    orden: '',
  });

  useEffect(() => {
    if (generoParam) {
      setFiltros(prev => ({ ...prev, genero: generoParam }));
    }
  }, [generoParam]);

  const resetFiltros = () => {
    setFiltros({
      genero: '',
      categoriaId: null,
      talle: '',
      orden: '',
    });
    navigate("/catalog");
  };

  return (
    <div className={styles.catalogContainer}>
      <Header />

      <div className={styles.stickyNav}>
        <NavBar />
      </div>

      <div className={styles.catalogItems}>
        <div className={styles.barItem}>
          <div className={styles.barfilter}>
            <h2>Zapatillas ({totalProductos})</h2>
            <button onClick={resetFiltros}>Quitar Filtros</button>
          </div>

          <div className={styles.barfilter}>
            <div className={styles.searchWrapper}>
              <FiSearch size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar"
                className={styles.searchInput}
              />
            </div>

            <button onClick={() => setShowFilters(prev => !prev)}>
              {showFilters ? "Ocultar filtros" : "Mostrar filtros"} <i className="bi bi-filter"></i>
            </button>
          </div>
        </div>

        <div className={styles.filtersAndGrid}>
          <div className={`${styles.filterPanel} ${!showFilters ? styles.hideFilter : ""}`}>
            <Filter filtros={filtros} setFiltros={setFiltros} />
          </div>

          <div className={`${styles.gridPanel} ${!showFilters ? styles.fullWidthGrid : ""}`}>
            <GridProducts setTotal={setTotalProductos} filtros={filtros} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
