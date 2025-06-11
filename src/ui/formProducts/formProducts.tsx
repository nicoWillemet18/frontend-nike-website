import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './formProducts.module.css';
import CustomButton from '../customButton/customButton';
import noImage from '../../assets/noImage.jpg';
import { CrearProducto, EditarProducto, ListarProductoByID } from '../../data/productsController/productsController';
import { Producto } from '../../types/IProducts';
import Swal from "sweetalert2";
import { uploadImages } from '../../data/productsController/imageController';

const categorias = [
  { id: 1, nombre: "Deportivas" },
  { id: 2, nombre: "Urbanas" },
  { id: 3, nombre: "Botines" },
  { id: 4, nombre: "Básquet" },
  { id: 5, nombre: "Skate" },
  { id: 6, nombre: "Sandalias" },
  { id: 7, nombre: "Ténis" },
  { id: 8, nombre: "Air Max" },
  { id: 9, nombre: "Jordan" },
  { id: 10, nombre: "Edición Limitada" },
  { id: 11, nombre: "Pádel" }
];

const tallesDisponibles = [
  { id: 1, numero: "36" },
  { id: 2, numero: "37" },
  { id: 3, numero: "38" },
  { id: 4, numero: "39" },
  { id: 5, numero: "40" },
  { id: 6, numero: "41" },
  { id: 7, numero: "42" },
  { id: 8, numero: "43" },
  { id: 9, numero: "44" },
  { id: 10, numero: "45" },
  { id: 11, numero: "46" },
];

interface FormProductProps {
  isEditMode?: boolean;
}

const FormProduct: React.FC<FormProductProps> = ({ isEditMode = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState([noImage]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  

  useEffect(() => {
    const fetchProducto = async () => {
      if (isEditMode && id !== undefined) {
        try {
          const productoData = await ListarProductoByID(Number(id));
          setFormData({
            nombre: productoData.nombre || '',
            descripcion: productoData.descripcion || '',
            precio: String(productoData.precio || ''),
            cantidad: String(productoData.stock || ''),
            categoria: String(productoData.categoriaId || ''),
            talle: productoData.talles?.map((t: any) => String(t.numero)) || [],
            genero: productoData.genero || '',
            envio: productoData.envio || 'free',
            imagen: productoData.imagen || '',
          });
          setImages(productoData.imagen ? [productoData.imagen] : [noImage]);

        } catch (error) {
          Swal.fire("Error", "No se pudo cargar el producto", "error");
        }
      }
    };

    fetchProducto();
  }, [id, isEditMode]);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    cantidad: '',
    categoria: '',
    talle: [] as string[],
    genero: '',
    envio: 'free',
    imagen: '',
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
      precio: parseFloat(formData.precio),
      descripcion: formData.descripcion,
      imagen: images[0],
      estado: true,
      stock: parseInt(formData.cantidad) || 0,
      genero: formData.genero,
      talles: formData.talle
        .map(talleNumero => tallesDisponibles.find(t => t.numero === talleNumero))
        .filter(Boolean) as { id: number; numero: string }[],
    };

    try {
      if (isEditMode && id) {
        console.log('Editando producto con id:', id);
        console.log('Payload a enviar:', payload);
        await EditarProducto(Number(id), payload);
        Swal.fire("Éxito", "Producto editado con éxito!", "success");
      } else {
        await CrearProducto(payload);
        Swal.fire("Éxito", "Producto creado con éxito!", "success");
      }

      navigate('/admin/manage-products');
    } catch (error) {
      Swal.fire("Error", isEditMode ? "Error al editar producto" : "Error al crear producto", "error");
      console.error('Error en el formulario:', error);
    }
  };

  const handleTalleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevoTalle = e.target.value;
    if (nuevoTalle === "") return;

    setFormData(prev => {
      if (prev.talle.includes(nuevoTalle)) {
        return {
          ...prev,
          talle: prev.talle.filter(t => t !== nuevoTalle),
        };
      } else {
        return {
          ...prev,
          talle: [...prev.talle, nuevoTalle],
        };
      }
    });
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
            <select
              className={styles.fpSelects}
              name="talle"
              value=""
              onChange={handleTalleChange}
            >
              <option value="">Talle</option>
              {tallesDisponibles.map(({ id, numero }) => (
                <option key={id} value={numero}>{numero}</option>
              ))}
            </select>
            <select className={styles.fpSelects} name="genero" value={formData.genero} onChange={handleChange}>
              <option value="">Género</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Niño/a">Niño/a</option>
            </select>
          </div>

          <div className={styles.shippingOptions}>
            <span className={styles.label}>Subir imagen</span>
            <input type="file" className={styles.fpInput} ref={inputRef} onChange={handleFileChange} multiple />
            <CustomButton text="Subir" onClick={uploadFiles} />
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
            <div className={styles.fpSummaryItem}>
              <span className={styles.fpLightText}>Talle:</span>
              <span>{formData.talle.join(', ')}</span>
            </div>            
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
