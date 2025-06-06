import { useNavigate } from "react-router-dom";
import { FiMessageCircle } from "react-icons/fi";
import styles from "./adminHeader.module.css";
import nikeLogo from "../../assets/NikeLogoSVG.svg";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Sesión cerrada");
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/admin");
  };

  const username = "Admin1";

  return (
    <div>
      <header className={styles.adminHeader}>
        <div className={styles.left} onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img src={nikeLogo} alt="Nike Logo" className={styles.logo} />
        </div>

        <div className={styles.right}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Cerrar sesión
          </button>
          <div className={styles.user}>
            Usuario: {username}
          </div>
          <div className={styles.soporte}>
            <a
                href="https://wa.me/5491127996935?text=Hola%20Nike%2C%20soy%20administrador%20y%20necesito%20soporte."
                target="_blank"
                rel="noopener noreferrer"
              >
                Soporte
              </a>
            <FiMessageCircle size={20} />
          </div>
        </div>
      </header>
      <div className={styles.admin}>
        <h2>Administración</h2>
      </div>
    </div>
  );
};

export default AdminHeader;
