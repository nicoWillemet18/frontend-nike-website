import { useState } from 'react';
import styles from './header.module.css';
import jordanLogo from '../../assets/AirJordanLogo.svg';


const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src={jordanLogo} alt="Jordan Logo" className={styles.logo} />
      </div>
      <div className={styles.right}>
        <a href="/login" className={styles.link}>Iniciá Sesión</a>
        <a href="/sign-up" className={styles.link}>Registrate</a>

        <div className={styles.dropdownContainer} onMouseLeave={closeDropdown}>
          <button onClick={toggleDropdown} className={styles.link}>
            Ayuda
          </button>
          {showDropdown && (
            <div className={styles.dropdownMenu}>
              <a href="#" className={styles.dropdownItem}>Opciones de Pago</a>
              <a href="#" className={styles.dropdownItem}>Contactate</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
