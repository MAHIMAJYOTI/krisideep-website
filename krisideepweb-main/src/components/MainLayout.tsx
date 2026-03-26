import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  Home as HomeIcon,
  Agriculture as AgricultureIcon,
  CameraAlt as CameraIcon,
  Book as BookIcon,
  ContactSupport as ContactIcon,
  Menu as MenuIcon,
  Brightness6 as ThemeIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Sensors as SensorsIcon,
  Analytics as AnalyticsIcon,
  AccountBalance as AccountBalanceIcon,
  AttachMoney as AttachMoneyIcon,
  Forum as ForumIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/AuthService';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

const MainLayout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { mode, toggleTheme } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  // Add logo import
  const logoUrl = '/krisi_deep_logo.png';

  // Navigation items
  const navigationItems = [
    { path: '/home', label: t('home'), icon: <HomeIcon /> },
    { path: '/crop-advice', label: t('get_crop_advice'), icon: <AgricultureIcon /> },
    { path: '/disease-detection', label: t('crop_disease_detection'), icon: <CameraIcon /> },
    { path: '/iot-dashboard', label: t('iot_dashboard'), icon: <SensorsIcon /> },
    { path: '/analytics', label: t('analytics_dashboard'), icon: <AnalyticsIcon /> },
    { path: '/government-schemes', label: t('government_schemes'), icon: <AccountBalanceIcon /> },
    { path: '/financial-advisory', label: t('financial_advisory'), icon: <AttachMoneyIcon /> },
    { path: '/farmer-community', label: t('farmer_community'), icon: <ForumIcon /> },
    { path: '/knowledge', label: t('knowledge_faqs'), icon: <BookIcon /> },
    { path: '/contact', label: t('contact_support'), icon: <ContactIcon /> },
  ];

  // Get current navigation index
  const getCurrentNavIndex = () => {
    const currentPath = location.pathname;
    const index = navigationItems.findIndex(item => item.path === currentPath);
    return index >= 0 ? index : 0;
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
      setCurrentUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
    handleProfileMenuClose();
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
    setSidebarOpen(false);
  };

  // Check authentication
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const mobileDrawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, textAlign: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
          <Avatar
            src={logoUrl}
            sx={{ width: 40, height: 40, mr: 1 }}
            alt="Krisi Deep Logo"
          />
          <Typography variant="h6" color="primary" fontWeight="bold">
            {t('app_name')}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Smart Agriculture Platform
        </Typography>
      </Box>
      <List>
        {navigationItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const sidebarDrawer = (
    <Box sx={{ width: 280 }}>
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Avatar
            src={logoUrl}
            sx={{ width: 50, height: 50, mr: 2 }}
            alt="Krisi Deep Logo"
          />
          <Typography variant="h5" color="primary" fontWeight="bold">
            {t('app_name')}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Smart Agriculture Platform
        </Typography>
      </Box>
      <List sx={{ p: 1 }}>
        {navigationItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          {/* Hamburger Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleSidebarToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Centered Logo and App Name - Bigger and Scrollable */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateX(-50%) scale(1.05)',
                transition: 'transform 0.2s ease',
              },
            }}
          >
            <Avatar
              src={logoUrl}
              sx={{ width: 40, height: 40, mr: 1.5 }}
              alt="Krisi Deep Logo"
            />
            <Typography variant="h5" component="div" fontWeight="bold">
              {t('app_name')}
            </Typography>
          </Box>
          
          {/* Right side icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 1 }}>
              {mode === 'dark' ? <ThemeIcon /> : <ThemeIcon />}
            </IconButton>
          
            <IconButton
              color="inherit"
              onClick={handleProfileMenuOpen}
              aria-controls={Boolean(anchorEl) ? 'profile-menu' : undefined}
              aria-haspopup="true"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                {currentUser?.displayName?.charAt(0) || 'U'}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => { handleNavigation('/profile'); handleProfileMenuClose(); }}>
          <ListItemIcon>
            <AccountIcon fontSize="small" />
          </ListItemIcon>
          {t('profile')}
        </MenuItem>
        <MenuItem onClick={() => { 
          const languages = ['en', 'hi', 'ta'];
          const currentIndex = languages.indexOf(i18n.language);
          const nextLanguage = languages[(currentIndex + 1) % languages.length];
          i18n.changeLanguage(nextLanguage);
          handleProfileMenuClose();
        }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          {t('language_selection')} ({i18n.language === 'en' ? 'EN' : i18n.language === 'hi' ? 'हिं' : 'த'})
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          {t('logout')}
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {mobileDrawer}
      </Drawer>

      {/* Desktop Sidebar Drawer */}
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={handleSidebarToggle}
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            backgroundColor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        {sidebarDrawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px', // App bar height
          pb: { xs: 7, md: 3 }, // Bottom navigation height on mobile
        }}
      >
        <Outlet />
      </Box>

      {/* Bottom Navigation for Mobile */}
      {isMobile && (
        <BottomNavigation
          value={getCurrentNavIndex()}
          onChange={(event: React.SyntheticEvent, newValue: number) => {
            handleNavigation(navigationItems[newValue].path);
          }}
          showLabels
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.appBar,
          }}
        >
          {navigationItems.map((item, index) => (
            <BottomNavigationAction
              key={index}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </BottomNavigation>
      )}
    </Box>
  );
};

export default MainLayout;
