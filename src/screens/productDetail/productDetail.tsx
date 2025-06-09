import Footer from '../../ui/footer/footer';
import Header from '../../ui/header/header';
import NavBar from '../../ui/navBar/navBar';
import styles from './productDetail.module.css'
import imgCard from '../../assets/imgCard.png'
import { useEffect, useState } from 'react';
import CustomButton from '../../ui/customButton/customButton';
import ProductShowcase from '../../ui/productShowcase/productShowcase';
import { useParams } from 'react-router-dom';
import { ListarProductoByID } from '../../data/productsController/productsController';
import { toast } from 'react-toastify';



export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<any>(null);
  const [talleSeleccionado, setTalleSeleccionado] = useState<number | null>(null);
  const [cantidad, setCantidad] = useState(1);

  const talles = [
    36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46
  ];

  useEffect(() => {
    const cargarProducto = async () => {
      if (!id) return;
      try {
        const data = await ListarProductoByID(Number(id));
        setProducto(data);
      } catch (error) {
        console.error("Error al cargar el producto", error);
      }
    };
    cargarProducto();
  }, [id]);

  const incrementar = () => {
    if (cantidad < 10) setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  if (!producto) {
    return <p>Cargando producto...</p>;
  }

  function agregarAlCarrito(
  producto: any,
  cantidad: number,
  talleSeleccionado: number | null
) {
  if (!talleSeleccionado) {
    toast.error("Por favor selecciona un talle.");
    return;
  }

  const nuevoItem = {
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
    imagen: producto.imagen || '',
    talle: talleSeleccionado,
    cantidad: cantidad,
  };

  const carritoExistente = JSON.parse(localStorage.getItem("carrito") || "[]");

  const indiceExistente = carritoExistente.findIndex(
    (item: any) => item.id === nuevoItem.id && item.talle === nuevoItem.talle
  );

  if (indiceExistente !== -1) {
    carritoExistente[indiceExistente].cantidad += cantidad;
  } else {
    carritoExistente.push(nuevoItem);
  }

  localStorage.setItem("carrito", JSON.stringify(carritoExistente));
  toast.success("Producto agregado al carrito 🛒");
}

    return (
      <>
      <div className={styles.productDetailContainer}>
        <div>
          <Header/>
          <NavBar/>
        </div>
        <div className={styles.detail}>
          <div className={styles.productImage}>
            <h2>{producto.nombre}</h2>
            <img 
              src={producto.imagen || imgCard} 
              alt={`Imagen de producto ${producto.nombre}`} 
              className={styles.img} 
            />          
          </div>
          <div className={styles.table}>
            <div className={styles.section1}>
              <h3>{producto.nombre}</h3>
              <h5>{producto.descripcion}</h5>
              <h3>${producto.precio}</h3>
            </div>
            <div className={styles.section2}>
            <h2>Talle:</h2>
              <div className={styles.talleGrid}>
                {talles.map((talle) => (
                  <div
                    key={talle}
                    className={`${styles.talleItem} ${talleSeleccionado === talle ? styles.selected : ''}`}
                    onClick={() => setTalleSeleccionado(talle)}
                  >
                    {talle}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.section3}>
              <div className={styles.cantidadContainer}>
                <span className={styles.cantidadLabel}>Cantidad:</span>
                <div className={styles.cantidadControls}>
                  <button
                    onClick={decrementar}
                    className={styles.cantidadIconButton}
                  >
                    <i className="bi bi-chevron-down"></i>
                  </button>
                  <span className={styles.cantidadValue}>{cantidad}</span>
                  <button
                    onClick={incrementar}
                    className={styles.cantidadIconButton}
                  >
                    <i className="bi bi-chevron-up"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.section4}>
              <CustomButton
                text="Agregar al carrito"
                onClick={() => agregarAlCarrito(producto, cantidad, talleSeleccionado)}
              />            
            </div>
          </div>
        </div>
        <div className={styles.similares}>
          <h2>Productos Similares</h2>
          <ProductShowcase />
        </div>
        <Footer/> 
      </div>
      </>
    );
  }  