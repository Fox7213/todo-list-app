import React, {useEffect, useState} from 'react';
import style from '../styles/Alltasks.module.css';
import iconSrc from "../image/Header/iconSrc.svg";
import Card from "../components/Card/Card"
import CustomButton from '../components/CustomButton.jsx/CustomButton';
import $api from "../../api/http.js";

const AllTasks = () => {
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await $api.get("/api/tasks");
            setData(res.data)
            setIsLoading(false);
        } catch {
            setIsLoading(false);
        }
    }

    const deleteTask = async (id) => {
        try {
            await $api.delete(`api/tasks/${id}`)
            alert("deleted task")
            fetchData()
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (isLoading) return <h1>Loading...</h1>
    return (
        <>
            <div className={style.All}>

                <div className={style.DivAll}>
                    All Tasks
                </div>
                <div className={style.AllTop}>

                    <div className={style.AllRight}>
                        <select
                            className={`${style.select} ${option1 ? style.activeSelect : ''}`}
                            value={option1}
                            onChange={(e) => setOption1(e.target.value)}
                        >
                            <option value="">By Category</option>
                            <option value="ByCategory">By Category</option>
                            <option value="ByCategory">By Category</option>
                            <option value="ByCategory">By Category</option>
                        </select>

                        <select
                            className={`${style.select} ${option2 ? style.activeSelect : ''}`}
                            value={option2}
                            onChange={(e) => setOption2(e.target.value)}
                        >
                            <option value="">By Status</option>
                            <option value="ByStatus">By Status</option>
                            <option value="ByStatus">By Status</option>
                            <option value="ByStatus">By Status</option>
                        </select>
                    </div>

                    <div className={style.inputWrapper}>
                        <input
                            className={style.styledInput}
                            placeholder="Search by name"
                        />
                        <img src={iconSrc} alt="search" className={style.searchIcon}/>
                    </div>

                </div>

                <div className={style.Cards}>
                    {
                        data?.map((task) => <Card deleteTask={deleteTask} title={task.title} id={task.id}
                                                  description={task.description}
                                                  key={task.id}/>)
                    }
                </div>

                <div className={style.buttonn}>
                    <CustomButton style={{fontWeight: "700"}} text="Load more"/>
                </div>

            </div>
        </>
    );
};

export default AllTasks;