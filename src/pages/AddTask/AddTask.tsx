import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../storage/StoreContext';

import DatePicker from '../../components/DatePicker/DatePicker';
import PriorityDropdown from "../../components/Dropdown/PriorityDropdown";
import Input from "../../components/Input/Input";

import style from "./AddTask.module.scss";

import i1 from "../../image/Inputs/i1.svg";
import i2 from "../../image/Inputs/i2.svg";

const AddTask = observer(() => {
    const { taskStore } = useStore();
    const navigate = useNavigate();
    
    const [priority, setPriority] = useState("");
    const [date, setDate] = useState<Date | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const resetForm = () => {
        setPriority("");
        setDate(null);
        setTitle("");
        setDescription("");
    }

    const handleAddTask = async () => {
        try {
            await taskStore.addTask(title, description, parseInt(priority), date);
            alert("Successfully created task");
            resetForm();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className={style.All}>
                <div className={style.DivAll}>
                    Create your task
                </div>

                <div className={style.form}>

                    <div className={style.formRow}>
                        <Input
                            label="Task Title"
                            placeholder="Task Title"
                            iconSrc={i1}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className={style.formRow}>
                        <DatePicker
                            label="End date"
                            placeholder="End date"
                            iconSrc={i2}
                            selected={date}
                            onChange={setDate}
                            dateFormat="MMMM d, yyyy"
                        />
                    </div>

                    <div className={style.formRow}>
                        <PriorityDropdown 
                            value={priority} 
                            onChange={(value) => setPriority(value)} 
                        />
                    </div>

                    <div className={style.textareaContainer}>
                        <label className={style.textareaLabel}>Description</label>
                        <textarea
                            className={style.textarea}
                            placeholder="Write important notes"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className={style.buttonContainer}>
                        <button onClick={handleAddTask} className={style.button}>Add to list</button>
                    </div>
                </div>

            </div>
        </>
    );
});

export default AddTask;