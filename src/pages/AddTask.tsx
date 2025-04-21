import { useState } from 'react';

import $api from "../../api/http";
import Input from "../components/Input/Input";

import style from "../styles/AddTask.module.scss";

import i1 from "../image/Inputs/i1.svg";
import i2 from "../image/Inputs/i2.svg";
import i3 from "../image/Inputs/i3.svg";

const AddTask = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const createNewTask = async () => {
        try {
            await $api.post("/api/tasks", {
                title: title,
                description: description,
            })
            alert("Successfully created task")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className={style.All}>

                <div className={style.DivAll}>
                    Create your task
                </div>

                <div className={style.form}>
                    <Input
                        label="Task Title"
                        placeholder="Task Title"
                        iconSrc={i1}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Input
                        label="End date"
                        placeholder="End date"
                        iconSrc={i2}
                    />
                    <Input
                        label="Priority level"
                        placeholder="Important"
                        iconSrc={i3}
                    />

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
                        <button onClick={createNewTask} className={style.button}>Add to list</button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default AddTask;