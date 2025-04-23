import { verticalListSortingStrategy } from "@dnd-kit/sortable";

import { SortableContext } from "@dnd-kit/sortable";

import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

import { Task } from "../../models/Task";
import DraggableCard from "../Card/DraggableCard";
interface DroppableContainerProps {
  id: string;
  children: ReactNode;
  className?: string;
}

const DroppableContainer = ({
  id,
  children,
  className = ''
}: DroppableContainerProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div 
      ref={setNodeRef} 
      className={`${className} ${isOver ? 'drop-active' : ''}`}
      style={{
        backgroundColor: isOver ? 'rgba(59, 165, 155, 0.2)' : undefined,
        transition: 'background-color 0.2s ease',
        minHeight: '200px',
        borderRadius: '8px',
        padding: '10px',
        zIndex: 1000,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
};

interface DroppableCardListProps {
  id: string;
  tasks: Task[];
  className?: string;
  handleDeleteTask: (taskId: string) => Promise<void>;
  handleToggleStatus: (taskId: string) => Promise<void>;
}

const DroppableCardList = ({
  id,
  tasks,
  className = '',
  handleDeleteTask,
  handleToggleStatus
}: DroppableCardListProps) => {
  return (
    <DroppableContainer id={id} className={className}>
      <SortableContext 
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
    {tasks.length > 0 ? (
        tasks.map((task: Task) => (
            <div style={{marginBottom: '20px'}}>
                <DraggableCard 
                    key={task.id}
                    task={task}
                deleteTask={handleDeleteTask}
                    onSetStatus={handleToggleStatus}
                />
            </div>
        ))
    ) : (
        <div>No completed tasks</div>
    )}
</SortableContext>
    </DroppableContainer>
  );
};

export default DroppableCardList;