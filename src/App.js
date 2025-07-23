import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AuthPage from './components/AuthPage';  // Your login/register wrapper
import Dashboard from './components/Dashboard'; // You’ll create this
import './App.css';

const AppLayout = () => {
  const location = useLocation();
  const hideHeader = location.pathname === '/AuthPage';
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <>
      {!hideHeader && <Header toggleSidebar={toggleSidebar} />}
      {!hideHeader && <Sidebar isOpen={isSidebarOpen} />}
      <div style={{ marginTop: '60px', marginLeft: isSidebarOpen ? '220px' : '0', transition: 'margin-left 0.3s' }}>
        <Routes>
          <Route path="/AuthPage" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other routes here */}
          <Route path="*" element={<Navigate to="/AuthPage" />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}


export default App;
