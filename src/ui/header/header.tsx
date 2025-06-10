import styles from './header.module.css';
import jordanLogo from '../../assets/AirJordanLogo.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LogoutConfirm from '../toastAlerts/LogoutConfirm';

const Header = () => {
  const [usuario, setUsuario] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    setUsuario(usuarioGuardado);
  }, []);

  const handleLogout = () => {
  const onConfirm = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('carrito');
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
            <span>Usuario: {usuario}</span>
          </>
        ) : (
          <>
            <a href="/login">Iniciá Sesión</a>
            <a href="/sign-up">Registrate</a>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
