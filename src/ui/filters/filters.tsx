import { useState } from "react";
import styles from "./Filter.module.css";

const categorias = [
  "Deportivas", "Urbanas", "Botines", "Basquet", "Skate", 
  "Sandalias", "Tenis", "Air Max", "Jordan", "Edición Limitada", "Padel"
];

const generos = ["Hombre", "Mujer", "Niño/a"];

const ordenarPor = ["Precio más bajo", "Precio más alto"];

export default function Filter() {
  const [showTalle, setShowTalle] = useState(false);
  const [showGenero, setShowGenero] = useState(false);
  const [showOrdenar, setShowOrdenar] = useState(false);
  const [selectedTalle, setSelectedTalle] = useState<number | null>(null);


  return (
    <aside className={styles.filterContainer}>
      {/* Categorías */}
      <section className={styles.section}>
        <h3 className={styles.title}>Categorías</h3>
        <ul className={styles.list}>
          {categorias.map((categoria) => (
            <li key={categoria} className={styles.listItem}>{categoria}</li>
          ))}
        </ul>
      </section>

      {/* Género (desplegable con checkbox) */}
      <section className={styles.section}>
        <button 
          className={styles.toggleButton} 
          onClick={() => setShowGenero(prev => !prev)}
        >
          Género
          <i className={`bi ${showGenero ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
        </button>

        <ul
          className={`
            ${styles.list} 
            ${styles.dropdownContent} 
            ${showGenero ? styles.dropdownOpen : ""}
          `}
        >
          {generos.map((genero) => (
            <li key={genero} className={styles.listItem}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkbox} />
                {genero}
              </label>
            </li>
          ))}
        </ul>
      </section>

      {/* Ordenar por (desplegable con checkbox) */}
      <section className={styles.section}>
        <button 
          className={styles.toggleButton} 
          onClick={() => setShowOrdenar(prev => !prev)}
        >
          Ordenar por
          <i className={`bi ${showOrdenar ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
        </button>

        <ul
          className={`
            ${styles.list} 
            ${styles.dropdownContent} 
            ${showOrdenar ? styles.dropdownOpen : ""}
          `}
        >
          {ordenarPor.map((orden) => (
            <li key={orden} className={styles.listItem}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkbox} />
                {orden}
              </label>
            </li>
          ))}
        </ul>
      </section>

      {/* Talle */}
      <section className={styles.section}>
        <button 
          className={styles.toggleButton} 
          onClick={() => setShowTalle(prev => !prev)}
        >
          Talle
          <i className={`bi ${showTalle ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
        </button>

        <div className={`${styles.dropdownContent} ${showTalle ? styles.dropdownOpen : ""}`}>
          <div className={styles.talleGrid}>
            {Array.from({ length: 11 }, (_, i) => 36 + i).map((talle) => (
              <div 
                key={talle}
                onClick={() => setSelectedTalle(talle)}
                className={`${styles.talleBox} ${selectedTalle === talle ? styles.talleBoxActive : ""}`}
              >
                {talle}
              </div>
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
}
