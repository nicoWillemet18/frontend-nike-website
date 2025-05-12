import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.linksContainer}>
          <div className={styles.linkColumnsWrapper}>
            <div className={styles.linkColumn}>
              <a href="/" className={styles.columnTitle}>Ayuda</a>
              <a href="/" className={styles.link}>Opciones de pago</a>
              <a href="/" className={styles.link}>Contactate</a>
            </div>
            <div className={styles.linkColumn}>
              <a href="/" className={styles.columnTitle}>Acerca de Nike</a>
              <a href="/catalog" className={styles.link}>Encontra tu calzado</a>
              <a href="/" className={styles.link}>Noticias</a>
            </div>
          </div>
          <div className={styles.socialsWrapper}>
            <div className={styles.socialsContainer}>
              <FaInstagram className={styles.socialIcon} />
              <FaFacebookF className={styles.socialIcon} />
              <FaTwitter className={styles.socialIcon} />
              <FaYoutube className={styles.socialIcon} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerLeft}>
          <FaMapMarkerAlt className={styles.locationIcon} />
          <span>Argentina</span>
          <p>© 2025 Southbay S.R.L. Todos los derechos reservados.</p>
        </div>
        <div className={styles.footerRight}>
          <a href="/" className={styles.link}>Términos y condiciones</a>
          <a href="/" className={styles.link}>Política de privacidad y cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
