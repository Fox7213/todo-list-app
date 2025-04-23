import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useStore } from '../../storage/StoreContext';

import Card from "../../components/Card/Card";
import CustomButton from '../../components/CustomButton/CustomButton';
import Dropdown from "../../components/Dropdown/Dropdown";
import PriorityDropdown from "../../components/Dropdown/PriorityDropdown";
import Input from "../../components/Input/Input";

import style from "./Alltasks.module.scss";

import iconSrc from "../../image/Header/iconSrc.svg";
import i3 from '../../image/Inputs/i3.svg';

// Number of tasks to display per page
const ITEMS_PER_PAGE = 6;

const AllTasks = observer(() => {
    const { taskStore } = useStore();
    const { 
        isLoading, 
        deleteTask, 
        toggleTaskStatus, 
        setSearchQuery, 
        searchQuery,
        setStatusFilter,
        statusFilter,
        setOrderFilter,
        orderFilter,
    } = taskStore;
    
    const location = useLocation();
    const [searchParams] = useSearchParams();
    
    // State to track the selected status in the dropdown
    const [selectedStatus, setSelectedStatus] = useState('');
    
    // Set initial status filter based on URL parameter
    useEffect(() => {
        const statusParam = searchParams.get('status');
        if (statusParam) {
            setStatusFilter(statusParam as 'all' | 'completed' | 'inProgress');
            
            // Update the dropdown value to match the filter
            if (statusParam === 'inProgress') {
                setSelectedStatus('In Progress');
            } else if (statusParam === 'completed') {
                setSelectedStatus('Completed');
            } else {
                setSelectedStatus('');
            }
        }
    }, [searchParams, setStatusFilter]);
    
    // Reset filters when component unmounts or when location changes
    useEffect(() => {
        return () => {
            // This cleanup function runs when component unmounts
            setSearchQuery('');
            setStatusFilter('all');
            setOrderFilter('');
        };
    }, [setSearchQuery, setStatusFilter, setOrderFilter]);
    
    // Use filteredTasks instead of tasks to get search results
    const filteredTasks = taskStore.filteredTasks;
    
    // State for pagination
    const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        // Reset pagination when search changes
        setVisibleItems(ITEMS_PER_PAGE);
    };
    
    const handleStatusChange = (value: string) => {
        setSelectedStatus(value);
        
        if (value === 'Completed') {
            setStatusFilter('completed');
        } else if (value === 'In Progress') {
            setStatusFilter('inProgress');
        } else {
            setStatusFilter('all');
        }
        // Reset pagination when filter changes
        setVisibleItems(ITEMS_PER_PAGE);
    };
    
    const handlePriorityChange = (value: string) => {
        setOrderFilter(value);
        // Reset pagination when filter changes
        setVisibleItems(ITEMS_PER_PAGE);
    };
    
    // Get only the tasks that should be visible based on current pagination
    const tasksToDisplay = filteredTasks.slice(0, visibleItems);
    
    // Check if there are more items to load
    const hasMoreItems = filteredTasks.length > visibleItems;
    
    // Handle load more button click
    const handleLoadMore = () => {
        setVisibleItems(prev => prev + ITEMS_PER_PAGE);
    };

    // Status filter options
    const statusOptions = [
        { value: '', label: 'All Statuses' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Completed', label: 'Completed' }
    ];

    return (
        <>
            <div className={style.All}>

                <div className={style.DivAll}>
                    All Tasks
                </div>
                <div className={style.AllTop}>

                    <div className={style.AllRight}>
                        <div className={style.dropdownWrapper}>
                            <PriorityDropdown 
                                label=""
                                onChange={handlePriorityChange}
                                placeholder="By Priority"
                                includeEmpty={true}
                                value={orderFilter}
                            />
                        </div>
                        
                        <div className={style.dropdownWrapper}>
                            <Dropdown 
                                options={statusOptions}
                                onChange={handleStatusChange}
                                placeholder="By Status"
                                iconSrc={i3}
                                value={selectedStatus}
                            />
                        </div>
                    </div>

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
                    {!isLoading && filteredTasks.length === 0 && (
                        <p>No tasks found</p>
                    )}
                    {tasksToDisplay.map(task => (
                        <Card
                            task={task}
                            key={task.id} 
                            onSetStatus={toggleTaskStatus}
                            deleteTask={deleteTask}
                        />
                    ))}
                </div>

                {hasMoreItems && (
                    <div className={style.buttonn}>
                        <CustomButton 
                            style={{fontWeight: "700"}} 
                            text="Load more" 
                            onClick={handleLoadMore}
                        />
                    </div>
                )}

            </div>
        </>
    );
});

export default AllTasks;