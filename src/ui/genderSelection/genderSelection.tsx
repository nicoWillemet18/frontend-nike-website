import React from 'react';
import styles from './GenderSelection.module.css';
import GenderImg from '../../assets/gender.jpg';
import CustomButton from '../customButton/customButton';

const GenderSelection: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img src={GenderImg} alt="Para hombre" className={styles.logo} />
        <div className={styles.customButtonWrapper}>
          <CustomButton text="Para hombre" onClick={() => console.log('Masculino seleccionado')} />
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <img src={GenderImg} alt="Para mujer" className={styles.logo} />
        <div className={styles.customButtonWrapper}>
          <CustomButton text="Para mujer" onClick={() => console.log('Femenino seleccionado')} />
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <img src={GenderImg} alt="Para niños" className={styles.logo} />
        <div className={styles.customButtonWrapper}>
          <CustomButton text="Para niños" onClick={() => console.log('Niños seleccionado')} />
        </div>
      </div>
    </div>
  );
};

export default GenderSelection;
