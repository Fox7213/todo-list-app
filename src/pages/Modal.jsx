import React, { useEffect, useRef } from 'react';
import style from "../styles/Modal.module.css";
import CustomButton from '../components/CustomButton.jsx/CustomButton';
import Input from "../components/Input/Input";

import i1 from "../image/Inputs/i1.svg";
import i2 from "../image/Inputs/i2.svg";
import i3 from "../image/Inputs/i3.svg";
import icCompl from "../image/Modal/icCompl.svg";
import icDel from "../image/Modal/icDel.svg";

const Modal = ({ onClose }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose(); 
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className={style.All}>
            <div className={style.form} ref={modalRef}>
                <Input label="Task Title" placeholder="Task Title" iconSrc={i1} />
                <Input label="Start date" placeholder="Start date" iconSrc={i2} />
                <Input label="End date" placeholder="End date" iconSrc={i2} />
                <Input label="Priority level" placeholder="Important" iconSrc={i3} />

                <div className={style.textareaContainer}>
                    <label className={style.textareaLabel}>Task description</label>
                    <textarea
                        className={style.textarea}
                        placeholder="Write important notes"
                    ></textarea>
                </div>

                <div className={style.buttonContainer}>
                    <button className={style.button}>Confirm edit</button>
                </div>
                <div className={style.buttonContainer2}>
                    <CustomButton 
                        style={{ background: "#006D77", color: "white", padding: "3% 10%" }} 
                        text="Mark as completed"
                        icon={icCompl}
                    />
                    <CustomButton 
                        text="Delete the task" 
                        style={{ padding: "3% 10%" }} 
                        icon={icDel}
                    />
                </div>
            </div>
        </div>
    );
};

export default Modal;