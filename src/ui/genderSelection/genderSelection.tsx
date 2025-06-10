import React from 'react';
import styles from './GenderSelection.module.css';
import hombre from '../../assets/hombre.jpg'
import mujer from '../../assets/mujer.jpg'
import niños from '../../assets/niños.jpg'
import CustomButton from '../customButton/customButton';
import { useNavigate } from 'react-router-dom';

interface GenderSelectionProps {
  isAdmin?: boolean;
}

const GenderSelection: React.FC<GenderSelectionProps> = ({ isAdmin }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img src={hombre} alt="Para hombre" className={styles.logo} />
        <div className={styles.customButtonWrapper}>
          <CustomButton text="Para hombre" onClick={() => navigate('/catalog?genero=Hombre')} className={isAdmin ? styles.whiteButton : ''} />
          {isAdmin && (
            <div className={styles.modifyButtonWrapper}>
              <CustomButton text="Modificar" onClick={() => console.log('Modificar género hombre')} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <img src={mujer} alt="Para mujer" className={styles.logo} />
        <div className={styles.customButtonWrapper}>
          <CustomButton text="Para mujer" onClick={() => navigate('/catalog?genero=Mujer')} className={isAdmin ? styles.whiteButton : ''} />
          {isAdmin && (
            <div className={styles.modifyButtonWrapper}>
              <CustomButton text="Modificar" onClick={() => console.log('Modificar género mujer')} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <img src={niños} alt="Para niños" className={styles.logo} />
        <div className={styles.customButtonWrapper}>
          <CustomButton text="Para niños" onClick={() => navigate('/catalog?genero=Niño/a')} className={isAdmin ? styles.whiteButton : ''} />
          {isAdmin && (
            <div className={styles.modifyButtonWrapper}>
              <CustomButton text="Modificar" onClick={() => console.log('Modificar género niños')} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenderSelection;
