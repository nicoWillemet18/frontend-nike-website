import React, { useState, useEffect } from "react";
import ProductCard from "../productCard/productCard";
import styles from "./gridProducts.module.css";
import { useNavigate } from "react-router-dom";
import { ListarProductos } from "../../data/productsController/productsController";
import { Producto } from "../../types/IProducts";

interface GridProductsProps {
  setTotal: (count: number) => void;
  filtros: {
    genero: string;
    categoriaId: number | null;
    talle: number | '';
    orden: string;
  };
  searchTerm: string;
}

const GridProducts: React.FC<GridProductsProps> = ({ setTotal, filtros, searchTerm }) => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;
  const navigate = useNavigate();

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

  const productosFiltrados = products.filter(product => {
    if (filtros.genero && filtros.genero !== "" && product.genero !== filtros.genero) {
      return false;
    }

    if (filtros.categoriaId !== null && product.categoriaId !== filtros.categoriaId) {
      return false;
    }

    if (filtros.talle !== '' && product.talles) {
      const tieneTalle = product.talles.some(
        (talleObj) => Number(talleObj.numero) === filtros.talle
      );
      if (!tieneTalle) return false;
    }

    if (searchTerm && (!product.nombre || !product.nombre.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }

    return true;
  });

  const productosOrdenados = [...productosFiltrados];
  if (filtros.orden === "Precio más bajo") {
    productosOrdenados.sort((a, b) => a.precio - b.precio);
  } else if (filtros.orden === "Precio más alto") {
    productosOrdenados.sort((a, b) => b.precio - a.precio);
  }

  const totalPages = Math.ceil(productosOrdenados.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productosOrdenados.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    setTotal(productosOrdenados.length);
  }, [productosOrdenados, setTotal]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filtros, searchTerm]);

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
              productImage={product.imagen}
              productName={product.nombre}
              productPrice={`${product.precio}`}
              productDescripcion={product.descripcion}
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
