import styles from './header.module.css';
import jordanLogo from '../../assets/AirJordanLogo.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [usuario, setUsuario] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    setUsuario(usuarioGuardado);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('carrito');
    setUsuario(null);
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src={jordanLogo} alt="Jordan Logo" className={styles.logo} />
      </div>
      <div className={styles.right}>
        {usuario ? (
          <>
            <a onClick={handleLogout} style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>
              Cerrar Sesión
            </a>
            <span className={styles.link}>Usuario: {usuario}</span>
          </>
        ) : (
          <>
            <a href="/login" className={styles.link}>Iniciá Sesión</a>
            <a href="/sign-up" className={styles.link}>Registrate</a>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
