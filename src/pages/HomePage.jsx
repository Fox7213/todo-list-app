import React from 'react';
import Card from "../components/Card/Card"
import style from "../styles/Home.module.css";
import CustomButton from '../components/CustomButton.jsx/CustomButton';
import Add from '../image/Add.svg'

const HomePage = () => {
    return (
        <>
        <div className={style.homePage}>
            <div className={style.right}>
                <h1 className={style.h1}>Running Tasks</h1>
                
                <div className={style.cards}>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>

                <div className={style.buttonn}>
                    <CustomButton text="All running Tasks →" />
                </div>
            </div>

            <div className={style.line}></div>

            <div className={style.left}>
                <h1 className={style.h1}>Completed Tasks</h1>

                <div className={style.cards}>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>

                <div className={style.buttonn}>
                    <CustomButton text="All Completed Tasks →" />
                    <img src={Add} alt="" />
                </div>
            </div>
        </div>
        </>
    );
};  

export default HomePage;