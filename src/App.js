import React from "react";
import WorkForm from './components/other/WorkForm.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Image, Spinner } from 'react-bootstrap';
import usePreloadResources from './hooks/usePreloadResources'
import Loader from './components/common/Loader'

import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import CreateProject from './pages/CreateProject.js';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './pages/ProjectDetails';
import ProjectTeam from './pages/ProjectTeam';
import ProjectTasksPage from './pages/ProjectTasksPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import SignIn from './pages/SignIn.js';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import PrivateRoute from './routes/PrivateRoute.js';
import "./App.css";

function App() {

  return (
    <AuthProvider>
      <div className="app-container">
        <Router>
          <Content />
        </Router>
      </div>
    </AuthProvider>
  );
}

// Content component to conditionally render Sidebar and Routes
function Content() {
  const { isAuthenticated } = useAuth();

  const imagesToPreload = [
    '/images/nrep-1.png',
    // '/path/to/your/image2.png'
    // Add more image paths that need to be preloaded
  ]

  const loading = usePreloadResources(imagesToPreload)

  if (loading) {
    // return <Loader />
    // return <div>Loading ... </div>
    return <div className="loader-container">
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="success" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
    </div>
  }

  return (
    <>
      {isAuthenticated && <Sidebar />}
      <div className={`content ${isAuthenticated ? '' : 'full-width'}`}>
        {isAuthenticated && (
          <div
            style={{ alignSelf: 'center' }}
            className="d-flex justify-content-center"
          >
            <Image
              src="/images/nrep-1.png"
              fluid
              alt="The National Renewable Energy Platform (NREP)"
              style={{ width: '15rem', height: 'auto' }}
            />
          </div>
        )}
        <Container>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/create-project" element={<PrivateRoute element={<CreateProject />} />} />
            <Route path="/projects" element={<PrivateRoute element={<ProjectsPage />} />} />
            <Route path="/projects/:projectID" element={<PrivateRoute element={<ProjectDetails />} />} />
            <Route path="/projects/:projectID/team" element={<PrivateRoute element={<ProjectTeam />} />} />
            <Route path="/projects/:projectID/tasks" element={<PrivateRoute element={<ProjectTasksPage />} />} />
            <Route path="/projects/:projectID/tasks/:taskID" element={<PrivateRoute element={<TaskDetailsPage />} />} />
            {/* Add other routes here */}
            {/* <Route path="/staff-form" element={<PrivateRoute element={<WorkForm />} />} /> */}
            <Route path="/staff-form" element={<WorkForm />} />
          </Routes>
        </Container>
      </div>
    </>
  );
}

export default App;
