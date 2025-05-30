import Footer from '../../ui/footer/footer';
import Header from '../../ui/header/header';
import NavBar from '../../ui/navBar/navBar';
import SignUpForm from '../../ui/signUpForm/signUpForm';
import styles from './signUp.module.css'

export default function SignUp() {

  return (
    <>
    <div className={styles.signUpContainer}>
      <div>
        <Header/>
        <NavBar/>
      </div>
      <SignUpForm/>
      <Footer/>
    </div>
    </>
  );
}  