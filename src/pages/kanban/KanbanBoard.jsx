import React, { useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTaskLocal, moveTask } from '../../store/slices/tasksSlice';
import TaskCard from '../../components/tasks/TaskCard';
// import './kanban.css';

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector(state => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const columns = {
    todo: {
      id: 'todo',
      title: 'برای انجام',
      taskIds: tasks.filter(task => task.status === 'todo').map(task => task.id),
      color: '#e74c3c'
    },
    inProgress: {
      id: 'inProgress',
      title: 'در حال انجام',
      taskIds: tasks.filter(task => task.status === 'inProgress').map(task => task.id),
      color: '#f39c12'
    },
    done: {
      id: 'done',
      title: 'انجام شده',
      taskIds: tasks.filter(task => task.status === 'done').map(task => task.id),
      color: '#27ae60'
    }
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId;
    const task = tasks.find(t => t.id === draggableId);
    
    if (task && task.status !== newStatus) {
      dispatch(updateTaskLocal({ id: draggableId, status: newStatus }));
      dispatch(moveTask({ taskId: draggableId, newStatus }));
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        خطا در بارگذاری تسکها: {error}
      </div>
    );
  }

  return (
    <div className="kanban-board">
      <div className="kanban-header">
        <h1 className="page-title">میزکار رایانگان</h1>
        <p className="page-subtitle">مدیریت وظایف با استفاده از روش میزکار رایانگان</p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-columns">
          {Object.values(columns).map(column => (
            <div key={column.id} className="kanban-column">
              <div className="column-header" style={{ backgroundColor: column.color }}>
                <h3 className="column-title">{column.title}</h3>
                <span className="column-count">{column.taskIds.length}</span>
              </div>
              
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`column-content ${
                      snapshot.isDraggingOver ? 'dragging-over' : ''
                    }`}
                  >
                    {column.taskIds.map((taskId, index) => {
                      const task = tasks.find(t => t.id === taskId);
                      return task ? (
                        <TaskCard key={task.id} task={task} index={index} />
                      ) : null;
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;