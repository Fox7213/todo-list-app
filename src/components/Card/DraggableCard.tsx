import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Task } from '../../models/Task';
import Card from './Card';

interface DraggableCardProps {
  task: Task;
  deleteTask: (id: string) => Promise<void>;
  onSetStatus: (id: string) => Promise<void>;
}

const DraggableCard = ({ task, deleteTask, onSetStatus }: DraggableCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    zIndex: isDragging ? 1000 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Card
        task={task}
        deleteTask={deleteTask}
        onSetStatus={onSetStatus}
      />
    </div>
  );
};

export default DraggableCard; 