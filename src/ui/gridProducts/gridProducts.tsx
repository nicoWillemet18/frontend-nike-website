import React, { useState, useEffect } from "react";
import ProductCard from "../productCard/productCard";
import styles from "./gridProducts.module.css";
import { useNavigate } from "react-router-dom";
import { ListarProductos } from "../../data/productsController/productsController";
import { Producto } from "../../types/products";

interface GridProductsProps {
  setTotal: (count: number) => void;
}

const GridProducts: React.FC<GridProductsProps> = ({ setTotal }) => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await ListarProductos();
        setProducts(data);
        setTotal(data.length);
      } catch (err) {
        console.error("No se pudieron cargar los productos.");
      }
    };

    fetchProductos();
  }, [setTotal]);

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
