import { flow, makeAutoObservable, runInAction } from 'mobx';
import $api from '../../api/http';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  order: number;
}

export class TaskStore {
  tasks: Task[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  searchQuery: string = '';
  statusFilter: 'all' | 'completed' | 'inProgress' = 'all';

  lastFetched: number | null = null;
  fetchDebounceTimeout: number | null = null;

  constructor() {
    makeAutoObservable(this, {
      filteredTasks: true, // Mark computed properties
      completedTasks: true,
      runningTasks: true,
      fetchTasks: flow, // explicitly declare generator-based async action
    });
  }

  // Fetch all tasks with debouncing and caching
  // get /api/tasks
  fetchTasks = flow(function* (this: TaskStore, force = false) {
    const DEBOUNCE_TIME = 5000;
    // Skip fetch if recently loaded (within last 5 seconds) unless forced
    const now = Date.now();
    if (!force && this.lastFetched && now - this.lastFetched < DEBOUNCE_TIME) {
      return;
    }
    
    // Debounce multiple fetch calls
    if (this.fetchDebounceTimeout) {
      clearTimeout(this.fetchDebounceTimeout);
    }
    
    yield new Promise(resolve => {
      this.fetchDebounceTimeout = setTimeout(resolve, 300);
    });

    if (this.isLoading) return;

    this.isLoading = true;
    this.error = null;

    try {
      const response = yield $api.get('/api/tasks');
      this.tasks = response.data;
      this.lastFetched = Date.now();
    } catch (e) {
      this.error = 'Failed to fetch tasks';
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  });

  // Add a new task
  // post /api/tasks
  addTask = async (title: string, description: string, priority?: number, dueDate?: Date | null) => {
    this.isLoading = true;
    this.error = null;
    
    try {
      const response = await $api.post('/api/tasks', { 
        title, 
        description, 
        priority: priority || 0,
        dueDate: dueDate || undefined,
        completed: false 
      });
      
      runInAction(() => {
        this.tasks.push(response.data);
        this.isLoading = false;
      });
      
      return response.data;
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to add task';
        this.isLoading = false;
        console.error(error);
      });
      throw error;
    }
  }

  // Toggle task status
  // patch /api/tasks/:id/status
  toggleTaskStatus = async (id: number) => {
    const task = this.tasks.find(task => task.id === id);
    if (!task) return;
    
    // Optimistic update
    const originalStatus = task.completed;
    const taskIndex = this.tasks.findIndex(t => t.id === id);
    
    // Update UI immediately
    runInAction(() => {
      this.tasks[taskIndex] = {
        ...this.tasks[taskIndex],
        completed: !originalStatus
      };
    });
    
    // Then make the API call
    try {
      const response = await $api.patch(`/api/tasks/${id}/status`);
      
      // Update with server data if needed
      runInAction(() => {
        this.tasks[taskIndex] = response.data;
      });
    } catch (error) {
      // Revert on error
      runInAction(() => {
        this.tasks[taskIndex] = {
          ...this.tasks[taskIndex],
          completed: originalStatus
        };
        this.error = 'Failed to update task status';
        console.error(error);
      });
    }
  }

  // Edit task
  // patch /api/tasks/:id
  editTask = async (id: number, title: string, description: string, priority: number, createdAt: Date, dueDate?: Date | null) => {
    this.isLoading = true;
    this.error = null;
    console.log(id, title, description, priority, createdAt, dueDate);
    try {
      const response = await $api.patch(`/api/tasks/${id}`, { 
        title, 
        description,
        priority,
        createdAt,
        dueDate: dueDate || undefined
      });
      
      runInAction(() => {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
          this.tasks[index] = response.data;
        }
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to edit task';
        this.isLoading = false;
        console.error(error);
      });
    }
  }

  // Delete task
  // delete /api/tasks/:id
  deleteTask = async (id: number) => {
    this.isLoading = true;
    this.error = null;
    
    try {
      await $api.delete(`/api/tasks/${id}`);
      runInAction(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to delete task';
        this.isLoading = false;
        console.error(error);
      });
    }
  }

  // Set search query
  setSearchQuery = (query: string) => {
    this.searchQuery = query;
  }

  // Set status filter
  setStatusFilter = (filter: 'all' | 'completed' | 'inProgress') => {
    this.statusFilter = filter;
  }

  get completedTasks() {
    return this.tasks.filter(task => task.completed);
  }
  
  get runningTasks() {
    return this.tasks.filter(task => !task.completed);
  }

  // Get filtered tasks
  get filteredTasks() {
    return this.tasks
      .filter(task => {
        // Apply search filter
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          return (
            task.title.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query)
          );
        }
        return true;
      })
      .filter(task => {
        // Apply status filter
        if (this.statusFilter === 'all') return true;
        if (this.statusFilter === 'completed') return task.completed;
        if (this.statusFilter === 'inProgress') return !task.completed;
        return true;
      });
  }
} 