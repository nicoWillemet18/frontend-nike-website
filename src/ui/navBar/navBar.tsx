import styles from './navBar.module.css';
import { FiShoppingBag } from 'react-icons/fi';
import nikeLogo from '../../assets/NikeLogoSVG.svg';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <a href="/">
          <img src={nikeLogo} alt="Nike Logo" className={styles.logo} />
        </a>
      </div>

      <div className={styles.center}>
        <button className={styles.link} onClick={() => navigate('/catalog?genero=Hombre')}>Hombre</button>
        <button className={styles.link} onClick={() => navigate('/catalog?genero=Mujer')}>Mujer</button>
        <button className={styles.link} onClick={() => navigate('/catalog?genero=Niño/a')}>Niño/a</button>
      </div>

      <div className={styles.right}>
        <button
          className={styles.iconButton}
          onClick={() => {
            const usuario = localStorage.getItem('usuario');
            navigate(usuario ? '/cart' : '/login');
          }}
        >
          <FiShoppingBag size={20} />
        </button>
      </div>
    </nav>
  );
}
