import { useEffect, useRef, useState } from 'react';

import CustomButton from '../components/CustomButton/CustomButton';
import Input from "../components/Input/Input";
import $api from "../../api/http";

import style from "../styles/Modal.module.scss";

import i1 from "../image/Inputs/i1.svg";
import i2 from "../image/Inputs/i2.svg";
import i3 from "../image/Inputs/i3.svg";
import icCompl from "../image/Modal/icCompl.svg";
import icDel from "../image/Modal/icDel.svg";

interface ModalProps {
  onClose: () => void;
  description?: string;
  title?: string;
  id?: number;
}

const Modal = ({onClose, description, title, id}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const [titlee, setTitle] = useState(title);
    const [descriptionn, setDescription] = useState(description);

    const onEditTask = async (taskId?: number) => {
        if (!taskId) return;
        try {
            await $api.patch(`/api/tasks/${taskId}`, {
                title: titlee,
                description: descriptionn,
            })
            onClose()
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className={style.All}>
            <div className={style.form} ref={modalRef}>
                <Input value={titlee} onChange={(e) => setTitle((e.target.value))} label="Task Title"
                       placeholder="Task Title" iconSrc={i1}/>
                <Input label="Start date" placeholder="Start date" iconSrc={i2}/>
                <Input label="End date" placeholder="End date" iconSrc={i2}/>
                <Input label="Priority level" placeholder="Important" iconSrc={i3}/>

                <div className={style.textareaContainer}>
                    <label className={style.textareaLabel}>Task description</label>
                    <textarea
                        value={descriptionn}
                        onChange={(e) => setDescription((e.target.value))}
                        className={style.textarea}
                        placeholder="Write important notes"
                    ></textarea>
                </div>

                <div className={style.buttonContainer}>
                    <button className={style.button} onClick={() => onEditTask(id)}>Confirm edit</button>
                </div>
                <div className={style.buttonContainer2}>
                    <CustomButton
                        style={{background: "#006D77", color: "white", padding: "3% 10%"}}
                        text="Mark as completed"
                        icon={icCompl}
                    />
                    <CustomButton
                        text="Delete the task"
                        style={{padding: "3% 10%"}}
                        icon={icDel}
                    />
                </div>
            </div>
        </div>
    );
};

export default Modal;