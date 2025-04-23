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

    // State for active drag
    const [activeId, setActiveId] = useState<string | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    // Filter by completion status after applying search filter
    const filteredRunningTasks = filteredTasks.filter(task => !task.completed);
    const filteredCompletedTasks = filteredTasks.filter(task => task.completed);

    // Get the most recent tasks
    const recentRunningTasks = filteredRunningTasks.slice(0, RECENT_TASKS);
    const recentCompletedTasks = filteredCompletedTasks.slice(0, RECENT_TASKS);

    // Configure sensors for drag and drop
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10, // Minimum drag distance before activation
            },
        })
    );

    const handleDeleteTask = async (id: string) => {
        await deleteTask(id);
    };

    const handleToggleStatus = async (id: string) => {
        await toggleTaskStatus(id);
    };

    // Handle drag start
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id as string);
        
        // Find the task being dragged
        const task = filteredTasks.find(t => t.id === active.id);
        if (task) {
            setActiveTask(task);
        }
    };

    // Handle drag over
    const handleDragOver = (event: DragOverEvent) => {
        // Optional: Add visual feedback for valid drop targets
        console.log('Drag over:', event.over?.id, event.over);
    };

    // Handle drag end
    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        
        console.log('Drag end:', { active: active.id, over: over?.id });
        
        if (over) {
            // Check if dragged to a different container
            const isRunningContainer = over.id === 'running-tasks';
            const isCompletedContainer = over.id === 'completed-tasks';
            
            if ((isRunningContainer || isCompletedContainer) && activeId) {
                // Find the task
                const task = filteredTasks.find(t => t.id === activeId);
                
                if (task) {
                    // If dragged to a different status container, toggle the status
                    if ((isRunningContainer && task.completed) || 
                        (isCompletedContainer && !task.completed)) {
                        await toggleTaskStatus(activeId);
                    }
                }
            }
        }
        
        // Reset active state
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
            
            {/* Drag overlay for visual feedback */}
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