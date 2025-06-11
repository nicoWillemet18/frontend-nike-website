import React from 'react';
import CustomButton from '../customButton/customButton'; 
import styles from './heroImage.module.css';

interface HeroImageProps {
  imageSrc: string;     
  title: string;       
  subtitle: string;   
  buttonText: string;  
  buttonOnClick?: () => void; 
}

const HeroImage: React.FC<HeroImageProps> = ({ imageSrc, title, subtitle, buttonText, buttonOnClick }) => {
  return (
    <section className={styles.hero}>
      <img src={imageSrc} alt="Hero Img" className={styles.heroImage} />
      <h1 className={styles.title}>{title}</h1>
      <h4 className={styles.subtitle}>{subtitle}</h4>
      <CustomButton text={buttonText} onClick={buttonOnClick || (() => console.log('Botón presionado'))} />
    </section>
  );
};

export default HeroImage;

