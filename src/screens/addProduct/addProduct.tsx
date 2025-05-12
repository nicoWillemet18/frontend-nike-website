import Footer from '../../ui/footer/footer';
import FormProduct from '../../ui/formProducts/formProducts';
import Header from '../../ui/header/header';
import NavBar from '../../ui/navBar/navBar';
import styles from './addProduct.module.css'

export default function AddProduct() {

  return (
    <>
    <div className={styles.loginContainer}>
      <div>
        <Header/>
        <NavBar/>
      </div>
      <FormProduct/>
      <Footer/>
    </div>
    </>
  );
} 