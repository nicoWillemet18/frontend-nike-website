import React, { useState, useEffect } from "react";
import ProductCard from "../productCard/productCard";
import styles from "./gridProducts.module.css";
import { useNavigate } from "react-router-dom";
import { ListarProductos } from "../../data/productsController/productsController";
import { Producto } from "../../types/products";

interface GridProductsProps {
  setTotal: (count: number) => void;
  filtros: {
    genero: string;
    categoriaId: number | null;
    talle: number | '';
    orden: string;
  };
}

const GridProducts: React.FC<GridProductsProps> = ({ setTotal, filtros }) => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;
  const navigate = useNavigate();

  // Cargar todos los productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await ListarProductos();
        setProducts(data);
      } catch (err) {
        console.error("No se pudieron cargar los productos.");
      }
    };

    fetchProductos();
  }, []);

  // Aplicar filtros a los productos
    const productosFiltrados = products.filter(product => {
    // Filtrar por género (si se seleccionó)
    if (filtros.genero && filtros.genero !== "" && product.genero !== filtros.genero) {
      return false;
    }

    // Filtrar por categoría (si se seleccionó)
    if (filtros.categoriaId !== null && product.categoriaId !== filtros.categoriaId) {
      return false;
    }

    // Filtrar por talle (si se seleccionó)
    if (filtros.talle !== '' && product.talles) {
      const tieneTalle = product.talles.some(
        (talleObj) => Number(talleObj.numero) === filtros.talle
      );
      if (!tieneTalle) return false;
    }

    return true;
  });

  // Ordenar productos filtrados si se seleccionó
  const productosOrdenados = [...productosFiltrados];
  if (filtros.orden === "Precio más bajo") {
    productosOrdenados.sort((a, b) => a.precio - b.precio);
  } else if (filtros.orden === "Precio más alto") {
    productosOrdenados.sort((a, b) => b.precio - a.precio);
  }

  // Paginación
  const totalPages = Math.ceil(productosOrdenados.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productosOrdenados.slice(indexOfFirstProduct, indexOfLastProduct);

  // Actualizar total al cambiar productos filtrados
  useEffect(() => {
    setTotal(productosOrdenados.length);
    setCurrentPage(1); // resetear página al cambiar filtros
  }, [productosOrdenados, setTotal]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div className={styles.gridContainer}>
        {currentProducts.map((product) => (
          <div
            className={styles.gridItem}
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <ProductCard
              productName={product.nombre}
              productPrice={`${product.precio}`}
              productGender={product.genero}
            />
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default GridProducts;
