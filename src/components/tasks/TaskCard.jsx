import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { setCurrentTask } from '../../store/slices/tasksSlice';

const TaskCard = ({ task, index }) => {
  const dispatch = useDispatch();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#27ae60';
      default: return '#95a5a6';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'بالا';
      case 'medium': return 'متوسط';
      case 'low': return 'پایین';
      default: return 'نامشخص';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const handleTaskClick = () => {
    dispatch(setCurrentTask(task));
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card ${
            snapshot.isDragging ? 'dragging' : ''
          }`}
          onClick={handleTaskClick}
        >
          <div className="task-header">
            <h5 className="task-title">{task.title}</h5>
            <div 
              className="priority-badge"
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            >
              {getPriorityLabel(task.priority)}
            </div>
          </div>

          <p className="task-description">{task.description}</p>

          <div className="task-meta">
            <div className="task-assignee">
              <img 
                src={task.assignee?.avatar || '/api/placeholder/32/32'} 
                alt={task.assignee?.name || 'Unknown'}
                className="assignee-avatar"
              />
              <span className="assignee-name">{task.assignee?.name || 'Unassigned'}</span>
            </div>

            <div className="task-dates">
              {task.dueDate && (
                <div className="due-date">
                  <i className="fas fa-calendar-alt"></i>
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              )}
            </div>
          </div>

          {task.tags && task.tags.length > 0 && (
            <div className="task-tags">
              {task.tags.slice(0, 3).map((tag, tagIndex) => (
                <span key={tagIndex} className="task-tag">
                  {tag}
                </span>
              ))}
              {task.tags.length > 3 && (
                <span className="task-tag more-tags">
                  +{task.tags.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="task-footer">
            <div className="task-project">
              <i className="fas fa-folder"></i>
              <span>{task.project?.name || 'No Project'}</span>
            </div>

            {task.comments && task.comments.length > 0 && (
              <div className="task-comments">
                <i className="fas fa-comment"></i>
                <span>{task.comments.length}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;