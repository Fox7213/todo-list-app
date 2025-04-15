import React from 'react';
import Card from "../components/Card/Card"
import style from "../styles/Completed.module.css";
import iconSrc from "../image/Header/iconSrc.svg";
import CustomButton from '../components/CustomButton.jsx/CustomButton';

const CompletedTasks = () => {
    return (
        <>
            <div className={style.All}>

            <div className={style.DivAll}>
                Completed Tasks
            </div>
            
            <div className={style.AllTop}>

                <div className={style.inputWrapper}>
                    <input
                        className={style.styledInput}
                        placeholder="Search by name"
                    />
                    <img src={iconSrc} alt="search" className={style.searchIcon} />
                </div>
            </div>

            <div className={style.Cards}>
                <Card/><Card/><Card/><Card/><Card/><Card/><Card/>
            </div>

            <div className={style.buttonn}>
                    <CustomButton style={{fontWeight:"700"}} text="Load more" />
                </div>

            </div>
        </>
    );
};  

export default CompletedTasks;