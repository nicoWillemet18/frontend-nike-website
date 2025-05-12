import CartProducts from '../../ui/cartProducts/cartProducts';
import DetailsCart from '../../ui/detailsCart/detailsCart';
import Footer from '../../ui/footer/footer';
import Header from '../../ui/header/header';
import NavBar from '../../ui/navBar/navBar';
import styles from './shoppingCart.module.css'


export default function ShoppingCart() {

    return (
      <>
      <div className={styles.shoppingCartContainer}>
        <div>
          <Header/>
          <NavBar/>
        </div>
        <div className={styles.containerFlex}>
        <div className={styles.tableProducts}>
          <div className={styles.leftSection}>
            <CartProducts />
          </div>
          <div className={styles.rightSection}>
            <DetailsCart />
          </div>
        </div>
          <div className={styles.detallesCart}>
          </div>
        </div>
        <Footer/>
      </div>
      </>
    );
  }  