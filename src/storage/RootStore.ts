import { TaskStore } from './TaskStore';

export class RootStore {
  taskStore: TaskStore;

  constructor() {
    this.taskStore = new TaskStore();
  }

  // Initialize all application data
  initialize = async () => {
    await this.taskStore.fetchTasks();
  }
}

// Create a single instance of the store
const rootStore = new RootStore();
export default rootStore; 