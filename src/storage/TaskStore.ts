import { makeAutoObservable, runInAction } from 'mobx';
import $api from '../../api/http';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export class TaskStore {
  tasks: Task[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  searchQuery: string = '';
  statusFilter: 'all' | 'completed' | 'inProgress' = 'all';

  constructor() {
    makeAutoObservable(this);
  }

  // Fetch all tasks
  // get /api/tasks
  fetchTasks = async () => {
    this.isLoading = true;
    this.error = null;
    
    try {
      const response = await $api.get('/api/tasks');
      runInAction(() => {
        console.log(response.data);
        this.tasks = response.data;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to fetch tasks';
        this.isLoading = false;
        console.error(error);
      });
    }
  }

  // Add a new task
  // post /api/tasks
  addTask = async (title: string, description: string) => {
    this.isLoading = true;
    this.error = null;
    
    try {
      const response = await $api.post('/api/tasks', { title, description, status: false });
      runInAction(() => {
        this.tasks.push(response.data);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to add task';
        this.isLoading = false;
        console.error(error);
      });
    }
  }

  // Toggle task status
  // patch /api/tasks/:id/status
  toggleTaskStatus = async (id: number) => {
    const task = this.tasks.find(task => task.id === id);
    if (!task) return;

    this.isLoading = true;
    this.error = null;
    
    try {
      const response = await $api.patch(`/api/tasks/${id}/status`);
      
      runInAction(() => {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
          this.tasks[index] = response.data;
        }
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to update task status';
        this.isLoading = false;
        console.error(error);
      });
    }
  }

  // Edit task
  // patch /api/tasks/:id
  editTask = async (id: number, title: string, description: string) => {
    this.isLoading = true;
    this.error = null;
    
    try {
      const response = await $api.patch(`/api/tasks/${id}`, { 
        title, 
        description 
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