import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import CardList from "../../components/CardList/CardList";
import CustomButton from '../../components/CustomButton/CustomButton';
import Input from "../../components/Input/Input";
import { useStore } from "../../storage/StoreContext";

import style from "./Completed.module.scss";

import iconSrc from "../../image/Header/iconSrc.svg";

//  Колво задач для отображения на странице
const ITEMS_PER_PAGE = 6;

const CompletedTasks = observer(() => {
    const { taskStore } = useStore();
    const { isLoading, deleteTask, toggleTaskStatus, setSearchQuery, searchQuery } = taskStore;
    
    // Обнулить фильтры при удалении компонента
    useEffect(() => {
        return () => {
            // функция очистки, когда компонент удаляется
            setSearchQuery('');
        };
    }, [setSearchQuery]);
    
    // вместо completedTasks исползовать filteredTasks и фильтруйте их для получения списка завершенных задачand 
    const filteredCompletedTasks = taskStore.filteredTasks.filter(task => task.completed);
    
    // состояние pagination
    const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        // Обнулить pagination при изменении поискового запроса 
        setVisibleItems(ITEMS_PER_PAGE);
    };
    
    // Получение только видимых задач, соответствующие текущей странице.
    const tasksToDisplay = filteredCompletedTasks.slice(0, visibleItems);
    
    // Проверка, есть ли еще элементы для загрузки
    const hasMoreItems = filteredCompletedTasks.length > visibleItems;
    
    // обработка клика more button 
    const handleLoadMore = () => {
        setVisibleItems(prev => prev + ITEMS_PER_PAGE);
    };

    return (
        <>
            <div className={style.All}>

            <div className={style.DivAll}>
                Completed Tasks
            </div>
            
            <div className={style.AllTop}>
                <div className={style.inputWrapper}>
                    <Input
                        label=""
                        placeholder="Search by name"
                        iconSrc={iconSrc}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <div className={style.Cards}>
                {isLoading && <p>Loading...</p>}
                {!isLoading && filteredCompletedTasks.length === 0 && (
                    <p>No completed tasks found</p>
                )}
                <CardList 
                    tasks={tasksToDisplay}
                    toggleTaskStatus={toggleTaskStatus}
                    deleteTask={deleteTask}
                />
            </div>

            {hasMoreItems && (
                <div className={style.buttonn}>
                    <CustomButton 
                        style={{fontWeight:"700"}} 
                        text="Load more" 
                        onClick={handleLoadMore}
                    />
                </div>
            )}

            </div>
        </>
    );
});  

export default CompletedTasks;