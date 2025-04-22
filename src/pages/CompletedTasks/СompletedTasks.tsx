import { observer } from "mobx-react-lite";

import { useStore } from "../../storage/StoreContext";
import Card from "../../components/Card/Card";
import CustomButton from '../../components/CustomButton/CustomButton';

import style from "./Completed.module.scss";

import iconSrc from "../../image/Header/iconSrc.svg";


const CompletedTasks = observer(() => {
    const { taskStore } = useStore();
    const { completedTasks, isLoading, deleteTask, toggleTaskStatus } = taskStore;

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
                {isLoading && <p>Loading...</p> }
                {completedTasks.map(task => (
                    <Card 
                        key={task.id} 
                        task={task} 
                        deleteTask={deleteTask} 
                        onSetStatus={toggleTaskStatus}
                    />
                ))}
            </div>

            <div className={style.buttonn}>
                    <CustomButton style={{fontWeight:"700"}} text="Load more" />
                </div>

            </div>
        </>
    );
});  

export default CompletedTasks;