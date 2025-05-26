import styles from './logInForm.module.css';
import Logo from '../../assets/NikeLogoSVG.svg'
import CustomButton from '../customButton/customButton';

const Login = () => {
  return (
    <div className={styles.loginContainer}>
        <img src={Logo} alt="Nike Logo" className={styles.logo} />
        <h2 className={styles.title}>
            TU CUENTA PARA <br /> <b className={styles.title}>TODO LO DE NIKE</b>
        </h2>

        <input type="email" placeholder="Correo electrónico" className={styles.input} />
        <input type="password" placeholder="Contraseña" className={styles.input} />

        <div>
            <div className={styles.leftOption}>
                <input type="checkbox" id="isAdmin" />
                <label htmlFor="isAdmin"> Soy administrador</label>
            </div>
        </div>

        <div className={styles.lineContainer}>
            <div className={styles.rightOption}>
                <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
            <div className={styles.rightOption}>
                <a href="#">Contactá a soporte</a>
            </div>
        </div>

        <p className={styles.description}>Al iniciar sesión, aceptas la Política de privacidad y los Términos de uso de Nike.</p>

        <div className={styles.buttonlogin}>
            <CustomButton text="Iniciar Sesión" onClick={() => console.log('Sesión Iniciada')} />
        </div>

        <p className={styles.joinText}>
            ¿Aún no eres miembro? <a href="/sign-up">Únete</a>
        </p>
    </div>
    );
};

export default Login;