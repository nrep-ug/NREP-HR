import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Image, Spinner } from 'react-bootstrap';
import usePreloadResources from './hooks/usePreloadResources';
import Loader from './components/common/Loader';
import Sidebar from './components/layout/Sidebar';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import Routes from './routes/Routes';
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
  ];

  const loading = usePreloadResources(imagesToPreload);

  if (loading) {
    return (
      <div className="loader-container">
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
      </div>
    );
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
          <Routes />
        </Container>
      </div>
    </>
  );
}

export default App;