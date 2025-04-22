import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import { useStore } from "../../storage/StoreContext";
import { Task } from "../../storage/TaskStore";

import Card from "../../components/Card/Card";
import CustomButton from '../../components/CustomButton/CustomButton';

import style from "./Home.module.scss";

import Add from '../../image/Add.svg';

const RECENT_TASKS = 3;

const HomePage = observer(() => {
    const { taskStore } = useStore();
    const { 
        deleteTask,
        toggleTaskStatus,
        filteredTasks
    } = taskStore;

    // Filter by completion status after applying search filter
    const filteredRunningTasks = filteredTasks.filter(task => !task.completed);
    const filteredCompletedTasks = filteredTasks.filter(task => task.completed);

    // Get the most recent tasks
    const recentRunningTasks = filteredRunningTasks.slice(0, RECENT_TASKS);
    const recentCompletedTasks = filteredCompletedTasks.slice(0, RECENT_TASKS);

    const handleDeleteTask = async (id: number) => {
        await deleteTask(id);
    };

    const handleToggleStatus = async (id: number) => {
        await toggleTaskStatus(id);
    };

    return (
        <>
        <div className={style.homePage}>
            <div className={style.right}>
                <h1 className={style.h1}>Running Tasks</h1>
                
                <div className={style.cards}>
                    {recentRunningTasks.length > 0 ? (
                        recentRunningTasks.map((task: Task) => (
                            <Card 
                                key={task.id}
                                task={task}
                                deleteTask={handleDeleteTask}
                                onSetStatus={handleToggleStatus}
                            />
                        ))
                    ) : (
                        <div className={style.noTasks}>
                            {taskStore.searchQuery ? "No matching running tasks" : "No running tasks"}
                        </div>
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
                    {recentCompletedTasks.length > 0 ? (
                        recentCompletedTasks.map((task: Task) => (
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