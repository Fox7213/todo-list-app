import { TaskStore } from './TaskStore';

export class RootStore {
  taskStore: TaskStore;

  constructor() {
    this.taskStore = new TaskStore();
  }

  // Подготовка всех данных для работы приложения
  initialize = async () => {
    await this.taskStore.fetchTasks();
  }
}

// Создание единств экз хранилища
const rootStore = new RootStore();
export default rootStore; 