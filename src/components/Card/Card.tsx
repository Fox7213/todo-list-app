import { useState } from 'react';

import { Priority, Task } from '../../models/Task';

import i1 from "../../image/Card/1.svg";
import i2 from "../../image/Card/2.svg";
import i3 from "../../image/Card/3.svg";
import checkCircle from "../../image/Card/checkCircle.svg";
import mark from "../../image/Card/mark.svg";
import Modal from '../Modal/Modal';
import style from "./Card.module.scss";

interface CardProps {
  task: Task;
  deleteTask: (id: string) => Promise<void>;
  onSetStatus: (id: string) => Promise<void>;
}

// Priority color mapping using the Priority enum
const priorityColors: Record<number, string> = {
  [Priority.HIGH]: '#E63946',   // High - Red
  [Priority.MEDIUM]: '#F4A261', // Medium - Orange
  [Priority.LOW]: '#2A9D8F',    // Low - Green
};

// Default color when priority is not set
const DEFAULT_COLOR = '#83C5BE';

const Card = ({task, deleteTask, onSetStatus}: CardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {title, completed, id, order} = task;

    const onCloseModal = () => {
        setIsModalOpen(false);
    }

    // Get priority color based on task priority
    const getPriorityColor = () => {
        if (order === undefined) return DEFAULT_COLOR;
        return priorityColors[order] || DEFAULT_COLOR;
    };

    return (
        <>
            <div className={style.card}>
                <div className={style.right}>
                    <div className={style.titleContainer}>
                        <div 
                            className={style.priorityIndicator} 
                            style={{ backgroundColor: getPriorityColor() }}
                        />
                        <h1 className={style.Name}>{title}</h1>
                    </div>
                    <p className={style.date}>Start date: <span>{new Date(task.createdAt).toLocaleDateString()}</span></p>
                    <div className={style.stateTask} onClick={() => onSetStatus(id)}>
                        {
                            completed ? <><img className={style.mark} src={checkCircle} alt=""/> <span>completed</span></> : <><img className={style.mark} src={mark} alt=""/> <span>Mark as completed</span></>
                        }
                    </div>
                </div>

                <div className={style.left}>
                    <img src={i1} alt=""/>
                    <img src={i2} alt="" onClick={() => setIsModalOpen(true)} style={{cursor: 'pointer'}}/>
                    <img style={{cursor: "pointer"}} onClick={() => deleteTask(id)} src={i3} alt=""/>
                </div>
            </div>

            {
                isModalOpen &&
                    <Modal
                        task={task}
                        onClose={() => onCloseModal()}
                        onDelete={() => deleteTask(id)}
                    />
            }
        </>
    );
};

export default Card;