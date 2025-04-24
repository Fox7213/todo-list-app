import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    MouseSensor,
    pointerWithin,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Task } from "../../models/Task";
import { useStore } from "../../storage/StoreContext";

import Card from "../../components/Card/Card";
import CustomButton from '../../components/CustomButton/CustomButton';
import DroppableCardList from '../../components/CardList/DroppableCardList';

import style from "./Home.module.scss";

import Add from '../../image/Add.svg';

const RECENT_TASKS = 6;

const HomePage = observer(() => {
    const { taskStore } = useStore();
    const { 
        deleteTask,
        toggleTaskStatus,
        filteredTasks
    } = taskStore;

    // перетаскивание
    const [activeId, setActiveId] = useState<string | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    // Фильтрация по статусу завершения 
    const filteredRunningTasks = filteredTasks.filter(task => !task.completed);
    const filteredCompletedTasks = filteredTasks.filter(task => task.completed);

    // получение послед задач
    const recentRunningTasks = filteredRunningTasks.slice(0, RECENT_TASKS);
    const recentCompletedTasks = filteredCompletedTasks.slice(0, RECENT_TASKS);

    // Настройка датчиков перетаскивания
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10, // Мин расстояние перетаскивания 
            },
        })
    );

    const handleDeleteTask = async (id: string) => {
        await deleteTask(id);
    };

    const handleToggleStatus = async (id: string) => {
        await toggleTaskStatus(id);
    };

    // начало перетаскивания
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id as string);
        
        // поиск задачи, которая перетаскивается
        const task = filteredTasks.find(t => t.id === active.id);
        if (task) {
            setActiveTask(task);
        }
    };

    // Обрабатывайте перетаскивание над
    const handleDragOver = (event: DragOverEvent) => {
        //  визуальная подсказка
        console.log('Drag over:', event.over?.id, event.over);
    };

    // завершение перетаскивания
    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        
        console.log('Drag end:', { active: active.id, over: over?.id });
        
        if (over) {
            // проверка перетаскивания
            const isRunningContainer = over.id === 'running-tasks';
            const isCompletedContainer = over.id === 'completed-tasks';
            
            if ((isRunningContainer || isCompletedContainer) && activeId) {
                // Найти задачу
                const task = filteredTasks.find(t => t.id === activeId);
                
                if (task) {
                    // при перетаскивание изм статус
                    if ((isRunningContainer && task.completed) || 
                        (isCompletedContainer && !task.completed)) {
                        await toggleTaskStatus(activeId);
                    }
                }
            }
        }
        
        // Сбросить активное состояние
        setActiveId(null);
        setActiveTask(null);
    };

    return (
        <DndContext
            collisionDetection={pointerWithin}
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className={style.homePage}>
                <div className={style.right}>
                    <h1 className={style.h1}>Running Tasks</h1>
                    
                    <DroppableCardList
                        id="running-tasks"
                        tasks={recentRunningTasks}
                        handleDeleteTask={handleDeleteTask}
                        handleToggleStatus={handleToggleStatus}
                    />

                    <div className={style.button}>
                        <Link to="/alltasks?status=inProgress">
                            <CustomButton text="All running Tasks →" />
                        </Link>
                    </div>
                </div>

                <div className={style.line}></div>

                <div className={style.left}>
                    <h1 className={style.h1}>Completed Tasks</h1>

                    <DroppableCardList
                        id="completed-tasks"
                        tasks={recentCompletedTasks}
                        handleDeleteTask={handleDeleteTask}
                        handleToggleStatus={handleToggleStatus}
                    />

                    <div className={style.button}>
                        <Link to="/completedtasks">
                            <CustomButton text="All Completed Tasks →" />
                        </Link>
                        {/* <Link to="/addTask">
                            <img src={Add} alt="" />
                        </Link> */}
                    </div>
                </div>
            </div>
            
            {/* Визуальное наложение при перетаскивании. */}
            <DragOverlay>
                {activeTask && (
                    <Card 
                        task={activeTask}
                        deleteTask={handleDeleteTask}
                        onSetStatus={handleToggleStatus}
                    />
                )}
            </DragOverlay>
        </DndContext>
    );
});  

export default HomePage;