import styles from './signUpForm.module.css';
import Logo from '../../assets/NikeLogoSVG.svg';
import CustomButton from '../customButton/customButton';

const SignUpForm = () => {
    return (
        <div className={styles.signUpContainer}>
            <img src={Logo} alt="Nike Logo" className={styles.logo} />
            <h2 className={styles.title}>
                CREA TU CUENTA NIKE
            </h2>
            <p className={styles.infoText}>
                Crea tu perfil de miembro Nike y obtén acceso prioritario a lo mejor de los productos, la inspiración y la comunidad de Nike.
            </p>

            <input type="email" placeholder="Correo electrónico" className={styles.input} />
            <input type="password" placeholder="Contraseña" className={styles.input} />
            <input type="text" placeholder="Nombre" className={styles.input} />
            <input type="text" placeholder="Apellido" className={styles.input} />
            <label className={styles.label}>Fecha de nacimiento</label>
            <input type="date" className={styles.input} />

            <div className={styles.inputGroup}>
                <label className={styles.radioLabel}>
                    <input type="radio" name="gender" value="Masculino" className={styles.hiddenRadio} />
                    Masculino
                </label>
                <label className={styles.radioLabel}>
                    <input type="radio" name="gender" value="Femenino" className={styles.hiddenRadio} />
                    Femenino
                </label>
            </div>

            <p className={styles.description}>Al iniciar sesión, aceptas la Política de privacidad y los Términos de uso de Nike.</p>

            <div className={styles.buttonSignUp}>
                <CustomButton text="Registrarse" onClick={() => console.log('Registrado')} />
            </div>

            <p className={styles.joinText}>
                ¿Ya eres miembro? <a href="login">Iniciá sesión</a>
            </p>
        </div>
    );
};

export default SignUpForm;
