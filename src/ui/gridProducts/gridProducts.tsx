import React, { useState, useEffect } from "react";
import ProductCard from "../productCard/productCard";
import styles from "./gridProducts.module.css";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: string;
  gender: string;
  image: string;
}

interface GridProductsProps {
  products: Product[];
}

const GridProducts: React.FC<GridProductsProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15; // 15 productos por página
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const navigate = useNavigate();

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
      {/* Grid de productos */}
      <div className={styles.gridContainer}>
        {currentProducts.map((product) => (
          <div
            className={styles.gridItem}
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <ProductCard
              productName={product.name}
              productPrice={product.price}
              productGender={product.gender}
            />
          </div>
        ))}
      </div>

      {/* Paginación estilo botones bonitos */}
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
