import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useStore } from '../../storage/StoreContext';

import CardList from '../../components/CardList/CardList';
import CustomButton from '../../components/CustomButton/CustomButton';
import Dropdown from "../../components/Dropdown/Dropdown";
import PriorityDropdown from "../../components/Dropdown/PriorityDropdown";
import Input from "../../components/Input/Input";

import style from "./Alltasks.module.scss";

import iconSrc from "../../image/Header/iconSrc.svg";
import i3 from '../../image/Inputs/i3.svg';

// Количество задач на странице
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
    
    // Состояние для отслеживания выбранного статуса в выпадающем списке
    const [selectedStatus, setSelectedStatus] = useState('');
    
    // Установить начальный фильтр статуса на основе параметра URL
    useEffect(() => {
        const statusParam = searchParams.get('status');
        if (statusParam) {
            setStatusFilter(statusParam as 'all' | 'completed' | 'inProgress');
            
            // Обновить значение выпадающего списка в соответствии с фильтром
            if (statusParam === 'inProgress') {
                setSelectedStatus('In Progress');
            } else if (statusParam === 'completed') {
                setSelectedStatus('Completed');
            } else {
                setSelectedStatus('');
            }
        }
    }, [searchParams, setStatusFilter]);
    
    // Обнулить фильтры при удалении компонента из DOM или смене адреса
    useEffect(() => {
        return () => {
            // функция очистки, когда компонент удаляется.
            setSearchQuery('');
            setStatusFilter('all');
            setOrderFilter('');
        };
    }, [setSearchQuery, setStatusFilter, setOrderFilter]);
    
    // использовать filteredTasks вместо tasks для результатов поиска
    const filteredTasks = taskStore.filteredTasks;
    
    // состояние  pagination
    const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        // сброс настройки pagination при изменении критериев поиска
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
        // Сбросить пагинацию при изменении фильтра
        setVisibleItems(ITEMS_PER_PAGE);
    };
    
    const handlePriorityChange = (value: string) => {
        setOrderFilter(value);
        // Сбросить пагинацию при изменении фильтра
        setVisibleItems(ITEMS_PER_PAGE);
    };
    
    // Отобрать только задачи, отображаемые на текущей странице с учетом pagination
    const tasksToDisplay = filteredTasks.slice(0, visibleItems);
    
    // Проверка, есть ли еще элементы для загрузки
    const hasMoreItems = filteredTasks.length > visibleItems;
    
    // обработка клика more button 
    const handleLoadMore = () => {
        setVisibleItems(prev => prev + ITEMS_PER_PAGE);
    };

    // Варианты фильтрации по статусу
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
                    <CardList 
                        tasks={tasksToDisplay}
                        toggleTaskStatus={toggleTaskStatus}
                        deleteTask={deleteTask}
                    />
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