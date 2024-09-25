import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/project/Dashboard';
import CreateProject from '../pages/project/CreateProject';
import ProjectsPage from '../pages/project/ProjectsPage';
import ProjectDetails from '../pages/project/ProjectDetails';
import ProjectTeam from '../pages/project/ProjectTeam';
import ProjectTasksPage from '../pages/project/ProjectTasksPage';
import TaskDetailsPage from '../pages/project/TaskDetailsPage';

const ProjectRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<PrivateRoute element={<Dashboard />} />} />
    <Route path="create" element={<PrivateRoute element={<CreateProject />} />} />
    <Route path="list" element={<PrivateRoute element={<ProjectsPage />} />} />
    <Route path=":projectID" element={<PrivateRoute element={<ProjectDetails />} />} />
    <Route path=":projectID/team" element={<PrivateRoute element={<ProjectTeam />} />} />
    <Route path=":projectID/tasks" element={<PrivateRoute element={<ProjectTasksPage />} />} />
    <Route path=":projectID/tasks/:taskID" element={<PrivateRoute element={<TaskDetailsPage />} />} />
  </Routes>
);

export default ProjectRoutes;