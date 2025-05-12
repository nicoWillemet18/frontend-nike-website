import React, { useState } from 'react';
import styles from './TableProducts.module.css';
import { FaTrash } from 'react-icons/fa';
import CustomButton from '../customButton/customButton';

interface Product {
  id: number;
  image: string;
  name: string;
  gender: string;
  price: string;
  stock: number;
}

interface TableProductsProps {
  products: Product[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TableProducts: React.FC<TableProductsProps> = ({ products, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <table className={styles.table}>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id} className={styles.tableRow}>
              <td className={`${styles.productInfo} ${product.stock === 0 ? styles.outOfStock : ''}`}>
                <div className={styles.productDetails}>
                  <img src={product.image} alt={product.name} className={styles.productImage} />
                  <span>{product.name}</span>
                  <span className={styles.lightText}>{product.gender}</span>
                  <span>Precio: {product.price}</span>
                  <span className={styles.lightText}>Stock: {product.stock}</span>
                </div>
              </td>
              <td className={styles.actions}>
                <div className={styles.actionButtons}>
                  <CustomButton text="Editar" onClick={() => onEdit(product.id)} />
                  <CustomButton 
                    icon={<FaTrash style={{ color: '970000' }} />} 
                    onClick={() => onDelete(product.id)} 
                    disabled={product.stock === 0}
                  />                
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default TableProducts;
