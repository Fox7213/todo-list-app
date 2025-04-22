import { useRef, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import { Task } from '../../storage/TaskStore';
import CustomButton from '../CustomButton/CustomButton';
import DatePicker from '../DatePicker/DatePicker';
import PriorityDropdown from '../Dropdown/PriorityDropdown';
import Input from "../Input/Input";

import { useStore } from '../../storage/StoreContext';

import style from "./Modal.module.scss";

import mark from "../../image/Card/mark.svg";
import i1 from "../../image/Inputs/i1.svg";
import i2 from "../../image/Inputs/i2.svg";
import icCompl from "../../image/Modal/icCompl.svg";
import icDel from "../../image/Modal/icDel.svg";

interface ModalProps {
  task: Task;
  onClose: () => void;
  onDelete: (id: number) => void;
}

const Modal = ({onClose, onDelete, task}: ModalProps) => {
    const { taskStore } = useStore();

    const modalRef = useRef<HTMLDivElement>(null);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.order);
    const [createdAt, setCreatedAt] = useState(task.createdAt);
    const [dueDate, setDueDate] = useState(task.dueDate);

    // Use the custom hook for handling outside clicks
    useOutsideClick(modalRef, onClose);

    const onEditTask = async (taskId?: number) => {
        if (!taskId) return;
        try {
            await taskStore.editTask(taskId, title, description, priority, createdAt, dueDate);
            onClose();
        } catch (e) {
            console.log(e);
        }
    }

    const onMarkAsCompleted = async (taskId?: number) => {
        if (!taskId) return;
        try {
            await taskStore.toggleTaskStatus(taskId);
            onClose();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={style.All}>
            <div className={style.form} ref={modalRef}>
                <Input 
                    value={title} 
                    onChange={(e) => setTitle((e.target.value))} 
                    label="Task Title"
                    placeholder="Task Title" 
                    iconSrc={i1}
                />
                <DatePicker
                    label="Start date"
                    placeholder="Select start date"
                    iconSrc={i2}
                    selected={createdAt ? new Date(createdAt) : null}
                    onChange={(date) => setCreatedAt(date || new Date())}
                />
                <DatePicker
                    label="End date"
                    placeholder="Select end date"
                    iconSrc={i2}
                    selected={dueDate ? new Date(dueDate) : null}
                    onChange={(date) => setDueDate(date || undefined)}
                />
                <PriorityDropdown 
                    value={priority.toString()}
                    onChange={(value) => setPriority(parseInt(value))}
                />

                <div className={style.textareaContainer}>
                    <label className={style.textareaLabel}>Task description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription((e.target.value))}
                        className={style.textarea}
                        placeholder="Write important notes"
                    ></textarea>
                </div>

                <div className={style.buttonContainer}>
                    <button className={style.button} onClick={() => onEditTask(task.id)}>Confirm edit</button>
                </div>
                <div className={style.buttonContainer2}>
                    <CustomButton
                        style={{background: "#006D77", color: "white", padding: "3% 10%"}}
                        text={task.completed === true ? "Turn in progress" : "Mark as completed"}
                        icon={task.completed === true ? mark : icCompl}
                        onClick={() => onMarkAsCompleted(task.id)}
                    />
                    <CustomButton
                        text="Delete the task"
                        style={{padding: "3% 10%"}}
                        icon={icDel}
                        onClick={() => onDelete(task.id)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Modal;