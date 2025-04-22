import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import { useStore } from "../../storage/StoreContext";
import { Task } from "../../storage/TaskStore";

import Card from "../../components/Card/Card";
import CustomButton from '../../components/CustomButton/CustomButton';

import style from "./Home.module.scss";

import Add from '../../image/Add.svg';

const HomePage = observer(() => {
    const { taskStore } = useStore();
    const { tasks, isLoading, error, deleteTask, toggleTaskStatus, runningTasks, completedTasks } = taskStore;

    const handleDeleteTask = async (id: number) => {
        await deleteTask(id);
    };

    const handleToggleStatus = async (id: number) => {
        await toggleTaskStatus(id);
    };

    if (isLoading && tasks.length === 0) {
        return <div className={style.loading}>Loading tasks...</div>;
    }

    if (error) {
        return <div className={style.error}>{error}</div>;
    }

    return (
        <>
        <div className={style.homePage}>
            <div className={style.right}>
                <h1 className={style.h1}>Running Tasks</h1>
                
                <div className={style.cards}>
                    {runningTasks.length > 0 ? (
                        runningTasks.map((task: Task) => (
                            <Card 
                                key={task.id}
                                task={task}
                                deleteTask={handleDeleteTask}
                                onSetStatus={handleToggleStatus}
                            />
                        ))
                    ) : (
                        <div className={style.noTasks}>No running tasks</div>
                    )}
                </div>

                <div className={style.button}>
                    <CustomButton text="All running Tasks →" />
                </div>
            </div>

            <div className={style.line}></div>

            <div className={style.left}>
                <h1 className={style.h1}>Completed Tasks</h1>

                <div className={style.cards}>
                    {completedTasks.length > 0 ? (
                        completedTasks.map((task: Task) => (
                            <Card 
                                key={task.id}
                                task={task}
                                deleteTask={handleDeleteTask}
                                onSetStatus={handleToggleStatus}
                            />
                        ))
                    ) : (
                        <div className={style.noTasks}>No completed tasks</div>
                    )}
                </div>

                <div className={style.button}>
                    <Link to="/completedtasks">
                        <CustomButton text="All Completed Tasks →" />
                    </Link>
                    <Link to="/addTask">
                        <img src={Add} alt="" />
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
});  

export default HomePage;