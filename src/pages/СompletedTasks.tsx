import Card from "../components/Card/Card";
import CustomButton from '../components/CustomButton/CustomButton';

import style from "../styles/Completed.module.scss";

import iconSrc from "../image/Header/iconSrc.svg";

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
                <Card id={1} deleteTask={() => Promise.resolve()} fetchData={() => Promise.resolve()} onSetStatus={() => Promise.resolve()}/>
                <Card id={1} deleteTask={() => Promise.resolve()} fetchData={() => Promise.resolve()} onSetStatus={() => Promise.resolve()}/>
                <Card id={1} deleteTask={() => Promise.resolve()} fetchData={() => Promise.resolve()} onSetStatus={() => Promise.resolve()}/>
                <Card id={1} deleteTask={() => Promise.resolve()} fetchData={() => Promise.resolve()} onSetStatus={() => Promise.resolve()}/>
                <Card id={1} deleteTask={() => Promise.resolve()} fetchData={() => Promise.resolve()} onSetStatus={() => Promise.resolve()}/>
                <Card id={1} deleteTask={() => Promise.resolve()} fetchData={() => Promise.resolve()} onSetStatus={() => Promise.resolve()}/>
                <Card id={1} deleteTask={() => Promise.resolve()} fetchData={() => Promise.resolve()} onSetStatus={() => Promise.resolve()}/>
            </div>

            <div className={style.buttonn}>
                    <CustomButton style={{fontWeight:"700"}} text="Load more" />
                </div>

            </div>
        </>
    );
};  

export default CompletedTasks;