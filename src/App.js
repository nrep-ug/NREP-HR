import React from "react";
import WorkForm from './components/other/WorkForm.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateProject from './pages/CreateProject.js';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './pages/ProjectDetails';
import ProjectTeam from './pages/ProjectTeam';
import ProjectTasksPage from './pages/ProjectTasksPage';
import TaskDetailsPage from './pages/TaskDetailsPage';

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectID" element={<ProjectDetails />} />
        <Route path="/projects/:projectID/team" element={<ProjectTeam />} />
        <Route path="/projects/:projectID/tasks" element={<ProjectTasksPage />} />
        <Route path="/projects/:projectID/tasks/:taskID" element={<TaskDetailsPage />} />
        {/* Add other routes here */}
        <Route path="/staff-form" element={<WorkForm />} />
      </Routes>
    </Router>
  );
}

export default App;
