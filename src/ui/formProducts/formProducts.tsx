import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './formProducts.module.css';
import CustomButton from '../customButton/customButton';
import noImage from '../../assets/noImage.jpg';
import { CrearProducto } from '../../data/productsController/productsController';
import { Producto } from '../../types/products';
import Swal from "sweetalert2";
import { IImage } from '../../types/IImage';
import { uploadImages } from '../../data/productsController/imageController';

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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState([noImage]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const defaultProductData = {
    nombre: 'Nike Court Vision Low',
    descripcion: 'Zapatillas urbanas para hombre',
    precio: '310000',
    cantidad: '425',
    categoria: 'Urbanas',
    talle: '38',
    genero: 'hombre',
    envio: 'free',
    imagen: '',
  };

  const [formData, setFormData] = useState({
    nombre: isEditMode ? defaultProductData.nombre : '',
    descripcion: isEditMode ? defaultProductData.descripcion : '',
    precio: isEditMode ? defaultProductData.precio : '',
    cantidad: isEditMode ? defaultProductData.cantidad : '',
    categoria: isEditMode ? defaultProductData.categoria : '',
    talle: isEditMode ? defaultProductData.talle : '',
    genero: isEditMode ? defaultProductData.genero : '',
    envio: isEditMode ? defaultProductData.envio : 'free',
    imagen: isEditMode ? defaultProductData.imagen : '',
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

    const payload: Producto = {
      nombre: formData.nombre,
      categoriaId: parseInt(formData.categoria, 10) || 2,
      color: 3,
      precio: parseFloat(formData.precio),
      descripcion: formData.descripcion,
      imagen: images[0],
      estado: true,
      stock: 300,
      genero: formData.genero,
      talles: [{ id: 1, numero: formData.talle }],
    };

    try {
      await CrearProducto(payload);
      Swal.fire("Éxito", "Producto creado con éxito!", "success");
      navigate('/admin/manage-products');
    } catch (error) {
      Swal.fire("Error", "Error al crear producto. Intenta nuevamente.", "error");
      console.error('Error al crear producto:', error);
    }
  };

  const handleCancel = () => {
    navigate('/admin/manage-products');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const uploadFiles = async () => {
    if (!selectedFiles) {
      return Swal.fire("No hay imágenes seleccionadas", "Selecciona al menos una imagen", "warning");
    }

    Swal.fire({
      title: "Subiendo imágenes...",
      text: "Espere mientras se suben los archivos.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const response = await uploadImages(selectedFiles);
      Swal.close();

      if (response.ok) {
        const res = await uploadImages(selectedFiles);
        const responseData = await res.json();
        setImages(responseData.urls);
        Swal.fire("Éxito", "Imágenes subidas correctamente", "success");
      } else {
        Swal.fire("Error", "Algo falló al subir las imágenes, inténtalo de nuevo.", "error");
      }
    } catch (error) {
      Swal.close();
      Swal.fire("Error", "Algo falló, contacta al desarrollador.", "error");
      console.error("Error:", error);
    }

    if (inputRef.current) inputRef.current.value = "";
    setSelectedFiles(null);
  };

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.titleForm}>{isEditMode ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <form className={styles.fpForm} onSubmit={handleConfirm}>
        <div className={styles.fpLeftSection}>
          <h2>Ingresar detalles</h2>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre del artículo" className={styles.fpInput} />
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" className={styles.fpInput} />
          <input type="number" name="precio" value={formData.precio} onChange={handleChange} placeholder="Precio" className={styles.fpInput} />
          <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} placeholder="Cantidad" className={styles.fpInput} />
          <select className={styles.fpSelect} name="categoria" value={formData.categoria} onChange={handleChange}>
            <option value="">Seleccionar categoría</option>
            {categorias.map(({ id, nombre }) => (
              <option key={id} value={id.toString()}>{nombre}</option>
            ))}
          </select>

          <div className={styles.fpFlexContainer}>
            <select className={styles.fpSelects} name="talle" value={formData.talle} onChange={handleChange}>
              <option value="">Talle</option>
              {Array.from({ length: 11 }, (_, i) => {
                const size = 36 + i;
                return <option key={size} value={size.toString()}>{size}</option>;
              })}
            </select>
            <select className={styles.fpSelects} name="genero" value={formData.genero} onChange={handleChange}>
              <option value="">Género</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Niño/a">Niño/a</option>
            </select>
          </div>

          <div className={styles.shippingOptions}>
            <span className={styles.label}>Tipo de envío:</span>
            <label className={styles.radioLabel}>
              <input type="radio" name="envio" value="calculated" checked={formData.envio === 'calculated'} onChange={handleChange} />
              Envío calculado
            </label>
            <label className={styles.radioLabel}>
              <input type="radio" name="envio" value="free" checked={formData.envio === 'free'} onChange={handleChange} />
              Envío gratis
            </label>
          </div>

          <div className={styles.shippingOptions}>
            <span className={styles.label}>Subir imagen</span>
            <input type="file" className={styles.fpInput} ref={inputRef} onChange={handleFileChange} multiple />
            <CustomButton text="Subir" onClick={uploadFiles} />
          </div>

          <div className={styles.shippingOptions}>
            <span className={styles.label}>Confirmación de Administrador</span>
            <input type="text" placeholder="Usuario" className={styles.fpInput} />
            <input type="password" placeholder="Contraseña" className={styles.fpInput} />
          </div>
        </div>

        <div className={styles.fpRightSection}>
          <h2>Resumen</h2>
          <div className={styles.fpSummary}>
            <div className={styles.fpSummaryItem}><span className={styles.fpBold}>Artículo:</span><span>{formData.nombre}</span></div>
            <div className={styles.fpSummaryItem}><span className={styles.fpLightText}>Precio:</span><span>${formData.precio}</span></div>
            <div className={styles.fpSummaryItem}><span className={styles.fpLightText}>Cantidad:</span><span>{formData.cantidad}</span></div>
            <div className={styles.fpSummaryItem}><span className={styles.fpLightText}>Categoría:</span><span>{categorias.find(c => c.id.toString() === formData.categoria)?.nombre}</span></div>
            <div className={styles.fpSummaryItem}><span className={styles.fpLightText}>Envío:</span><span>{formData.envio === 'free' ? 'Gratis' : 'Calculado'}</span></div>
            <div className={styles.fpSummaryItem}><span className={styles.fpLightText}>Género:</span><span>{formData.genero}</span></div>
            <div className={styles.fpSummaryItem}><span className={styles.fpLightText}>Talle:</span><span>{formData.talle}</span></div>
            <div className={styles.fpSummaryImg}><span className={styles.fpBold}>{formData.nombre}</span><img src={images[0]} alt="Producto" className={styles.fpImagePreview} /></div>
            <div className={styles.fpSummaryImg}><span className={styles.fpLightText}>{formData.descripcion}</span></div>
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
