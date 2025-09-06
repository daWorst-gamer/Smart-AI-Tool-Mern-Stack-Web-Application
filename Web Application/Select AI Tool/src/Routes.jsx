import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import AIToolsDirectoryPage from './pages/AIToolsDirectory';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/ai-tools" element={<AIToolsDirectoryPage />} />
        <Route path="/" element={<AIToolsDirectoryPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;