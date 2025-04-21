import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Card from "../../components/Card/Card";
import CustomButton from '../../components/CustomButton/CustomButton';
import Add from '../../image/Add.svg';
import { useStore } from "../../storage/StoreContext";
import { Task } from "../../storage/TaskStore";
import style from "./Home.module.scss";

const HomePage = observer(() => {
    const { taskStore } = useStore();
    const { tasks, isLoading, error, fetchTasks, deleteTask, toggleTaskStatus } = taskStore;

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const runningTasks = tasks.filter((task: Task) => !task.completed);
    const completedTasks = tasks.filter((task: Task) => task.completed);

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
                                id={task.id}
                                title={task.title}
                                description={task.description}
                                completed={task.completed}
                                deleteTask={handleDeleteTask}
                                fetchData={fetchTasks}
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
                                id={task.id}
                                title={task.title}
                                description={task.description}
                                completed={task.completed}
                                deleteTask={handleDeleteTask}
                                fetchData={fetchTasks}
                                onSetStatus={handleToggleStatus}
                            />
                        ))
                    ) : (
                        <div className={style.noTasks}>No completed tasks</div>
                    )}
                </div>

                <div className={style.button}>
                    <CustomButton text="All Completed Tasks →" />
                    <img src={Add} alt="" />
                </div>
            </div>
        </div>
        </>
    );
});  

export default HomePage;