import React, { useState } from "react";
import ProductCard from "../productCard/productCard";  // Importa tu ProductCard
import styles from "./gridProducts.module.css";

interface Product {
  id: number;
  name: string;
  price: string;
  gender: string;
  image: string;  // Asegúrate de tener una imagen si es necesario
}

interface GridProductsProps {
  products: Product[];
}

const GridProducts: React.FC<GridProductsProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 30; // 3 columnas x 10 filas
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Calcular los productos que deben mostrarse en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* Grid de productos */}
      <div className={styles.gridContainer}>
        {currentProducts.map((product) => (
          <div className={styles.gridItem} key={product.id}>
            <ProductCard
              productName={product.name}
              productPrice={product.price}
              productGender={product.gender}
              size="large"  // Pasamos el prop size="large" para cada ProductCard
            />
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className={styles.pagination}>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? styles.activePage : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GridProducts;
