import React, { useState, useEffect } from 'react';

const ProjectModal = ({ show, onHide, project, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active',
    manager: '',
    startDate: '',
    endDate: '',
    budget: '',
    team: ''
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        status: project.status || 'active',
        manager: project.manager || '',
        startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
        endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
        budget: project.budget || '',
        team: project.team?.join(', ') || ''
      });
    } else {
      setFormData({
        name: '',
        description: '',
        status: 'active',
        manager: '',
        startDate: '',
        endDate: '',
        budget: '',
        team: ''
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      budget: parseFloat(formData.budget) || 0,
      team: formData.team ? formData.team.split(',').map(member => member.trim()) : []
    };
    onSave(projectData);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onHide}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5 className="modal-title">{project ? 'ویرایش پروژه' : 'پروژه جدید'}</h5>
          <button type="button" className="btn-close" onClick={onHide}></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group mb-3">
              <label className="form-label">نام پروژه *</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="نام پروژه را وارد کنید"
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
                placeholder="توضیحات پروژه را وارد کنید"
              />
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="form-label">وضعیت</label>
                  <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                    <option value="planning">برنامه‌ریزی</option>
                    <option value="active">فعال</option>
                    <option value="onHold">متوقف</option>
                    <option value="completed">تکمیل شده</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="form-label">مدیر پروژه</label>
                  <select className="form-select" name="manager" value={formData.manager} onChange={handleChange}>
                    <option value="">انتخاب کنید...</option>
                    <option value="user1">علی احمدی</option>
                    <option value="user2">مریم محمدی</option>
                    <option value="user3">رضا رضایی</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="form-label">تاریخ شروع</label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="form-label">تاریخ پایان</label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="form-label">بودجه (تومان)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="مقدار بودجه را وارد کنید"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="form-label">پیشرفت (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    max="100"
                    name="progress"
                    value={formData.progress || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="form-label">اعضای تیم</label>
              <input
                type="text"
                className="form-control"
                name="teamMembers"
                value={formData.teamMembers || ''}
                onChange={handleChange}
                placeholder="اعضای تیم را با کاما از هم جدا کنید (مثال: علی احمدی، مریم محمدی)"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              انصراف
            </button>
            <button type="submit" className="btn btn-primary">
              {project ? 'بروزرسانی' : 'ایجاد پروژه'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;