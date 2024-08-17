import React from "react";
import WorkForm from './components/other/WorkForm.js'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";



function App() {

  return (
    <Router>
      <div className="App">
        <div>
          <Routes>
            <Route path="/staff-form" element={<WorkForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
