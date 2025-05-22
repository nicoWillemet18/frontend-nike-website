import styles from './header.module.css';
import jordanLogo from '../../assets/AirJordanLogo.svg';


const Header = () => {

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src={jordanLogo} alt="Jordan Logo" className={styles.logo} />
      </div>
      <div className={styles.right}>
        <a href="/login" className={styles.link}>Iniciá Sesión</a>
        <a href="/sign-up" className={styles.link}>Registrate</a>
      </div>
    </header>
  );
};

export default Header;
