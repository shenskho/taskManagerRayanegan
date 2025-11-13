import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks } from '@/store/slices/tasksSlice'
import { fetchProjects } from '@/store/slices/projectsSlice'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { tasks, loading: tasksLoading } = useSelector(state => state.tasks)
  const { projects, loading: projectsLoading } = useSelector(state => state.projects)

  useEffect(() => {
    dispatch(fetchTasks())
    dispatch(fetchProjects())
  }, [dispatch])

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.status === 'done').length
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length
  const todoTasks = tasks.filter(task => task.status === 'todo').length

  const totalProjects = projects.length
  const activeProjects = projects.filter(project => project.status === 'active').length
  const completedProjects = projects.filter(project => project.status === 'completed').length

  const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="page-title">داشبورد</h2>
          <p className="page-subtitle">نمای کلی از پروژه‌ها و وظایف شما</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card stats-card">
            <div className="card-body text-center">
              <i className="fas fa-tasks stats-icon text-primary"></i>
              <h3 className="stats-number">{totalTasks}</h3>
              <p className="stats-label">کل وظایف</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card stats-card">
            <div className="card-body text-center">
              <i className="fas fa-check-circle stats-icon text-success"></i>
              <h3 className="stats-number">{completedTasks}</h3>
              <p className="stats-label">وظایف تکمیل‌شده</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card stats-card">
            <div className="card-body text-center">
              <i className="fas fa-spinner stats-icon text-warning"></i>
              <h3 className="stats-number">{inProgressTasks}</h3>
              <p className="stats-label">در حال انجام</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card stats-card">
            <div className="card-body text-center">
              <i className="fas fa-project-diagram stats-icon text-info"></i>
              <h3 className="stats-number">{totalProjects}</h3>
              <p className="stats-label">کل پروژه‌ها</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress and Projects Row */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">درصد پیشرفت وظایف</h5>
            </div>
            <div className="card-body">
              <div className="progress mb-3" style={{height: '20px'}}>
                <div 
                  className="progress-bar bg-success" 
                  role="progressbar" 
                  style={{width: `${taskCompletionRate}%`}}
                >
                  {taskCompletionRate}%
                </div>
              </div>
              <div className="row text-center">
                <div className="col-4">
                  <div className="text-muted">برای انجام</div>
                  <div className="h5">{todoTasks}</div>
                </div>
                <div className="col-4">
                  <div className="text-muted">در حال انجام</div>
                  <div className="h5">{inProgressTasks}</div>
                </div>
                <div className="col-4">
                  <div className="text-muted">تکمیل‌شده</div>
                  <div className="h5">{completedTasks}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">وضعیت پروژه‌ها</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-4">
                  <div className="text-muted">فعال</div>
                  <div className="h5 text-success">{activeProjects}</div>
                </div>
                <div className="col-4">
                  <div className="text-muted">تکمیل‌شده</div>
                  <div className="h5 text-info">{completedProjects}</div>
                </div>
                <div className="col-4">
                  <div className="text-muted">کل پروژه‌ها</div>
                  <div className="h5">{totalProjects}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title">وظایف اخیر</h5>
              <a href="/tasks" className="btn btn-sm btn-outline-primary">
                مشاهده همه
              </a>
            </div>
            <div className="card-body">
              {tasksLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">در حال بارگذاری...</span>
                  </div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>عنوان وظیفه</th>
                        <th>پروژه</th>
                        <th>وضعیت</th>
                        <th>اولویت</th>
                        <th>ضرب‌العجل</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.slice(0, 5).map(task => (
                        <tr key={task.id}>
                          <td>{task.title}</td>
                          <td>
                            <span 
                              className="badge" 
                              style={{backgroundColor: task.projectColor}}
                            >
                              {task.projectName}
                            </span>
                          </td>
                          <td>
                            <span className={`badge badge-status-${task.status}`}>
                              {task.status === 'todo' && 'برای انجام'}
                              {task.status === 'in-progress' && 'در حال انجام'}
                              {task.status === 'done' && 'تکمیل‌شده'}
                            </span>
                          </td>
                          <td>
                            <span className={`badge badge-priority-${task.priority}`}>
                              {task.priority === 'high' && 'بالا'}
                              {task.priority === 'medium' && 'متوسط'}
                              {task.priority === 'low' && 'پایین'}
                            </span>
                          </td>
                          <td>{task.dueDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">پروژه‌های فعال</h5>
            </div>
            <div className="card-body">
              {projectsLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">در حال بارگذاری...</span>
                  </div>
                </div>
              ) : (
                <div className="project-list">
                  {projects.filter(p => p.status === 'active').slice(0, 5).map(project => (
                    <div key={project.id} className="project-item mb-3 p-3 border rounded">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0">{project.name}</h6>
                        <span 
                          className="badge" 
                          style={{backgroundColor: project.color}}
                        >
                          {project.progress}%
                        </span>
                      </div>
                      <div className="progress mb-2" style={{height: '6px'}}>
                        <div 
                          className="progress-bar" 
                          role="progressbar" 
                          style={{width: `${project.progress}%`, backgroundColor: project.color}}
                        ></div>
                      </div>
                      <small className="text-muted">مدیر: {project.manager}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard