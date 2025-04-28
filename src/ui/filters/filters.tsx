import { useState } from "react";
import styles from "./Filter.module.css";

const categorias = [
  "Deportivas", "Urbanas", "Botines", "Basquet", "Skate", 
  "Sandalias", "Tenis", "Air Max", "Jordan", "Edición Limitada", "Padel"
];

const generos = ["Hombre", "Mujer", "Niño/a"];

const ordenarPor = ["Precio más bajo", "Precio más alto", "Más vendidos", "Nuevos"];

export default function Filter() {
  const [selectedTalle, setSelectedTalle] = useState<number>(36);
  const [showGenero, setShowGenero] = useState(false);
  const [showOrdenar, setShowOrdenar] = useState(false);

  const handleIncrement = () => {
    setSelectedTalle((prev) => (prev < 46 ? prev + 1 : prev));
  };

  const handleDecrement = () => {
    setSelectedTalle((prev) => (prev > 36 ? prev - 1 : prev));
  };

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
        {showGenero && (
          <ul className={styles.list}>
            {generos.map((genero) => (
              <li key={genero} className={styles.listItem}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" className={styles.checkbox} />
                  {genero}
                </label>
              </li>
            ))}
          </ul>
        )}
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
        {showOrdenar && (
          <ul className={styles.list}>
            {ordenarPor.map((orden) => (
              <li key={orden} className={styles.listItem}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" className={styles.checkbox} />
                  {orden}
                </label>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Talle */}
      <section className={styles.section}>
        <h3 className={styles.title}>Talle</h3>
        <div className={styles.talleContainer}>
          <button className={styles.talleButton} onClick={handleDecrement}>-</button>
          <div className={styles.talleBox}>{selectedTalle}</div>
          <button className={styles.talleButton} onClick={handleIncrement}>+</button>
        </div>
      </section>
    </aside>
  );
}
