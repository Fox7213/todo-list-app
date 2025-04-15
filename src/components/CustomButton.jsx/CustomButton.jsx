import React from 'react';
import styles from '../../styles/CustomButton.module.css';

const CustomButton = ({ style, text, onClick, icon, iconPosition = 'left', className = '' }) => {
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