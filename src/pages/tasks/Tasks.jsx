import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, updateTask, deleteTask } from '../../store/slices/tasksSlice';
import TaskModal from '../../components/tasks/TaskModal';
import './tasks.css';

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector(state => state.tasks);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCreateTask = () => {
    setSelectedTask(null);
    setShowModal(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('آیا از حذف این تسک اطمینان دارید؟')) {
      dispatch(deleteTask(taskId));
    }
  };

  const handleSaveTask = (taskData) => {
    if (selectedTask) {
      dispatch(updateTask({ id: selectedTask.id, ...taskData }));
    } else {
      dispatch(createTask(taskData));
    }
    setShowModal(false);
    setSelectedTask(null);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo': return 'secondary';
      case 'inProgress': return 'primary';
      case 'done': return 'success';
      default: return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
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

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <div>
          <h1 className="page-title">مدیریت تسکها</h1>
          <p className="page-subtitle">ایجاد، ویرایش و مدیریت تسکهای پروژه</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreateTask}>
          <i className="fas fa-plus"></i> تسک جدید
        </button>
      </div>

      <div className="tasks-filters">
        <div className="row">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="جستجوی تسکها..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">همه تسکها</option>
              <option value="todo">برای انجام</option>
              <option value="inProgress">در حال انجام</option>
              <option value="done">انجام شده</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          خطا در بارگذاری تسکها: {error}
        </div>
      )}

      <div className="tasks-grid">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-tasks empty-icon"></i>
            <h3>هیچ تسکی یافت نشد</h3>
            <p>برای شروع، یک تسک جدید ایجاد کنید</p>
            <button className="btn btn-primary" onClick={handleCreateTask}>
              <i className="fas fa-plus"></i> تسک جدید
            </button>
          </div>
        ) : (
          <div className="row">
            {filteredTasks.map(task => (
              <div key={task.id} className="col-lg-6 col-xl-4 mb-4">
                <div className="task-card-item">
                  <div className="task-card-header">
                    <h5 className="task-title">{task.title}</h5>
                    <div className="task-badges">
                      <span className={`badge bg-${getPriorityColor(task.priority)}`}>
                        {task.priority === 'high' ? 'بالا' : task.priority === 'medium' ? 'متوسط' : 'پایین'}
                      </span>
                      <span className={`badge bg-${getStatusColor(task.status)}`}>
                        {task.status === 'todo' ? 'برای انجام' : 
                         task.status === 'inProgress' ? 'در حال انجام' : 'انجام شده'}
                      </span>
                    </div>
                  </div>

                  <p className="task-description">{task.description}</p>

                  <div className="task-info">
                    <div className="info-item">
                      <i className="fas fa-user"></i>
                      <span>{task.assignee?.name || 'تخصیص داده نشده'}</span>
                    </div>
                    <div className="info-item">
                      <i className="fas fa-folder"></i>
                      <span>{task.project?.name || 'بدون پروژه'}</span>
                    </div>
                    <div className="info-item">
                      <i className="fas fa-calendar"></i>
                      <span>{formatDate(task.dueDate)}</span>
                    </div>
                  </div>

                  {task.tags && task.tags.length > 0 && (
                    <div className="task-tags">
                      {task.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="task-tag">
                          {tag}
                        </span>
                      ))}
                      {task.tags.length > 3 && (
                        <span className="task-tag more-tags">+{task.tags.length - 3}</span>
                      )}
                    </div>
                  )}

                  <div className="task-progress">
                    <div className="progress">
                      <div 
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${task.progress || 0}%` }}
                        aria-valuenow={task.progress || 0}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {task.progress || 0}%
                      </div>
                    </div>
                  </div>

                  <div className="task-actions">
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEditTask(task)}
                    >
                      <i className="fas fa-edit"></i> ویرایش
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <i className="fas fa-trash"></i> حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <TaskModal
          show={showModal}
          onHide={() => setShowModal(false)}
          task={selectedTask}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default Tasks;