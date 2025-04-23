import Card from "../Card/Card";

import { Task } from "../../models/Task";

interface CardListProps {
  tasks: Task[];
  toggleTaskStatus: (taskId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

const CardList = ({ tasks, toggleTaskStatus, deleteTask }: CardListProps) => {
  return (
    <>
      {tasks.map(task => (
        <Card
          task={task}
          key={task.id} 
          onSetStatus={toggleTaskStatus}
          deleteTask={deleteTask}
        />
      ))}
    </>
  );
};

export default CardList;