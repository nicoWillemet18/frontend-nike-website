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
            <span>Soporte</span>
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
