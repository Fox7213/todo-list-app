import { CSSProperties, MouseEvent } from 'react';

import styles from '../../styles/CustomButton.module.scss';

interface CustomButtonProps {
  style?: CSSProperties;
  text: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  icon?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const CustomButton = ({ 
  style, 
  text, 
  onClick, 
  icon, 
  iconPosition = 'left', 
  className = '' 
}: CustomButtonProps) => {
    return (
        <button style={style} className={`${styles.button} ${className}`} onClick={onClick}>
            {icon && iconPosition === 'left' && (
                <img src={icon} alt="icon" className={styles.icon} />
            )}
            <span>{text}</span>
            {icon && iconPosition === 'right' && (
                <img src={icon} alt="icon" className={styles.icon} />
            )}
        </button>
    );
};

export default CustomButton;