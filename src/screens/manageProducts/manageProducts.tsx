import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminHeader from "../../ui/adminHeader/adminHeader";
import CustomButton from "../../ui/customButton/customButton";
import Filter from "../../ui/filters/filters";
import Footer from "../../ui/footer/footer";
import TableProducts from "../../ui/tableProducts/tableProducts";
import styles from "./manageProducts.module.css";
import { FiSearch } from "react-icons/fi";
import { ListarProductos } from "../../data/productsController/productsController";
import { Producto } from "../../types/IProducts";
import imgTable from "../../assets/imgCard.png";

export default function ManageProducts() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showFilters, setShowFilters] = useState(true);
  const [products, setProducts] = useState<Producto[]>([]);

  const [filtros, setFiltros] = useState({
    genero: '',
    categoriaId: null as number | null,
    talle: '' as number | '',
    orden: '',
  });

  const [searchTerm, setSearchTerm] = useState('');

  const fetchProductos = async () => {
    try {
      const data: Producto[] = await ListarProductos();
      const mappedProducts = data.map(p => ({
        ...p,
        imagen: p.imagen || imgTable,
      }));
      setProducts(mappedProducts);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const generoParam = params.get('genero') || '';
    setFiltros(prev => ({
      ...prev,
      genero: generoParam,
    }));
  }, [location.search]);

  const productosFiltrados = products
    .filter((product) => {
      if (filtros.genero && product.genero !== filtros.genero) return false;
      if (filtros.categoriaId !== null && product.categoriaId !== filtros.categoriaId) return false;
      if (filtros.talle !== '' && !product.talles.some(t => Number(t.numero) === Number(filtros.talle))) return false;
      if (searchTerm && !product.nombre.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (filtros.orden === "Precio más bajo") return a.precio - b.precio;
      if (filtros.orden === "Precio más alto") return b.precio - a.precio;
      return 0;
    });

  const resetFiltros = () => {
    setFiltros({
      genero: '',
      categoriaId: null,
      talle: '',
      orden: '',
    });
    navigate("/admin/manage-products");
  };

  const handleEdit = (id: number) => {
    navigate(`/admin/edit-product/${id}`);
  };

  return (
    <div className={styles.AdminContainer}>
      <div className={styles.stickyHeader}>
        <AdminHeader />
      </div>

      <section className={styles.barItems}>
        <div className={styles.barItem}>
          <h2>Zapatillas ({productosFiltrados.length})</h2>
          <CustomButton
            text="Agregar producto"
            onClick={() => navigate("/admin/add-product")}
          />
          <button className={styles.barItemButton} onClick={resetFiltros}>Quitar Filtros</button>
        </div>
        <div className={styles.right}>
          <div className={styles.searchWrapper}>
            <FiSearch size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar"
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          className={`${styles.filterSection} ${!showFilters ? styles.hideFilter : ""}`}
        >
          <Filter filtros={filtros} setFiltros={setFiltros} />
        </div>
        <div
          className={`${styles.tableSection} ${!showFilters ? styles.fullWidthTable : ""}`}
        >
          <TableProducts
            products={productosFiltrados}
            onEdit={handleEdit}
            onDelete={fetchProductos}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
