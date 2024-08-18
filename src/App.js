import React from "react";
import WorkForm from './components/other/WorkForm.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateProject from './pages/CreateProject.js';
import "./App.css";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-project" element={<CreateProject />} />
        {/* Add other routes here */}
        <Route path="/staff-form" element={<WorkForm />} />
      </Routes>
    </Router>
  );
}

export default App;
