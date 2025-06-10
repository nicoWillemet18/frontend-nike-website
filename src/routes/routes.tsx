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
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Landing />
            </PublicRoute>
          }
        />
        <Route
          path="/catalog"
          element={
            <PublicRoute>
              <Catalog />
            </PublicRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PublicRoute>
              <ProductDetail />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Rutas para CLIENT */}
        <Route
          path="/cart"
          element={
            <PrivateRoute allowedRoles={["CLIENT"]}>
              <Cart />
            </PrivateRoute>
          }
        />

        {/* Rutas para ADMIN */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/edit-product/:id"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <EditProduct isEditMode={true} />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-products"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <ManageProducts />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;