import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

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

export default DroppableContainer; 