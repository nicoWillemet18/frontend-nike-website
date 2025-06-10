import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../ui/adminHeader/adminHeader";
import CustomButton from "../../ui/customButton/customButton";
import Filter from "../../ui/filters/filters";
import Footer from "../../ui/footer/footer";
import TableProducts from "../../ui/tableProducts/tableProducts";
import styles from "./manageProducts.module.css";
import { FiSearch } from "react-icons/fi";
import { ListarProductos } from "../../data/productsController/productsController";
import { Producto } from "../../types/products";
import imgTable from "../../assets/imgCard.png";

export default function ManageProducts() {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(true);
  const [products, setProducts] = useState<
    {
      id: number;
      name: string;
      gender: string;
      price: string;
      stock: number;
      image: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data: Producto[] = await ListarProductos();

        const mappedProducts = data.map((p, index) => ({
          id: index, // o p.id si existe
          name: p.nombre,
          gender: p.genero,
          price: `$${p.precio}`,
          stock: Math.floor(Math.random() * 21), // stock aleatorio entre 0 y 20
          image: p.imagen ||imgTable, 
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/admin/edit-product/${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Eliminar producto con ID: ${id}`);
  };

  return (
    <div className={styles.AdminContainer}>
      <div className={styles.stickyHeader}>
        <AdminHeader />
      </div>

      <section className={styles.barItems}>
        <div className={styles.barItem}>
          <h2>Zapatillas ({products.length})</h2>
          <CustomButton
            text="Agregar producto"
            onClick={() => navigate("/admin/add-product")}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.searchWrapper}>
            <FiSearch size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar"
              className={styles.searchInput}
            />
          </div>
          <button
            className={styles.barButton}
            onClick={() => setShowFilters((prev) => !prev)}
          >
            {showFilters ? "Ocultar filtros" : "Mostrar filtros"}{" "}
            <i className="bi bi-filter"></i>
          </button>
        </div>
      </section>

      <div className={styles.listProducts}>
        <div
          className={`${styles.filterSection} ${
            !showFilters ? styles.hideFilter : ""
          }`}
        >
          <Filter />
        </div>
        <div
          className={`${styles.tableSection} ${
            !showFilters ? styles.fullWidthTable : ""
          }`}
        >
          <TableProducts
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
