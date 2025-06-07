import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './formProducts.module.css';
import CustomButton from '../customButton/customButton';
import imgProduct from '../../assets/imgCard.png';


const categorias = [
  "Deportivas", "Urbanas", "Botines", "Basquet", "Skate", 
  "Sandalias", "Tenis", "Air Max", "Jordan", "Edición Limitada", "Padel"
];

interface FormProductProps {
  isEditMode?: boolean;
}

const FormProduct: React.FC<FormProductProps> = ({ isEditMode = false }) => {
  const navigate = useNavigate();

  const defaultProductData = {
    nombre: 'Nike Court Vision Low',
    descripcion: 'Zapatillas urbanas para hombre',
    precio: '310000',
    cantidad: '425',
    categoria: 'Urbanas',
    talle: '38',
    genero: 'hombre',
    envio: 'free',
  };

  const handleConfirm = () => {
    // Lógica de guardado si se desea
    navigate('/admin/manage-products');
  };

  const handleCancel = () => {
    navigate('/admin/manage-products');
  };

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.titleForm}>
        {isEditMode ? 'Editar Producto' : 'Agregar Producto'}
      </h2>
      <form className={styles.fpForm}>
        {/* Sección izquierda */}
        <div className={styles.fpLeftSection}>
          <h2>Ingresar detalles</h2>
          <input
            type="text"
            placeholder={isEditMode ? defaultProductData.nombre : 'Nombre del artículo'}
            className={styles.fpInput}
          />
          <textarea
            placeholder={isEditMode ? defaultProductData.descripcion : 'Descripción'}
            className={styles.fpInput}
          />
          <input
            type="number"
            placeholder={isEditMode ? defaultProductData.precio : 'Precio'}
            className={styles.fpInput}
          />
          <input
            type="number"
            placeholder={isEditMode ? defaultProductData.cantidad : 'Cantidad'}
            className={styles.fpInput}
          />
          <select className={styles.fpSelect} defaultValue={isEditMode ? defaultProductData.categoria : ''}>
            <option value="">Seleccionar categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>

          <div className={styles.fpFlexContainer}>
            <select className={styles.fpSelects} defaultValue={isEditMode ? defaultProductData.talle : ''}>
              <option value="">Talle</option>
              {Array.from({ length: 11 }, (_, i) => {
                const size = 36 + i ;
                return (
                  <option key={size} value={size}>
                    {size % 1 === 0 ? size.toFixed(0) : size.toFixed(1)}
                  </option>
                );
              })}
            </select>
            <select className={styles.fpSelects} defaultValue={isEditMode ? defaultProductData.genero : ''}>
              <option value="">Género</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
              <option value="unisex">Niño/a</option>
            </select>
          </div>

          <div className={styles.shippingOptions}>
            <span className={styles.label}>Tipo de envío:</span>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="shipping"
                value="calculated"
                defaultChecked={isEditMode && defaultProductData.envio === 'calculated'}
              />
              Envío calculado
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="shipping"
                value="free"
                defaultChecked={isEditMode && defaultProductData.envio === 'free'}
              />
              Envío gratis
            </label>
          </div>

          <div className={styles.shippingOptions}>
            <span className={styles.label}>Subir imagen</span>
            <input
              type="file"
              placeholder="Seleccionar imagen"
              className={styles.fpInput}
            />
          </div>

          <div className={styles.shippingOptions}>
            <span className={styles.label}>Confirmación de Administrador</span>
            <input
              type="text"
              placeholder='Usuario'
              className={styles.fpInput}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className={styles.fpInput}
            />
          </div>
        </div>

        {/* Sección derecha (Resumen) */}
        <div className={styles.fpRightSection}>
          <h2>Resumen</h2>
          <div className={styles.fpSummary}>
            <div className={styles.fpSummaryItem}>
              <span className={styles.fpBold}>Artículo:</span>
              <span>{defaultProductData.nombre}</span>
            </div>
            <div className={styles.fpSummaryItem}>
              <span className={styles.fpLightText}>Precio:</span>
              <span className={styles.fpLightText}>${defaultProductData.precio}</span>
            </div>
            <div className={styles.fpSummaryItem}>
              <span className={styles.fpLightText}>Cantidad:</span>
              <span className={styles.fpLightText}>{defaultProductData.cantidad}</span>
            </div>
            <div className={styles.fpSummaryItem}>
              <span className={styles.fpLightText}>Categoría:</span>
              <span className={styles.fpLightText}>Urbanas</span>
            </div>
            <div className={styles.fpSummaryItem}>
              <span className={styles.fpLightText}>Envío:</span>
              <span className={styles.fpLightText}>Gratis</span>
            </div>
            <div className={styles.fpSummaryItem}>
              <span className={styles.fpLightText}>Género:</span>
              <span className={styles.fpLightText}>Hombre</span>
            </div>
            <div className={styles.fpSummaryItem}>
              <span className={styles.fpLightText}>Talle/s:</span>
              <span className={styles.fpLightText}>38</span>
            </div>

            <div className={styles.fpSummaryImg}>
              <span className={styles.fpBold}>Nike Court Vision Low</span>
              <img src={imgProduct} alt="Producto" className={styles.fpImagePreview} />
            </div>

            <div className={styles.fpSummaryImg}>
              <span className={styles.fpLightText}>Zapatillas urbanas para hombre</span>
            </div>
          </div>

          <div className={styles.fpButtons}>
            <CustomButton text="Confirmar" onClick={handleConfirm} />
            <CustomButton text="Cancelar" onClick={handleCancel} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormProduct;
