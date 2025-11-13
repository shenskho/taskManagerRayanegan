import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import FilterProjects from "./filter";
import {
  Spinner,
  CardHeader,
  CardBody,
  Card,
  CardTitle,
  CardText,
  Button,
  CardFooter,
  Row,
  Col,
} from "reactstrap";

import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../store/slices/projectsSlice";
// import './projects.css';

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleCreateProject = () => {
    setSelectedProject(null);
    setShowModal(true);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm("آیا از حذف این پروژه اطمینان دارید؟")) {
      dispatch(deleteProject(projectId));
    }
  };

  const handleSaveProject = (projectData) => {
    if (selectedProject) {
      dispatch(updateProject({ id: selectedProject.id, ...projectData }));
    } else {
      dispatch(createProject(projectData));
    }
    setShowModal(false);
    setSelectedProject(null);
  };

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "active") return project.status === "active";
    if (filter === "completed") return project.status === "completed";
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "completed":
        return "primary";
      case "on-hold":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "active":
        return "فعال";
      case "completed":
        return "تکمیل شده";
      case "on-hold":
        return "در انتظار";
      case "cancelled":
        return "لغو شده";
      default:
        return "نامشخص";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="spinner-border text-primary" role="status">
          <>
            <Spinner
              color="primary"
              style={{
                height: "3rem",
                width: "3rem",
              }}
            >
              Loading...
            </Spinner>
            <Spinner
              color="primary"
              style={{
                height: "3rem",
                width: "3rem",
              }}
              type="grow"
            >
              Loading...
            </Spinner>
          </>
          <span className="visually-hidden">در حال بارگذاری...</span>
        </div>
      </div>
    );
  }

  return (
    <Row>
      <Row>
        <Col>
          <h1 className="page-title">مدیریت پروژهها</h1>
          <p className="page-subtitle">
            ایجاد، ویرایش و مدیریت پروژههای سازمانی
          </p>
        </Col>
        
        <Col>
          <span className="mx-3">فیلترها:</span>
          <span className="btn-group" role="group">
            {[
              { value: "all", label: "همه پروژهها" },
              { value: "active", label: "فعال" },
              { value: "completed", label: "تکمیل شده" },
            ].map((filterOption) => (
              <button
                key={filterOption.value}
                className={`btn btn-outline-primary ${
                  filter === filterOption.value ? "active" : ""
                }`}
                onClick={() => setFilter(filterOption.value)}
              >
                {filterOption.label}
              </button>
            ))}
          </span>
        </Col>
      </Row>
      <Row>
        <div className="d-flex ">
          {projects.map((project) => (
            <Card>
              <CardBody>
                <CardTitle tag="h5">{project.name}</CardTitle>
                <CardText>{project.description}</CardText>
                <Button
                  color="primary"
                  onClick={() => handleEditProject(project)}
                >
                  ویرایش پروژه
                </Button>
                <Button
                  color="danger"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  حذف پروژه
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </Row>
    </Row>

    //     <Card >
    //       <CardHeader>
    // <h1 className="page-title">مدیریت پروژهها</h1>
    // <p className="page-subtitle">ایجاد، ویرایش و مدیریت پروژههای سازمانی</p>
    //         <Row xs={2} className="d-flex justify-content-between align-items-center">
    //           <Col>
    //             <button className="btn btn-primary" onClick={handleCreateProject}>
    //               <i className="fas fa-plus"></i> پروژه جدید
    //             </button>
    //           </Col>
    //           <Col>
    // <span className="mx-3">فیلترها:</span>
    // <span className="btn-group" role="group">
    //   {[
    //     { value: "all", label: "همه پروژهها" },
    //     { value: "active", label: "فعال" },
    //     { value: "completed", label: "تکمیل شده" },
    //   ].map((filterOption) => (
    //     <button
    //       key={filterOption.value}
    //       className={`btn btn-outline-primary ${
    //         filter === filterOption.value ? "active" : ""
    //       }`}
    //       onClick={() => setFilter(filterOption.value)}
    //     >
    //       {filterOption.label}
    //     </button>
    //   ))}
    // </span>
    //           </Col>
    //         </Row>
    //       </CardHeader>
    //       <br />
    // <Col className=" d-flex gap-20px justify-content-between">

    // {projects.map(project => (

    //   <Card>
    //   <CardBody >
    //     <CardTitle tag="h5">{project.name}</CardTitle>
    //     <CardText>{project.description}</CardText>
    //     <Button color="primary" onClick={() => handleEditProject(project)}>
    //       ویرایش پروژه
    //     </Button>
    //     <Button color="danger" onClick={() => handleDeleteProject(project.id)}>
    //       حذف پروژه
    //     </Button>
    //   </CardBody>
    //   </Card>

    // ))} </Col>
    //     </Card>

    // <div className="projects-page">
    // <div className="projects-header">
    //   <div>
    //     <h1 className="page-title">مدیریت پروژهها</h1>
    //     <p className="page-subtitle">
    //       ایجاد، ویرایش و مدیریت پروژههای سازمانی
    //     </p>
    //   </div>
    // <button className="btn btn-primary" onClick={handleCreateProject}>
    //   <i className="fas fa-plus"></i> پروژه جدید
    // </button>
    //   </div>

    // <div className="projects-filters">
    //   <div className="row">
    //     <div className="col-md-6">
    //       <div className="btn-group" role="group">
    //         {[
    //           { value: "all", label: "همه پروژهها" },
    //           { value: "active", label: "فعال" },
    //           { value: "completed", label: "تکمیل شده" },
    //         ].map((filterOption) => (
    //           <button
    //             key={filterOption.value}
    //             className={`btn btn-outline-primary ${
    //               filter === filterOption.value ? "active" : ""
    //             }`}
    //             onClick={() => setFilter(filterOption.value)}
    //           >
    //             {filterOption.label}
    //           </button>
    //         ))}
    //       </div>
    //     </div>
    //       <div className="col-md-6">
    //         <div className="project-stats">
    //           <div className="stat-item">
    //             <span className="stat-number">{projects.length}</span>
    //             <span className="stat-label">کل پروژهها</span>
    //           </div>
    //           <div className="stat-item">
    //             <span className="stat-number">
    //               {projects.filter((p) => p.status === "active").length}
    //             </span>
    //             <span className="stat-label">فعال</span>
    //           </div>
    //           <div className="stat-item">
    //             <span className="stat-number">
    //               {projects.filter((p) => p.status === "completed").length}
    //             </span>
    //             <span className="stat-label">تکمیل شده</span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {error && (
    //     <div className="alert alert-danger" role="alert">
    //       خطا در بارگذاری پروژهها: {error}
    //     </div>
    //   )}

    //   <div className="projects-grid">
    //     {filteredProjects.length === 0 ? (
    //       <div className="empty-state">
    //         <i className="fas fa-project-diagram empty-icon"></i>
    //         <h3>هیچ پروژهای یافت نشد</h3>
    //         <p>برای شروع، یک پروژه جدید ایجاد کنید</p>
    //         <button className="btn btn-primary" onClick={handleCreateProject}>
    //           <i className="fas fa-plus"></i> پروژه جدید
    //         </button>
    //       </div>
    //     ) : (
    //       <div className="row">
    //         {filteredProjects.map((project) => (
    //           <div key={project.id} className="col-lg-6 col-xl-4 mb-4">
    //             <div className="project-card-item">
    //               <div className="project-card-header">
    //                 <h5 className="project-title">{project.name}</h5>
    //                 <span
    //                   className={`badge bg-${getStatusColor(project.status)}`}
    //                 >
    //                   {getStatusLabel(project.status)}
    //                 </span>
    //               </div>

    //               <p className="project-description">{project.description}</p>

    //               <div className="project-progress">
    //                 <div className="progress-info">
    //                   <span className="progress-label">پیشرفت پروژه</span>
    //                   <span className="progress-percentage">
    //                     {project.progress || 0}%
    //                   </span>
    //                 </div>
    //                 <div className="progress">
    //                   <div
    //                     className="progress-bar"
    //                     role="progressbar"
    //                     style={{ width: `${project.progress || 0}%` }}
    //                     aria-valuenow={project.progress || 0}
    //                     aria-valuemin="0"
    //                     aria-valuemax="100"
    //                   >
    //                     {project.progress || 0}%
    //                   </div>
    //                 </div>
    //               </div>

    //               <div className="project-info">
    //                 <div className="info-item">
    //                   <i className="fas fa-user-tie"></i>
    //                   <span>مدیر پروژه: {project.manager || "تعیین نشده"}</span>
    //                 </div>
    //                 <div className="info-item">
    //                   <i className="fas fa-users"></i>
    //                   <span>اعضای تیم: {project.team?.length || 0} نفر</span>
    //                 </div>
    //                 <div className="info-item">
    //                   <i className="fas fa-calendar-alt"></i>
    //                   <span>تاریخ شروع: {formatDate(project.startDate)}</span>
    //                 </div>
    //                 <div className="info-item">
    //                   <i className="fas fa-calendar-check"></i>
    //                   <span>تاریخ پایان: {formatDate(project.endDate)}</span>
    //                 </div>
    //               </div>

    //               <div className="project-stats">
    //                 <div className="stat-item">
    //                   <span className="stat-number">
    //                     {project.tasksCount || 0}
    //                   </span>
    //                   <span className="stat-label">تسکها</span>
    //                 </div>
    //                 <div className="stat-item">
    //                   <span className="stat-number">
    //                     {project.completedTasks || 0}
    //                   </span>
    //                   <span className="stat-label">تکمیل شده</span>
    //                 </div>
    //                 <div className="stat-item">
    //                   <span className="stat-number">{project.budget || 0}</span>
    //                   <span className="stat-label">بودجه (میلیون)</span>
    //                 </div>
    //               </div>

    //               <div className="project-actions">
    //                 <button
    //                   className="btn btn-sm btn-outline-primary"
    //                   onClick={() => handleEditProject(project)}
    //                 >
    //                   <i className="fas fa-edit"></i> ویرایش
    //                 </button>
    //                 <button
    //                   className="btn btn-sm btn-outline-danger"
    //                   onClick={() => handleDeleteProject(project.id)}
    //                 >
    //                   <i className="fas fa-trash"></i> حذف
    //                 </button>
    //                 <button className="btn btn-sm btn-outline-info">
    //                   <i className="fas fa-eye"></i> مشاهده
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </div>

    //   {showModal && (
    //     <ProjectModal
    //       show={showModal}
    //       onHide={() => setShowModal(false)}
    //       project={selectedProject}
    //       onSave={handleSaveProject}
    //     />
    //   )}
    // </div>
    //   <CardHeader>
    //     Header
    //   </CardHeader>
    //   <CardBody>
    //     <CardTitle tag="h5">
    //       Special Title Treatment
    //     </CardTitle>
    //     <CardText>
    //       With supporting text below as a natural lead-in to additional content.
    //     </CardText>
    //     <Button>
    //       Go somewhere
    //     </Button>
    //   </CardBody>
    //   <CardFooter>
    //     Footer
    //   </CardFooter>
    // </Card>
  );
};

export default Projects;
