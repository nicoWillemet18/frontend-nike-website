import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.linksContainer}>
          <div className={styles.linkColumnsWrapper}>
            <div className={styles.linkColumn}>
              <p className={styles.columnTitle}>Ayuda</p>
              <a href="/" className={styles.link}>Opciones de pago</a>
              <a
                href="https://wa.me/5491127996935?text=Hola%20Nike%2C%20quiero%20hacer%20una%20consulta"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contactate
              </a>
            </div>
            <div className={styles.linkColumn}>
              <p className={styles.columnTitle}>Acerca de Nike</p>
              <a href="/catalog" className={styles.link}>Encontra tu calzado</a>
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
          <p className={styles.link}>Términos y condiciones</p>
          <p className={styles.link}>Política de privacidad y cookies</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
