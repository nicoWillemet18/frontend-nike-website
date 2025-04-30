import Filter from "../../ui/filters/filters";
import Footer from "../../ui/footer/footer";
import Header from "../../ui/header/header";
import NavBar from "../../ui/navBar/navBar";
import GridProducts from "../../ui/gridProducts/gridProducts";  // Asegúrate de importar GridProducts
import styles from "./catalog.module.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Catalog() {
  const products = [
    { id: 1, name: "Zapatilla 1", price: "100", gender: "Hombre", image: "url_imagen_1" },
    { id: 2, name: "Zapatilla 2", price: "200", gender: "Mujer", image: "url_imagen_2" },
    { id: 3, name: "Zapatilla 3", price: "150", gender: "Unisex", image: "url_imagen_3" },
    { id: 4, name: "Zapatilla 4", price: "120", gender: "Hombre", image: "url_imagen_4" },
    { id: 5, name: "Zapatilla 5", price: "180", gender: "Mujer", image: "url_imagen_5" },
    { id: 6, name: "Zapatilla 6", price: "160", gender: "Unisex", image: "url_imagen_6" },
    { id: 7, name: "Zapatilla 7", price: "110", gender: "Hombre", image: "url_imagen_7" },
    { id: 8, name: "Zapatilla 8", price: "190", gender: "Mujer", image: "url_imagen_8" },
    { id: 9, name: "Zapatilla 9", price: "170", gender: "Unisex", image: "url_imagen_9" },
    { id: 10, name: "Zapatilla 10", price: "130", gender: "Hombre", image: "url_imagen_10" },
    { id: 11, name: "Zapatilla 11", price: "140", gender: "Mujer", image: "url_imagen_11" },
    { id: 12, name: "Zapatilla 12", price: "200", gender: "Unisex", image: "url_imagen_12" },
    { id: 13, name: "Zapatilla 13", price: "180", gender: "Hombre", image: "url_imagen_13" },
    { id: 14, name: "Zapatilla 14", price: "160", gender: "Mujer", image: "url_imagen_14" },
    { id: 15, name: "Zapatilla 15", price: "150", gender: "Unisex", image: "url_imagen_15" },
    { id: 16, name: "Zapatilla 16", price: "120", gender: "Hombre", image: "url_imagen_16" },
    { id: 17, name: "Zapatilla 17", price: "190", gender: "Mujer", image: "url_imagen_17" },
    { id: 18, name: "Zapatilla 18", price: "170", gender: "Unisex", image: "url_imagen_18" },
    { id: 19, name: "Zapatilla 19", price: "130", gender: "Hombre", image: "url_imagen_19" },
    { id: 20, name: "Zapatilla 20", price: "200", gender: "Mujer", image: "url_imagen_20" },
    { id: 21, name: "Zapatilla 21", price: "110", gender: "Hombre", image: "url_imagen_21" },
    { id: 22, name: "Zapatilla 22", price: "180", gender: "Mujer", image: "url_imagen_22" },
    { id: 23, name: "Zapatilla 23", price: "150", gender: "Unisex", image: "url_imagen_23" },
    { id: 24, name: "Zapatilla 24", price: "130", gender: "Hombre", image: "url_imagen_24" },
    { id: 25, name: "Zapatilla 25", price: "160", gender: "Mujer", image: "url_imagen_25" },
    { id: 26, name: "Zapatilla 26", price: "170", gender: "Unisex", image: "url_imagen_26" },
    { id: 27, name: "Zapatilla 27", price: "180", gender: "Hombre", image: "url_imagen_27" },
    { id: 28, name: "Zapatilla 28", price: "190", gender: "Mujer", image: "url_imagen_28" },
    { id: 29, name: "Zapatilla 29", price: "200", gender: "Unisex", image: "url_imagen_29" },
    { id: 30, name: "Zapatilla 30", price: "150", gender: "Hombre", image: "url_imagen_30" },
    { id: 31, name: "Zapatilla 31", price: "160", gender: "Mujer", image: "url_imagen_31" },
    { id: 32, name: "Zapatilla 32", price: "140", gender: "Unisex", image: "url_imagen_32" },
    { id: 33, name: "Zapatilla 33", price: "130", gender: "Hombre", image: "url_imagen_33" },
    { id: 34, name: "Zapatilla 34", price: "150", gender: "Mujer", image: "url_imagen_34" },
    { id: 35, name: "Zapatilla 35", price: "180", gender: "Unisex", image: "url_imagen_35" },
    { id: 36, name: "Zapatilla 36", price: "160", gender: "Hombre", image: "url_imagen_36" },
    { id: 37, name: "Zapatilla 37", price: "140", gender: "Mujer", image: "url_imagen_37" },
    { id: 38, name: "Zapatilla 38", price: "170", gender: "Unisex", image: "url_imagen_38" },
    { id: 39, name: "Zapatilla 39", price: "150", gender: "Hombre", image: "url_imagen_39" },
    { id: 40, name: "Zapatilla 40", price: "180", gender: "Mujer", image: "url_imagen_40" },
    { id: 41, name: "Zapatilla 41", price: "190", gender: "Unisex", image: "url_imagen_41" },
    { id: 42, name: "Zapatilla 42", price: "130", gender: "Hombre", image: "url_imagen_42" },
    { id: 43, name: "Zapatilla 43", price: "160", gender: "Mujer", image: "url_imagen_43" },
    { id: 44, name: "Zapatilla 44", price: "170", gender: "Unisex", image: "url_imagen_44" },
    { id: 45, name: "Zapatilla 45", price: "180", gender: "Hombre", image: "url_imagen_45" },
    { id: 46, name: "Zapatilla 46", price: "150", gender: "Mujer", image: "url_imagen_46" },
    { id: 47, name: "Zapatilla 47", price: "140", gender: "Unisex", image: "url_imagen_47" },
    { id: 48, name: "Zapatilla 48", price: "160", gender: "Hombre", image: "url_imagen_48" },
    { id: 49, name: "Zapatilla 49", price: "190", gender: "Mujer", image: "url_imagen_49" },
    { id: 50, name: "Zapatilla 50", price: "180", gender: "Unisex", image: "url_imagen_50" },
    { id: 51, name: "Zapatilla 51", price: "200", gender: "Hombre", image: "url_imagen_51" },
    { id: 52, name: "Zapatilla 52", price: "160", gender: "Mujer", image: "url_imagen_52" },
    { id: 53, name: "Zapatilla 53", price: "170", gender: "Unisex", image: "url_imagen_53" },
    { id: 54, name: "Zapatilla 54", price: "150", gender: "Hombre", image: "url_imagen_54" },
    { id: 55, name: "Zapatilla 55", price: "140", gender: "Mujer", image: "url_imagen_55" },
    { id: 56, name: "Zapatilla 56", price: "130", gender: "Unisex", image: "url_imagen_56" },
    { id: 57, name: "Zapatilla 57", price: "160", gender: "Hombre", image: "url_imagen_57" },
    { id: 58, name: "Zapatilla 58", price: "150", gender: "Mujer", image: "url_imagen_58" },
    { id: 59, name: "Zapatilla 59", price: "180", gender: "Unisex", image: "url_imagen_59" },
    { id: 60, name: "Zapatilla 60", price: "170", gender: "Hombre", image: "url_imagen_60" }
  ];

  return (
    <>
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
            <GridProducts products={products} /> {/* Aquí se integra el GridProducts */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
