import Footer from '../../ui/footer/footer';
import Header from '../../ui/header/header';
import NavBar from '../../ui/navBar/navBar';
import styles from './productDetail.module.css'
import imgCard from '../../assets/imgCard.png'
import { useEffect, useState } from 'react';
import CustomButton from '../../ui/customButton/customButton';
import ProductShowcase from '../../ui/productShowcase/productShowcase';
import { useParams, useNavigate } from 'react-router-dom';
import { ListarProductoByID } from '../../data/productsController/productsController';
import { toast } from 'react-toastify';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<any>(null);
  const [talleSeleccionado, setTalleSeleccionado] = useState<number | null>(null);
  const [cantidad, setCantidad] = useState('1');
  const navigate = useNavigate();

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

  if (!producto) {
    return <p>Cargando producto...</p>;
  }

  function agregarAlCarrito(
      producto: any,
      cantidadNum: number,
      talleSeleccionado: number | null
    ) {
      const usuario = localStorage.getItem('usuario');
      if (!usuario) {
        navigate('/login');
        return;
      }

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
        cantidad: cantidadNum,
      };

      const carritoExistente = JSON.parse(localStorage.getItem("carrito") || "[]");

      const cantidadExistente = carritoExistente
        .filter((item: any) => item.id === producto.id)
        .reduce((acc: number, item: any) => acc + item.cantidad, 0);

      const nuevaCantidadTotal = cantidadExistente + cantidadNum;

      if (nuevaCantidadTotal > producto.stock) {
        const disponibles = producto.stock - cantidadExistente;
        toast.error(
          `Solo quedan ${disponibles > 0 ? disponibles : 0} unidades disponibles.`
        );
        return;
      }

      const indiceExistente = carritoExistente.findIndex(
        (item: any) => item.id === nuevoItem.id && item.talle === nuevoItem.talle
      );

      if (indiceExistente !== -1) {
        carritoExistente[indiceExistente].cantidad += cantidadNum;
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
                {talles.map((talle) => {
                  const disponible = producto.talles?.some((t: any) => Number(t.numero) === talle);

                  return (
                    <div
                      key={talle}
                      className={`
                        ${styles.talleItem}
                        ${talleSeleccionado === talle ? styles.selected : ''}
                        ${!disponible ? styles.disabled : ''}
                      `}
                      onClick={() => {
                        if (disponible) setTalleSeleccionado(talle);
                      }}
                    >
                      {talle}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.sectionStock}>
                <h4>Stock disponible: {producto.stock}</h4>
            </div>
            <div className={styles.section3}>
              <div className={styles.cantidadContainer}>
                <label className={styles.cantidadLabel} htmlFor="cantidad">Cantidad:</label>
                <input
                  id="cantidad"
                  type="number"
                  min={1}
                  value={cantidad}
                  onChange={(e) => {
                    const valor = e.target.value;
                    if (valor === '') {
                      setCantidad('');
                      return;
                    }
                    const numero = Number(valor);
                    if (!isNaN(numero) && numero > 0) {
                      setCantidad(valor);
                    }
                  }}
                  className={styles.cantidadInput}
                />
              </div>
            </div>

            <div className={styles.section4}>
              <CustomButton
                text="Agregar al carrito"
                onClick={() => agregarAlCarrito(producto, Number(cantidad) || 1, talleSeleccionado)}
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
