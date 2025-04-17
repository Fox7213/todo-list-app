import React from 'react';
import style from './Input.module.css';

const Input = ({label, placeholder, iconSrc, value, onChange, type = 'text'}) => {

    return (
        <div className={style.inputContainer}>
            <label className={style.inputLabel}>{label}</label>
            <div className={style.inputWrapper}>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={style.inputField}
                />
                {iconSrc && (
                    <img src={iconSrc} alt="" className={style.inputIconImage}/>
                )}
            </div>
        </div>
    );
};

export default Input;