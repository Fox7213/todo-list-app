import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import Card from "../../components/Card/Card";
import CustomButton from '../../components/CustomButton/CustomButton';
import Input from "../../components/Input/Input";
import { useStore } from "../../storage/StoreContext";

import style from "./Completed.module.scss";

import iconSrc from "../../image/Header/iconSrc.svg";

// Number of tasks to display per page
const ITEMS_PER_PAGE = 6;

const CompletedTasks = observer(() => {
    const { taskStore } = useStore();
    const { isLoading, deleteTask, toggleTaskStatus, setSearchQuery, searchQuery } = taskStore;
    
    // Reset filters when component unmounts
    useEffect(() => {
        return () => {
            // This cleanup function runs when component unmounts
            setSearchQuery('');
        };
    }, [setSearchQuery]);
    
    // Use filteredTasks and filter for completed ones instead of completedTasks
    const filteredCompletedTasks = taskStore.filteredTasks.filter(task => task.completed);
    
    // State for pagination
    const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        // Reset pagination when search changes
        setVisibleItems(ITEMS_PER_PAGE);
    };
    
    // Get only the tasks that should be visible based on current pagination
    const tasksToDisplay = filteredCompletedTasks.slice(0, visibleItems);
    
    // Check if there are more items to load
    const hasMoreItems = filteredCompletedTasks.length > visibleItems;
    
    // Handle load more button click
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
                {tasksToDisplay.map(task => (
                    <Card 
                        key={task.id} 
                        task={task} 
                        deleteTask={deleteTask} 
                        onSetStatus={toggleTaskStatus}
                    />
                ))}
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