import Footer from '../../ui/footer/footer';
import Header from '../../ui/header/header';
import NavBar from '../../ui/navBar/navBar';
import LoginForm from '../../ui/logInForm/logInForm'
import styles from './login.module.css'

export default function Login() {

  return (
    <>
    <div className={styles.loginContainer}>
      <div>
        <Header/>
        <NavBar/>
      </div>
      <LoginForm/>
      <Footer/>
    </div>
    </>
  );
}  