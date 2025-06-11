import { useState } from "react";
import styles from "./Filter.module.css";

const categorias = [
  { id: 1, nombre: "Deportivas" },
  { id: 2, nombre: "Urbanas" },
  { id: 3, nombre: "Botines" },
  { id: 4, nombre: "Básquet" },
  { id: 5, nombre: "Skate" },
  { id: 6, nombre: "Sandalias" },
  { id: 7, nombre: "Ténis" },
  { id: 8, nombre: "Air Max" },
  { id: 9, nombre: "Jordan" },
  { id: 10, nombre: "Edición Limitada" },
  { id: 11, nombre: "Pádel" },
];

const generos = ["Hombre", "Mujer", "Niño/a"];
const ordenarPor = ["Precio más bajo", "Precio más alto"];

interface FilterProps {
  filtros: {
    genero: string;
    categoriaId: number | null;
    talle: number | '';
    orden: string;
  };
  setFiltros: React.Dispatch<React.SetStateAction<any>>;
}

export default function Filter({ filtros, setFiltros }: FilterProps) {
  const [showTalle, setShowTalle] = useState(false);
  const [showGenero, setShowGenero] = useState(false);
  const [showOrdenar, setShowOrdenar] = useState(false);

  return (
    <aside className={styles.filterContainer}>
      <section className={styles.section}>
        <h3 className={styles.title}>Categorías</h3>
        <ul className={styles.list}>
          {categorias.map((categoria) => (
            <li
              key={categoria.id}
              className={`${styles.listItem} ${filtros.categoriaId === categoria.id ? styles.active : ''}`}
              onClick={() =>
                setFiltros((prev: any) => ({
                  ...prev,
                  categoriaId: prev.categoriaId === categoria.id ? null : categoria.id,
                }))
              }
            >
              {categoria.nombre}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <button 
          className={styles.toggleButton} 
          onClick={() => setShowGenero(prev => !prev)}
        >
          Género
          <i className={`bi ${showGenero ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
        </button>

        <ul className={`${styles.list} ${styles.dropdownContent} ${showGenero ? styles.dropdownOpen : ""}`}>
          {generos.map((genero) => (
            <li key={genero} className={styles.listItem}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={filtros.genero === genero}
                  onChange={() =>
                    setFiltros((prev: any) => ({
                      ...prev,
                      genero: prev.genero === genero ? "" : genero,
                    }))
                  }
                />
                {genero}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <button 
          className={styles.toggleButton} 
          onClick={() => setShowOrdenar(prev => !prev)}
        >
          Ordenar por
          <i className={`bi ${showOrdenar ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
        </button>

        <ul className={`${styles.list} ${styles.dropdownContent} ${showOrdenar ? styles.dropdownOpen : ""}`}>
          {ordenarPor.map((orden) => (
            <li key={orden} className={styles.listItem}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={filtros.orden === orden}
                  onChange={() =>
                    setFiltros((prev: any) => ({
                      ...prev,
                      orden: prev.orden === orden ? "" : orden,
                    }))
                  }
                />
                {orden}
              </label>
            </li>
          ))}
        </ul>
      </section>

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
                onClick={() =>
                  setFiltros((prev: any) => ({
                    ...prev,
                    talle: prev.talle === talle ? '' : talle,
                  }))
                }
                className={`${styles.talleBox} ${filtros.talle === talle ? styles.talleBoxActive : ""}`}
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
