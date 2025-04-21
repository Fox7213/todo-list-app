import { ChangeEvent } from 'react';
import style from './Input.module.scss';

interface InputProps {
  label: string;
  placeholder?: string;
  iconSrc?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const Input = ({label, placeholder, iconSrc, value, onChange, type = 'text'}: InputProps) => {

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