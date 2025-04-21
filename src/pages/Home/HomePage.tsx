import Card from "../../components/Card/Card";
import CustomButton from '../../components/CustomButton/CustomButton';

import style from "./Home.module.scss";

import Add from '../../image/Add.svg';

const HomePage = () => {
    return (
        <>
        <div className={style.homePage}>
            <div className={style.right}>
                <h1 className={style.h1}>Running Tasks</h1>
                
                <div className={style.cards}>
                    <Card id={1} deleteTask={() => Promise.resolve()} fetchData={() => Promise.resolve()} onSetStatus={() => Promise.resolve()}/>
                    <Card id={1} deleteTask={() => Promise.resolve()} fetchData={() => Promise.resolve()} onSetStatus={() => Promise.resolve()}/>
                    <Card id={1} deleteTask={() => Promise.resolve()} fetchData={() => Promise.resolve()} onSetStatus={() => Promise.resolve()}/>
                    <Card id={1} deleteTask={() => Promise.resolve()} fetchData={() => Promise.resolve()} onSetStatus={() => Promise.resolve()}/>
                </div>

                <div className={style.button}>
                    <CustomButton text="All running Tasks →" />
                </div>
            </div>

            <div className={style.line}></div>

            <div className={style.left}>
                <h1 className={style.h1}>Completed Tasks</h1>

                <div className={style.cards}>
                    <Card id={1} deleteTask={() => Promise.resolve()} fetchData={() => Promise.resolve()} onSetStatus={() => Promise.resolve()}/>
                    <Card id={1} deleteTask={() => Promise.resolve()} fetchData={() => Promise.resolve()} onSetStatus={() => Promise.resolve()}/>
                    <Card id={1} deleteTask={() => Promise.resolve()} fetchData={() => Promise.resolve()} onSetStatus={() => Promise.resolve()}/>
                </div>

                <div className={style.button}>
                    <CustomButton text="All Completed Tasks →" />
                    <img src={Add} alt="" />
                </div>
            </div>
        </div>
        </>
    );
};  

export default HomePage;