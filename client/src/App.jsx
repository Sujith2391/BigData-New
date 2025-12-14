import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import ProjectInfo from './pages/ProjectInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/project-info" element={<ProjectInfo />} />
      </Routes>
    </Router>
  )
}

export default App;
