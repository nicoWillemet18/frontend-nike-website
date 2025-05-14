import Footer from '../../ui/footer/footer';
import FormProduct from '../../ui/formProducts/formProducts';
import Header from '../../ui/header/header';
import NavBar from '../../ui/navBar/navBar';

interface Props {
  isEditMode?: boolean;
}

export default function EditProduct({ isEditMode = false }: Props) {

  return (
    <>
    <div>
      <div>
        <Header/>
        <NavBar/>
      </div>
      <FormProduct isEditMode={isEditMode} />
      <Footer/>
    </div>
    </>
  );
} 