import React from 'react';
import Card from "../components/Card/Card"
import style from "../styles/AddTask.module.css";
import iconSrc from "../image/Header/iconSrc.svg";
import CustomButton from '../components/CustomButton.jsx/CustomButton';
import Input from "../components/Input/Input"

import i1 from "../image/Inputs/i1.svg"
import i2 from "../image/Inputs/i2.svg"
import i3 from "../image/Inputs/i3.svg"

const AddTask = () => {
    return (
        <>
            <div className={style.All}>

                <div className={style.DivAll}>
                    Create your task
                </div>

                <div className={style.form}>
                    <Input
                        label="Task Title"
                        placeholder="Task Title"
                        iconSrc={i1}
                    />

                    <Input
                        label="End date"
                        placeholder="End date"
                        iconSrc={i2}
                    />
                    <Input
                        label="Priority level"
                        placeholder="Important"
                        iconSrc={i3}
                    />

                    <div className={style.textareaContainer}>
                        <label className={style.textareaLabel}>Description</label>
                        <textarea
                            className={style.textarea}
                            placeholder="Write important notes"
                        ></textarea>
                    </div>

                    <div className={style.buttonContainer}>
                        <button className={style.button}>Add to list</button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default AddTask;