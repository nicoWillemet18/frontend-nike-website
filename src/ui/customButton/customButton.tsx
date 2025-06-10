import React from 'react';
import styles from './customButton.module.css';

interface CustomButtonProps {
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; 
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  icon,
  onClick,
  className,
  disabled,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`${styles.customButton} ${className || ''} ${disabled ? styles.disabledButton : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon ? icon : text}
    </button>
  );
};

export default CustomButton;
