import React from 'react';
import styles from './formProducts.module.css';
import CustomButton from '../customButton/customButton';
import imgProduct from '../../assets/imgCard.png'

const FormProduct: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
    <h2 className={styles.titleForm}>Agregar Producto</h2>
        <form className={styles.fpForm}>
        {/* Sección izquierda */}
        <div className={styles.fpLeftSection}>
            <h2>Ingresar detalles</h2>
            <input
            type="text"
            placeholder="Nombre del artículo"
            className={styles.fpInput}
            />
            <textarea
            placeholder="Descripción"
            className={styles.fpInput}
            />
            <input
            type="number"
            placeholder="Precio"
            className={styles.fpInput}
            />
            <input
            type="number"
            placeholder="Cantidad"
            className={styles.fpInput}
            />
            <select className={styles.fpSelect}>
            <option value="">Seleccionar categoría</option>
            <option value="zapatillas">Zapatillas</option>
            <option value="ropa">Ropa</option>
            <option value="accesorios">Accesorios</option>
            </select>

            {/* Desplegables de Talles y Género */}
            <div className={styles.fpFlexContainer}>
            <select className={styles.fpSelects}>
                <option value="">Talle</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
            <select className={styles.fpSelects}>
                <option value="">Género</option>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
                <option value="unisex">Unisex</option>
            </select>
            </div>

            {/* Envío */}
            <div className={styles.shippingOptions}>
            <span className={styles.label}>Tipo de envío:</span>
            <label className={styles.radioLabel}>
                <input
                type="radio"
                name="shipping"
                value="calculated"
                />
                Envío calculado
            </label>
            <label className={styles.radioLabel}>
                <input
                type="radio"
                name="shipping"
                value="free"
                />
                Envío gratis
            </label>
            </div>

            {/* Subir imagen */}
            <div className={styles.shippingOptions}>
                <span className={styles.label}>Subir imagen</span>

                <input
                type="file"
                placeholder="Seleccionar imagen"
                className={styles.fpInput}
                />
            </div>

            {/* Confirmación de Administrador */}
            <div className={styles.shippingOptions}>
                <span className={styles.label}>Confirmación de Administrador</span>
                <input
                type="text"
                placeholder="Usuario administrador"
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
                <span>Nike Court Vision Low</span>
            </div>
            <div className={styles.fpSummaryItem}>
                <span className={styles.fpLightText}>Precio:</span>
                <span className={styles.fpLightText}>$310.000</span>
            </div>
            <div className={styles.fpSummaryItem}>
                <span className={styles.fpLightText}>Cantidad:</span>
                <span className={styles.fpLightText}>425</span>
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

            <div className={styles.fpSummaryImg}>
                <span className={styles.fpBold}>Nike Court Vision Low</span>
                <img src={imgProduct} alt="Producto" className={styles.fpImagePreview} />
            </div>

            <div className={styles.fpSummaryImg}>
                <span className={styles.fpLightText}>Zapatillas urbanas para hombre</span>
            </div>
            </div>

            <div className={styles.fpButtons}>
                <CustomButton text="Confirmar"/>
                <CustomButton text="Cancelar"/>
            </div>
        </div>
        </form>
    </div>
  );
};

export default FormProduct;
