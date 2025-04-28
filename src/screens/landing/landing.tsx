import Footer from "../../ui/footer/footer";
import Header from "../../ui/header/header";
import HeroImage from "../../ui/heroImage/heroImage";
import NavBar from "../../ui/navBar/navBar";
import styles from "./landing.module.css";
import heroImg from '../../assets/heroImg1.jpg';
import ProductShowcase from "../../ui/productShowcase/productShowcase";
import ProductSlice from "../../ui/productSilder/productSlice";
import GenderSelection from "../../ui/genderSelection/genderSelection";

export default function Landing() {
    return (
      <>
      <div className={styles.landingContainer}>
        <Header />
        <NavBar />

        <div className={styles.section}>
          <HeroImage 
            imageSrc={heroImg} 
            title="CLÁSICOS INFALTABLES"
            subtitle="Disfruta del confort y el rendimiento que te acompañan en cada paso, con la calidad que solo una leyenda como Nike puede ofrecer."
            buttonText="Ver Colección"
            buttonOnClick={() => console.log("¡Botón de 'Ver más' presionado!")}
          />
        </div>

        <div className={styles.section}>
          <h2 className={styles.heroTitle}>Destacados</h2>
          <ProductShowcase />
        </div>

        <div className={styles.section}>
          <h2 className={styles.heroTitle}>Presentado</h2>
          <HeroImage 
            imageSrc={heroImg} 
            title="EMPEZAR LO QUE SE SIENTE BIEN"
            subtitle="Porque todo el mundo debería saber la sensación de correr con ese par perfecto."
            buttonText="Encuentra tus zapatillas"
            buttonOnClick={() => console.log("¡Botón de 'Ver más' presionado!")}
          />
        </div>

        <div className={styles.section}>
          <h2 className={styles.heroTitle}>En tendencia</h2>
          <ProductSlice/>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heroTitle}>Descubrí lo nuevo</h2>
          <HeroImage 
            imageSrc={heroImg} 
            title="IMPRESCINDIBLES PARA EL VUELO"
            subtitle="Tus prendas duraderas para usar durante toda la semana, pero con el estilo que solo Jordan Brand puede ofrecerte."
            buttonText="Comprar"
            buttonOnClick={() => console.log("¡Botón de 'Ver más' presionado!")}
          />
        </div>

        <div className={styles.section}>
          <h2 className={styles.heroTitle}>Lo escencial</h2>
          <GenderSelection />
        </div>

        <Footer />
      </div>
      </>
    );
}
