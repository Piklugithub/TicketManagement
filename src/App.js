import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation,useNavigate,} from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AuthPage from './components/AuthPage';  // Your login/register wrapper
import Dashboard from './components/Dashboard';
import CreateTicket from './components/CreateTicket'; // Your ticket creation component
import { ToastProvider } from './components/ToastContext'; // You’ll create this
import './App.css';

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideHeader = location.pathname === '/AuthPage';
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const handleSidebarClick = (e) => {
    const clickedText = e.target.textContent?.trim();

    switch (clickedText) {
      case 'Dashboard':
        navigate('/dashboard');
        break;
      case 'Raise Ticket':
        navigate('/create-ticket');
        break;
      case 'Worklist':
        navigate('/worklist');
        break;
      case 'My Requests':
        navigate('/my-requests');
        break;
      case 'Settings':
        navigate('/settings');
        break;
      case 'Logout':
        navigate('/logout');
        break;
      default:
        break;
    }
  };
  return (
    <>
      {!hideHeader && <Header toggleSidebar={toggleSidebar} />}
       {!hideHeader && (
        <div onClick={handleSidebarClick}>
          <Sidebar isOpen={isSidebarOpen} />
        </div>
      )}
      <div style={{ marginTop: hideHeader ? '0' : '60px', marginLeft: isSidebarOpen ? '220px' : '0', transition: 'margin-left 0.3s' }}>
        <Routes>
          <Route path="/AuthPage" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-ticket" element={<CreateTicket />} />
          {/* Add other routes here */}
          <Route path="*" element={<Navigate to="/AuthPage" />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <ToastProvider>
      <Router>
        <AppLayout />
      </Router>
    </ToastProvider>
  );
}


export default App;
