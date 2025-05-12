import React from 'react';
import styles from './GenderSelection.module.css';
import GenderImg from '../../assets/gender.jpg';
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
        <img src={GenderImg} alt="Para hombre" className={styles.logo} />
        <div className={styles.customButtonWrapper}>
          <CustomButton text="Para hombre" onClick={() => navigate('/catalog')} className={isAdmin ? styles.whiteButton : ''}/>
          {isAdmin && (
            <div className={styles.modifyButtonWrapper}>
              <CustomButton text="Modificar" onClick={() => console.log('Modificar género hombre')} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <img src={GenderImg} alt="Para mujer" className={styles.logo} />
        <div className={styles.customButtonWrapper}>
          <CustomButton text="Para mujer" onClick={() => navigate('/catalog')} className={isAdmin ? styles.whiteButton : ''}/>
          {isAdmin && (
            <div className={styles.modifyButtonWrapper}>
              <CustomButton text="Modificar" onClick={() => console.log('Modificar género hombre')} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <img src={GenderImg} alt="Para niños" className={styles.logo} />
        <div className={styles.customButtonWrapper}>
          <CustomButton text="Para niños" onClick={() => navigate('/catalog')} className={isAdmin ? styles.whiteButton : ''} />
          {isAdmin && (
            <div className={styles.modifyButtonWrapper}>
              <CustomButton text="Modificar" onClick={() => console.log('Modificar género hombre')} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenderSelection;
