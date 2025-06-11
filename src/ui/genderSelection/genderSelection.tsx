import React from 'react';
import styles from './GenderSelection.module.css';
import hombre from '../../assets/hombre.jpg';
import mujer from '../../assets/mujer.jpg';
import niños from '../../assets/niños.jpg';
import CustomButton from '../customButton/customButton';
import { useNavigate } from 'react-router-dom';

interface GenderSelectionProps {
  isAdmin?: boolean;
}

const GenderSelection: React.FC<GenderSelectionProps> = ({ isAdmin }) => {
  const navigate = useNavigate();

  const handleModifyClick = (genero: string) => {
    navigate(`/admin/manage-products?genero=${genero}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img src={hombre} alt="Para hombre" className={styles.logo} />
        <div className={styles.customButtonWrapper}>
          <CustomButton
            text="Para Hombre"
            onClick={() => {
              if (!isAdmin) navigate('/catalog?genero=Hombre');
            }}
            className={`${isAdmin ? styles.whiteButton : ''} ${isAdmin ? styles.noPointer : ''}`}
          />
          {isAdmin && (
            <div className={styles.modifyButtonWrapper}>
              <CustomButton
                text="Modificar"
                onClick={() => handleModifyClick('Hombre')}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <img src={mujer} alt="Para mujer" className={styles.logo} />
        <div className={styles.customButtonWrapper}>
          <CustomButton
            text="Para Mujer"
            onClick={() => {
              if (!isAdmin) navigate('/catalog?genero=Mujer');
            }}
            className={`${isAdmin ? styles.whiteButton : ''} ${isAdmin ? styles.noPointer : ''}`}
          />
          {isAdmin && (
            <div className={styles.modifyButtonWrapper}>
              <CustomButton
                text="Modificar"
                onClick={() => handleModifyClick('Mujer')}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <img src={niños} alt="Para niños" className={styles.logo} />
        <div className={styles.customButtonWrapper}>
          <CustomButton
            text="Para Niño/a"
            onClick={() => {
              if (!isAdmin) navigate('/catalog?genero=Niño/a');
            }}
            className={`${isAdmin ? styles.whiteButton : ''} ${isAdmin ? styles.noPointer : ''}`}
          />
          {isAdmin && (
            <div className={styles.modifyButtonWrapper}>
              <CustomButton
                text="Modificar"
                onClick={() => handleModifyClick('Niño/a')}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenderSelection;
