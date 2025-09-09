import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import AIToolsDirectoryPage from './pages/AIToolsDirectory';
import AIToolsDiscription from './pages/AIToolsDiscriptionPage';
import ToolDetailsPage from "./pages/ToolDetailsPage";
import EbookDetailPage from "./pages/EbookDetails";
import Terms from "./pages/TermsAndConditions";
import Ebook from "./pages/Ebook";
import Policy from "./pages/Privacy&Policy";
import NotFound from "./pages/404";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/ai-tools" element={<AIToolsDirectoryPage />} />
        <Route path="/ai-tools-discription" element={<AIToolsDiscription />} />
        <Route path="/tools/:id" element={<ToolDetailsPage />} />
        <Route path="ebook" element={<Ebook />} />
        <Route path="/ebooks/:id" element={<EbookDetailPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/" element={<AIToolsDirectoryPage />} />
        
      </Routes>
    </Router>
  );
};

export default AppRoutes;