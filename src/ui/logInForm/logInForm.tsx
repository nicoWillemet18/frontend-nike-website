import styles from './logInForm.module.css';
import Logo from '../../assets/NikeLogoSVG.svg';
import CustomButton from '../customButton/customButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../data/auth/authController';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!usuario || !password) {
            toast.error('Completá usuario y contraseña');
            return;
        }

        try {
            const data = await loginUser({ usuario, password });
            toast.success('Sesión iniciada correctamente');

            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario', data.usuarname);

            if (isAdmin) {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            toast.error(`Error: ${error}`);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <img src={Logo} alt="Nike Logo" className={styles.logo} />
            <h2 className={styles.title}>
                TU CUENTA PARA <br /> <b className={styles.title}>TODO LO DE NIKE</b>
            </h2>

            <input
                type="text"
                placeholder="Nombre de usuario"
                className={styles.input}
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className={styles.lineContainer}>
                <div className={styles.leftOption}>
                    <input
                        type="checkbox"
                        id="isAdmin"
                        checked={isAdmin}
                        onChange={() => setIsAdmin(!isAdmin)}
                    />
                    <label htmlFor="isAdmin"> Soy administrador</label>
                </div>

                <div className={styles.rightOption}>
                    <a
                        href="https://wa.me/5491127996935?text=Hola%2C%20necesito%20ayuda%20para%20iniciar%20sesión"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Contactá a soporte
                    </a>
                </div>
            </div>

            <p className={styles.description}>
                Al iniciar sesión, aceptas la Política de privacidad y los Términos de uso de Nike.
            </p>

            <div className={styles.buttonlogin}>
                <CustomButton text="Iniciar Sesión" onClick={handleLogin} />
            </div>

            <p className={styles.joinText}>
                ¿Aún no eres miembro? <a href="/sign-up">Únete</a>
            </p>

            <ToastContainer />
        </div>
    );
};

export default Login;
