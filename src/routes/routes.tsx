import { Routes, Route } from 'react-router-dom';
import Landing from '../screens/landing/landing';
import Catalog from '../screens/catalog/catalog';
import ProductDetail from '../screens/productDetail/productDetail';
import Cart from '../screens/shoppingCart/shoppingCart';
import SignUp from '../screens/signUp/signUp';
import Login from '../screens/login/login';
import AdminPanel from '../screens/adminPanel/adminPanel';
import AddProduct from '../screens/addProduct/addProduct';
import EditProduct from '../screens/editProduct/editProduct';
import ManageProducts from '../screens/manageProducts/manageProducts';
import ScrollToTop from "./scrollToTop";


const AppRoutes = () => {
  return (
    <>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct isEditMode={true}/>} />
        <Route path="/admin/manage-products" element={<ManageProducts />} />
      </Routes>
    </>
  );
};

export default AppRoutes;