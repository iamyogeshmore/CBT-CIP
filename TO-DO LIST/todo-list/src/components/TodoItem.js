import React from 'react';

function TodoItem({ task, toggleTaskCompletion }) {
  return (
    <li>
      <div className="task-content">
        <span className={task.completed ? 'completed task-name' : 'task-name'}>
          {task.text}
        </span>
        <span className="task-info">
          {` (Created: ${task.createdAt})${task.completed ? ` (Completed: ${task.completedAt})` : ''}`}
        </span>
      </div>
      <div className="button-container">
        <button onClick={() => toggleTaskCompletion(task.id)} className="toggle-button">
          {task.completed ? 'Undo' : 'Complete'}
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
