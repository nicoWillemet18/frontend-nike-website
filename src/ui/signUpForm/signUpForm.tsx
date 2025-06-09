import { useState } from 'react';
import styles from './signUpForm.module.css';
import Logo from '../../assets/NikeLogoSVG.svg';
import CustomButton from '../customButton/customButton';
import { registerUser } from '../../data/auth/authController';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [usuario, setUsuario] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');

    const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d).{3,}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

    if (!emailRegex.test(email)) {
        toast.error('Correo electrónico inválido');
        return;
    }

    if (name.trim().length < 3 || lastName.trim().length < 3) {
        toast.error('Nombre y apellido deben tener al menos 3 letras');
        return;
    }

    if (!alphanumericRegex.test(usuario)) {
        toast.error('El nombre de usuario debe contener letras y números (mínimo 3 caracteres)');
        return;
    }

    if (!passwordRegex.test(password)) {
        toast.error('La contraseña debe tener al menos 6 caracteres, incluyendo letras y números');
        return;
    }

    if (!birthDate) {
        toast.error('Debes ingresar tu fecha de nacimiento');
        return;
    }

    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const isBirthdayPassed =
        today.getMonth() > birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());

    const userAge = isBirthdayPassed ? age : age - 1;

    if (userAge < 18) {
        toast.error('Debes tener al menos 18 años para registrarte');
        return;
    }

    if (!gender) {
        toast.error('Debes seleccionar un género');
        return;
    }

    try {
        await registerUser({ name, lastName, usuario, password, email });
        toast.success('Usuario registrado exitosamente');
    } catch (error) {
        toast.error(`Error: ${error}`);
    }
};

    return (
        <div className={styles.signUpContainer}>
            <img src={Logo} alt="Nike Logo" className={styles.logo} />
            <h2 className={styles.title}>CREA TU CUENTA NIKE</h2>
            <p className={styles.infoText}>
                Crea tu perfil de miembro Nike y obtén acceso prioritario a lo mejor de los productos, la inspiración y la comunidad de Nike.
            </p>

            <input
                type="email"
                placeholder="Correo electrónico"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="text"
                placeholder="Nombre"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Apellido"
                className={styles.input}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Nombre de usuario"
                className={styles.input}
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
            />
            <label className={styles.label}>Fecha de nacimiento</label>
            <input
                type="date"
                className={styles.input}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
            />

            <div className={styles.inputGroup}>
                <label className={styles.radioLabel}>
                    <input
                        type="radio"
                        name="gender"
                        value="Masculino"
                        className={styles.hiddenRadio}
                        checked={gender === 'Masculino'}
                        onChange={() => setGender('Masculino')}
                    />
                    Masculino
                </label>
                <label className={styles.radioLabel}>
                    <input
                        type="radio"
                        name="gender"
                        value="Femenino"
                        className={styles.hiddenRadio}
                        checked={gender === 'Femenino'}
                        onChange={() => setGender('Femenino')}
                    />
                    Femenino
                </label>
            </div>

            <p className={styles.description}>
                Al iniciar sesión, aceptas la Política de privacidad y los Términos de uso de Nike.
            </p>

            <div className={styles.buttonSignUp}>
                <CustomButton text="Registrarse" onClick={handleRegister} />
            </div>

            <p className={styles.joinText}>
                ¿Ya eres miembro? <a href="login">Iniciá sesión</a>
            </p>

            <ToastContainer />
        </div>
    );
};

export default SignUpForm;
