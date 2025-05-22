import AdminHeader from '../../ui/adminHeader/adminHeader';
import Footer from '../../ui/footer/footer';
import FormProduct from '../../ui/formProducts/formProducts';
import styles from './editProduct.module.css'

interface Props {
  isEditMode?: boolean;
}

export default function EditProduct({ isEditMode = false }: Props) {

  return (
    <>
    <div>
      <div className={styles.stickyHeader}>
        <AdminHeader />
      </div>
      <FormProduct isEditMode={isEditMode} />
      <Footer/>
    </div>
    </>
  );
} 