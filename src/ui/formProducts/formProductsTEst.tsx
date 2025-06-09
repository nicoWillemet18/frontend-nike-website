import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './formProducts.module.css';
import CustomButton from '../customButton/customButton';
import imgProduct from '../../assets/imgCard.png';

const categorias = [
  { id: 1, nombre: "Deportivas" },
  { id: 2, nombre: "Urbanas" },
  { id: 3, nombre: "Botines" },
  { id: 5, nombre: "Basquet" },
  { id: 6, nombre: "Skate" },
  { id: 7, nombre: "Sandalias" },
  { id: 8, nombre: "Tenis" },
  { id: 9, nombre: "Air Max" },
  { id: 10, nombre: "Jordan" },
  { id: 11, nombre: "Edición Limitada" },
  { id: 12, nombre: "Padel" }
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

  // Estado para manejar los valores del formulario
  const [formData, setFormData] = useState({
    nombre: isEditMode ? defaultProductData.nombre : '',
    descripcion: isEditMode ? defaultProductData.descripcion : '',
    precio: isEditMode ? defaultProductData.precio : '',
    cantidad: isEditMode ? defaultProductData.cantidad : '',
    categoria: isEditMode ? defaultProductData.categoria : '',
    talle: isEditMode ? defaultProductData.talle : '',
    genero: isEditMode ? defaultProductData.genero : '',
    envio: isEditMode ? defaultProductData.envio : 'free',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = async (e: React.FormEvent) => {
  e.preventDefault();

  // Armar payload con datos del formulario
  const payload = {
    nombre: formData.nombre,
    categoriaId: parseInt(formData.categoria, 10) || 2,
    color: 3,
    precio: parseFloat(formData.precio),
    descripcion: formData.descripcion,
    imagen: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b2337b4a-e174-4e6c-9f5f-1f7b931ea39e/dunk-low-retro-zapatillas-Sk74kx.png", // imagen fija por ahora
    estado: true,
    genero: formData.genero,
    talle: formData.talle,
  };

  try {
    const response = await fetch('https://tu-api.com/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error al crear producto: ${response.statusText}`);
    }

    const data = await response.json();
    alert('Producto creado con éxito!');
    console.log('Respuesta API:', data);
    navigate('/admin/manage-products');
  } catch (error) {
    console.error('Error al crear producto:', error);
    alert('Error al crear producto. Intenta nuevamente.');
  }
};

  const handleCancel = () => {
    navigate('/admin/manage-products');
  };

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.titleForm}>
        {isEditMode ? 'Editar Producto' : 'Agregar Producto'}
      </h2>
      <form className={styles.fpForm} onSubmit={handleConfirm}>
        {/* Sección izquierda */}
        <div className={styles.fpLeftSection}>
          <h2>Ingresar detalles</h2>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre del artículo"
            className={styles.fpInput}
          />
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            className={styles.fpInput}
          />
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="Precio"
            className={styles.fpInput}
          />
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            placeholder="Cantidad"
            className={styles.fpInput}
          />
          <select
            className={styles.fpSelect}
            name="categoria"
            value={formData.categoria} 
            onChange={handleChange}
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map(({ id, nombre }) => (
              <option key={id} value={id.toString()}>
                {nombre}
              </option>
            ))}
          </select>

          <div className={styles.fpFlexContainer}>
            <select
              className={styles.fpSelects}
              name="talle"
              value={formData.talle}
              onChange={handleChange}
            >
              <option value="">Talle</option>
              {Array.from({ length: 11 }, (_, i) => {
                const size = 36 + i;
                return (
                  <option key={size} value={size.toString()}>
                    {size}
                  </option>
                );
              })}
            </select>
            <select
              className={styles.fpSelects}
              name="genero"
              value={formData.genero}
              onChange={handleChange}
            >
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
                name="envio"
                value="calculated"
                checked={formData.envio === 'calculated'}
                onChange={handleChange}
              />
              Envío calculado
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="envio"
                value="free"
                checked={formData.envio === 'free'}
                onChange={handleChange}
              />
              Envío gratis
            </label>
          </div>

          <div className={styles.shippingOptions}>
            <span className={styles.label}>Subir imagen</span>
            <input
              type="file"
              className={styles.fpInput}
            />
          </div>

          <div className={styles.shippingOptions}>
            <span className={styles.label}>Confirmación de Administrador</span>
            <input
              type="text"
              placeholder="Usuario"
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
              <span>{formData.nombre || ''}</span>
            </div>
            <div className={styles.fpSummaryItem}>
              <span className={styles.fpLightText}>Precio:</span>
              <span className={styles.fpLightText}>${formData.precio || ''}</span>
            </div>
            <div className={styles.fpSummaryItem}>
              <span className={styles.fpLightText}>Cantidad:</span>
              <span className={styles.fpLightText}>{formData.cantidad || ''}</span>
            </div>
            <div className={styles.fpSummaryItem}>
              <span className={styles.fpLightText}>Categoría:</span>
              <span className={styles.fpLightText}>
                {categorias.find(c => c.id.toString() === formData.categoria)?.nombre || ''}
              </span>
            </div>
            <div className={styles.fpSummaryItem}>
              <span className={styles.fpLightText}>Envío:</span>
              <span className={styles.fpLightText}>{formData.envio === 'free' ? 'Gratis' : 'Calculado'}</span>
            </div>
            <div className={styles.fpSummaryItem}>
              <span className={styles.fpLightText}>Género:</span>
              <span className={styles.fpLightText}>{formData.genero || ''}</span>
            </div>
            <div className={styles.fpSummaryItem}>
              <span className={styles.fpLightText}>Talle:</span>
              <span className={styles.fpLightText}>{formData.talle || ''}</span>
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
            <CustomButton text="Confirmar" type="submit" />
            <CustomButton text="Cancelar" onClick={handleCancel} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormProduct;
