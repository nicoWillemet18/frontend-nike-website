import Footer from '../../ui/footer/footer';
import FormProduct from '../../ui/formProducts/formProducts';
import Header from '../../ui/header/header';
import NavBar from '../../ui/navBar/navBar';

export default function AddProduct() {

  return (
    <>
    <div>
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