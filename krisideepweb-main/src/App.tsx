import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Import i18n configuration
import './utils/i18n';

// Import theme provider
import { ThemeProvider } from './contexts/ThemeContext';

// Import services
import { authService } from './services/AuthService';

// Import components
import LoginPage from './pages/LoginPage';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import CropAdvicePage from './pages/CropAdvicePage';
import DiseaseDetectionPage from './pages/DiseaseDetectionPage';
import KnowledgePage from './pages/KnowledgePage';
import ContactPage from './pages/ContactPage';
import IoTDashboardPage from './pages/IoTDashboardPage';
import AnalyticsDashboardPage from './pages/AnalyticsDashboardPage';
import GovernmentSchemesPage from './pages/GovernmentSchemesPage';
import FinancialAdvisoryPage from './pages/FinancialAdvisoryPage';
import FarmerCommunityPage from './pages/FarmerCommunityPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  useEffect(() => {
    // Initialize authentication state from localStorage
    authService.initializeAuth();
  }, []);

  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/home" replace />} />
              <Route path="home" element={<HomePage />} />
              <Route path="crop-advice" element={<CropAdvicePage />} />
              <Route path="disease-detection" element={<DiseaseDetectionPage />} />
              <Route path="knowledge" element={<KnowledgePage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="iot-dashboard" element={<IoTDashboardPage />} />
              <Route path="analytics" element={<AnalyticsDashboardPage />} />
              <Route path="government-schemes" element={<GovernmentSchemesPage />} />
              <Route path="financial-advisory" element={<FinancialAdvisoryPage />} />
              <Route path="farmer-community" element={<FarmerCommunityPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;