import React from "react";
import WorkForm from './components/other/WorkForm.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateProject from './pages/CreateProject.js';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './pages/ProjectDetails'; // Update this import
import ProjectTeam from './pages/ProjectTeam'; // Import the ProjectTeam component
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectID" element={<ProjectDetails />} />
        <Route path="/projects/:projectID/team" element={<ProjectTeam />} />
        {/* Add other routes here */}
        <Route path="/staff-form" element={<WorkForm />} />
      </Routes>
    </Router>
  );
}

export default App;
