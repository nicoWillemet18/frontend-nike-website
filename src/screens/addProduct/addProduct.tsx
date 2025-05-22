import AdminHeader from '../../ui/adminHeader/adminHeader';
import Footer from '../../ui/footer/footer';
import FormProduct from '../../ui/formProducts/formProducts';
import styles from './addProduct.module.css'

export default function AddProduct() {

  return (
    <>
    <div>
      <div className={styles.stickyHeader}>
        <AdminHeader />
      </div>
      <FormProduct/>
      <Footer/>
    </div>
    </>
  );
} 