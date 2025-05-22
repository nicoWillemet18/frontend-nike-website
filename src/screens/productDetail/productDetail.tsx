import Footer from '../../ui/footer/footer';
import Header from '../../ui/header/header';
import NavBar from '../../ui/navBar/navBar';
import styles from './productDetail.module.css'
import imgCard from '../../assets/imgCard.png'
import { useState } from 'react';
import CustomButton from '../../ui/customButton/customButton';
import ProductShowcase from '../../ui/productShowcase/productShowcase';


export default function ProductDetail() {
  const [talleSeleccionado, setTalleSeleccionado] = useState<number | null>(null);
  const [cantidad, setCantidad] = useState(1);

  const talles = [
    36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5,
    41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46
  ];
  const incrementar = () => {
    if (cantidad < 10) setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

    return (
      <>
      <div className={styles.productDetailContainer}>
        <div>
          <Header/>
          <NavBar/>
        </div>
        <div className={styles.detail}>
          <div className={styles.productImage}>
            <h2>Nike C1TY</h2>
            <img src={imgCard} alt="Imagen de produtcto" className={styles.img} />
          </div>
          <div className={styles.table}>
            <div className={styles.section1}>
              <h3>Nike C1TY</h3>
              <h5>Zapatillas de moda para Hombre</h5>
              <h3>$199.999</h3>
            </div>
            <div className={styles.section2}>
            <h2>Talle</h2>
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
              <CustomButton text="Agregar al carrito" onClick={() => console.log('Agregado al carrito')}/>
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