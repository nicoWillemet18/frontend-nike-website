import React, { useEffect, useState } from 'react';
import styles from './tableProducts.module.css';
import { FaTrash } from 'react-icons/fa';
import CustomButton from '../customButton/customButton';
import { Producto } from '../../types/IProducts';
import DeleteProduct from '../toastAlerts/DeleteProduct';
import { toast } from 'react-toastify';
import { EditarProducto } from '../../data/productsController/productsController';


interface TableProductsProps {
  products: Producto[];
  onEdit: (id: number) => void;
  onDelete: () => void;
}

const TableProducts: React.FC<TableProductsProps> = ({ products, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDelete = (product: Producto) => {
  const onConfirm = async () => {
    toast.dismiss();
    try {
      await EditarProducto(product.id!, { ...product, stock: 0 });
      toast.success('Producto eliminado', { theme: 'dark' });
      onDelete();
    } catch (error) {
      toast.error('Error al eliminar producto', { theme: 'dark' });
    }
  };

  const onCancel = () => toast.dismiss();

  toast(
    <DeleteProduct onConfirm={onConfirm} onCancel={onCancel} />,
    {
      position: 'top-center',
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      pauseOnHover: true,
    }
  );
};

  return (
    <div>
      <table className={styles.table}>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id} className={styles.tableRow}>
              <td className={`${styles.productInfo} ${product.stock === 0 ? styles.outOfStock : ''}`}>
                <div className={styles.productDetails}>
                  <img src={product.imagen} alt={product.nombre} className={styles.productImage} />
                  <span>{product.nombre}</span>
                  <span className={styles.lightText}>{product.genero}</span>
                  <span>Precio: ${product.precio}</span>
                  <span className={styles.lightText}>Stock: {product.stock}</span>
                </div>
              </td>
              <td className={styles.actions}>
                <div className={styles.actionButtons}>
                  <CustomButton
                    text="Editar"
                    onClick={() => product.id !== undefined && onEdit(product.id)}
                  />
                  <CustomButton
                    icon={<FaTrash style={{ color: '#970000' }} />}
                    onClick={() => handleDelete(product)}
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
