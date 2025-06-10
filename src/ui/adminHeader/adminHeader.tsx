import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMessageCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import styles from "./adminHeader.module.css";
import nikeLogo from "../../assets/NikeLogoSVG.svg";
import LogoutConfirm from "../../ui/toastAlerts/LogoutConfirm";

interface Usuario {
  nombre: string;
  apellido: string;
}

const AdminHeader = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>({ nombre: "", apellido: "" });

  useEffect(() => {
    const usuarioStorage = localStorage.getItem("usuario");
    if (usuarioStorage) {
      const partes = usuarioStorage.split(" ");
      setUsuario({
        nombre: partes[0] || "",
        apellido: partes.slice(1).join(" ") || "",
      });
    }
  }, []);

  const handleLogout = () => {
    const onConfirm = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      setUsuario(null);
      navigate('/');
      toast.dismiss();
      toast.success('Sesión cerrada', { theme: 'dark' });
    };

    const onCancel = () => toast.dismiss();

    toast(
      <LogoutConfirm onConfirm={onConfirm} onCancel={onCancel} />,
      {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        pauseOnHover: true,
      }
    );
  };

  const handleLogoClick = () => {
    navigate("/admin");
  };

  return (
    <div>
      <header className={styles.adminHeader}>
        <div
          className={styles.left}
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <img src={nikeLogo} alt="Nike Logo" className={styles.logo} />
        </div>

        <div className={styles.right}>
          <a
            onClick={handleLogout}
            style={{ cursor: "pointer", color: "inherit", textDecoration: "none" }}
          >
            Cerrar Sesión
          </a>
          <div>
            Usuario: {usuario?.nombre} {usuario?.apellido}
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
