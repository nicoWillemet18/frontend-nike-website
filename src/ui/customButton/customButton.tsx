import React from 'react';
import styles from './customButton.module.css';

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick }) => {
  return (
    <button className={styles.customButton} onClick={onClick}>
      {text}
    </button>
  );
};

export default CustomButton;