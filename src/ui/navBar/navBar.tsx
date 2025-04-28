import styles from './NavBar.module.css';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import nikeLogo from '../../assets/NikeLogoSVG.svg';


export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <a href="/">
        <img src={nikeLogo} alt="Nike Logo" className={styles.logo} />
        </a>
      </div>

      <div className={styles.center}>
        <a href="#" className={styles.link}>Hombre</a>
        <a href="#" className={styles.link}>Mujer</a>
        <a href="#" className={styles.link}>Niño/a</a>
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
        <button className={styles.iconButton}>
            <FiShoppingBag size={20} />
        </button>
    </div>
    </nav>
  );
}
