import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import AIToolsDirectoryPage from './pages/AIToolsDirectory';
import AIToolsDiscription from './pages/AIToolsDiscriptionPage';
import ToolDetailsPage from "./pages/ToolDetailsPage";
import EbookDetailPage from "./pages/EbookDetails";
import Ebook from "./pages/Ebook";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/ai-tools" element={<AIToolsDirectoryPage />} />
        <Route path="/ai-tools-discription" element={<AIToolsDiscription />} />
        <Route path="/tools/:id" element={<ToolDetailsPage />} />
        <Route path="ebook" element={<Ebook />} />
        <Route path="/ebooks/:id" element={<EbookDetailPage />} />
        <Route path="/" element={<AIToolsDirectoryPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;