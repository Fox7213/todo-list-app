import { useState } from 'react';
import Modal from '../../pages/Modal';

import style from "../../styles/Card.module.scss";

import i1 from "../../image/Card/1.svg";
import i2 from "../../image/Card/2.svg";
import i3 from "../../image/Card/3.svg";

interface CardProps {
  title?: string;
  description?: string;
  id: number;
  deleteTask: (id: number) => Promise<void>;
  fetchData: () => Promise<void>;
  status?: boolean;
  onSetStatus: (id: number) => Promise<void>;
}

const Card = ({title, description, id, deleteTask, fetchData, status, onSetStatus}: CardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onCloseModal = () => {
        setIsModalOpen(false);
        fetchData()
    }

    return (
        <>
            <div className={style.card}>
                <div className={style.right}>
                    <h1 className={style.Name}>{title}</h1>
                    <p className={style.date}>Start date: <span>07-07-2023</span></p>
                    <div className={style.stateTask} onClick={() => onSetStatus(id)}>
                        {/*<img className={style.mark} src={mark} alt=""/>*/}
                        {
                            status ? <h1>Done</h1> : <h1>In progress</h1>
                        }
                    </div>
                    <p>{description}</p>
                </div>

                <div className={style.left}>
                    <img src={i1} alt=""/>
                    <img src={i2} alt="" onClick={() => setIsModalOpen(true)} style={{cursor: 'pointer'}}/>
                    <img style={{cursor: "pointer"}} onClick={() => deleteTask(id)} src={i3} alt=""/>
                </div>
            </div>

            {isModalOpen &&
                <Modal title={title} id={id} description={description} onClose={() => onCloseModal()}/>}
        </>
    );
};

export default Card;