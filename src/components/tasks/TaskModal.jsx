import React, { useState, useEffect } from 'react';

const TaskModal = ({ show, onHide, task, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    assignee: '',
    project: '',
    dueDate: '',
    tags: '',
    progress: 0
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        status: task.status || 'todo',
        assignee: task.assignee?.id || '',
        project: task.project?.id || '',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        tags: task.tags?.join(', ') || '',
        progress: task.progress || 0
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo',
        assignee: '',
        project: '',
        dueDate: '',
        tags: '',
        progress: 0
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      progress: parseInt(formData.progress)
    };
    onSave(taskData);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onHide}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5 className="modal-title">{task ? 'ویرایش تسک' : 'تسک جدید'}</h5>
          <button type="button" className="btn-close" onClick={onHide}></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group mb-3">
              <label className="form-label">عنوان تسک *</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="عنوان تسک را وارد کنید"
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">توضیحات</label>
              <textarea
                className="form-control"
                rows="3"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="توضیحات تسک را وارد کنید"
              />
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="form-label">اولویت</label>
                  <select className="form-select" name="priority" value={formData.priority} onChange={handleChange}>
                    <option value="low">پایین</option>
                    <option value="medium">متوسط</option>
                    <option value="high">بالا</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="form-label">وضعیت</label>
                  <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                    <option value="todo">برای انجام</option>
                    <option value="inProgress">در حال انجام</option>
                    <option value="done">انجام شده</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="form-label">تخصیص به</label>
                  <select className="form-select" name="assignee" value={formData.assignee} onChange={handleChange}>
                    <option value="">انتخاب کنید...</option>
                    <option value="user1">علی احمدی</option>
                    <option value="user2">مریم محمدی</option>
                    <option value="user3">رضا رضایی</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="form-label">پروژه</label>
                  <select className="form-select" name="project" value={formData.project} onChange={handleChange}>
                    <option value="">انتخاب کنید...</option>
                    <option value="project1">پروژه وب سایت</option>
                    <option value="project2">اپلیکیشن موبایل</option>
                    <option value="project3">سیستم مدیریت</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="form-label">تاریخ تحویل</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="form-label">پیشرفت (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="progress"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="form-label">برچسبها</label>
              <input
                type="text"
                className="form-control"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="برچسبها را با کاما از هم جدا کنید (مثال: frontend, urgent, bug)"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              انصراف
            </button>
            <button type="submit" className="btn btn-primary">
              {task ? 'بروزرسانی' : 'ایجاد تسک'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;