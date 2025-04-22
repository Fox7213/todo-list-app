import { useState } from 'react';

import { Task } from '../../storage/TaskStore';
import Modal from '../Modal/Modal';

import style from "./Card.module.scss";

import i1 from "../../image/Card/1.svg";
import i2 from "../../image/Card/2.svg";
import i3 from "../../image/Card/3.svg";
import checkCircle from "../../image/Card/checkCircle.svg";
import mark from "../../image/Card/mark.svg";

interface CardProps {
  task: Task;
  deleteTask: (id: number) => Promise<void>;
  onSetStatus: (id: number) => Promise<void>;
}

const Card = ({task, deleteTask, onSetStatus}: CardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {title, completed, id} = task;

    const onCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <div className={style.card}>
                <div className={style.right}>
                    <h1 className={style.Name}>{title}</h1>
                    <p className={style.date}>Start date: <span>07-07-2023</span></p>
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