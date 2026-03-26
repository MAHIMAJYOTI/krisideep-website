import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  FormControlLabel,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Language as LanguageIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Agriculture as AgricultureIcon,
  CalendarToday as CalendarIcon,
  Badge as BadgeIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { authService } from '../services/AuthService';

const ProfilePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { mode, toggleTheme } = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  
  const currentUser = authService.getCurrentUser();

  const [profileData, setProfileData] = useState({
    name: currentUser?.displayName || 'Demo User',
    phone: currentUser?.phoneNumber || '+91 9876543210',
    email: 'demo@krisideep.com',
    location: 'Punjab, India',
    joinDate: 'January 2024',
    farmingExperience: '5+ years',
    crops: ['Rice', 'Wheat', 'Maize'],
    language: i18n.language,
    notifications: true,
    darkMode: mode === 'dark',
  });

  const handleEdit = (field: string, value: string) => {
    setEditField(field);
    setEditValue(value);
    setEditDialogOpen(true);
  };

  const handleSave = () => {
    setProfileData(prev => ({
      ...prev,
      [editField]: editValue,
    }));
    setEditDialogOpen(false);
  };

  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    setProfileData(prev => ({
      ...prev,
      language: newLanguage,
    }));
  };

  const handleLogout = () => {
    authService.signOut();
    window.location.href = '/login';
  };

  const profileStats = [
    { label: t('crops_analyzed'), value: '150+', icon: <AgricultureIcon /> },
    { label: t('diseases_detected'), value: '25+', icon: <AgricultureIcon /> },
    { label: t('recommendations_given'), value: '50+', icon: <AgricultureIcon /> },
    { label: t('experience'), value: profileData.farmingExperience, icon: <CalendarIcon /> },
  ];

  const settingsItems = [
    {
      title: t('language_selection'),
      subtitle: profileData.language === 'en' ? 'English' : profileData.language === 'hi' ? 'हिंदी' : 'தமிழ்',
      icon: <LanguageIcon />,
      action: () => {
        const languages = ['en', 'hi', 'ta'];
        const currentIndex = languages.indexOf(profileData.language);
        const nextLanguage = languages[(currentIndex + 1) % languages.length];
        handleLanguageChange(nextLanguage);
      },
    },
    {
      title: t('dark_mode'),
      subtitle: mode === 'dark' ? t('enabled') : t('disabled'),
      icon: mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />,
      action: toggleTheme,
      isSwitch: true,
    },
    {
      title: t('notifications'),
      subtitle: profileData.notifications ? t('enabled') : t('disabled'),
      icon: <NotificationsIcon />,
      action: () => setProfileData(prev => ({ ...prev, notifications: !prev.notifications })),
      isSwitch: true,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        {t('profile')}
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ textAlign: 'center', p: 3 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.main',
                fontSize: '3rem',
              }}
            >
              {profileData.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
              {profileData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t('member_since')} {profileData.joinDate}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setEditMode(!editMode)}
              sx={{ mb: 2 }}
            >
              {editMode ? t('cancel') : t('edit_profile')}
            </Button>
            
            {/* Crop Tags */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                {t('primary_crops')}:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {profileData.crops.map((crop, index) => (
                  <Chip
                    key={index}
                    label={crop}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Profile Stats */}
        <Grid item xs={12} md={8}>
          <Card elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
              {t('farming_statistics')}
            </Typography>
            <Grid container spacing={2}>
              {profileStats.map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      backgroundColor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ color: 'primary.main', mb: 1 }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h6" component="div" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        {/* Profile Information */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                {t('personal_information')}
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={t('name')}
                    secondary={profileData.name}
                  />
                  {editMode && (
                    <IconButton
                      size="small"
                      onClick={() => handleEdit('name', profileData.name)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={t('phone_number')}
                    secondary={profileData.phone}
                  />
                  {editMode && (
                    <IconButton
                      size="small"
                      onClick={() => handleEdit('phone', profileData.phone)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={t('email')}
                    secondary={profileData.email}
                  />
                  {editMode && (
                    <IconButton
                      size="small"
                      onClick={() => handleEdit('email', profileData.email)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={t('location')}
                    secondary={profileData.location}
                  />
                  {editMode && (
                    <IconButton
                      size="small"
                      onClick={() => handleEdit('location', profileData.location)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <BadgeIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={t('farming_experience')}
                    secondary={profileData.farmingExperience}
                  />
                  {editMode && (
                    <IconButton
                      size="small"
                      onClick={() => handleEdit('farmingExperience', profileData.farmingExperience)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Settings */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                {t('settings')}
              </Typography>
              <List>
                {settingsItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        secondary={item.subtitle}
                      />
                      {item.isSwitch ? (
                        <Switch
                          checked={
                            item.title === t('dark_mode') 
                              ? mode === 'dark'
                              : item.title === t('notifications')
                              ? profileData.notifications
                              : false
                          }
                          onChange={item.action}
                        />
                      ) : (
                        <IconButton onClick={item.action}>
                          <EditIcon />
                        </IconButton>
                      )}
                    </ListItem>
                    {index < settingsItems.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                {t('account_actions')}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<HelpIcon />}
                    onClick={() => window.location.href = '/knowledge'}
                  >
                    {t('help_support')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<SecurityIcon />}
                    onClick={() => console.log('Privacy settings')}
                  >
                    {t('privacy_security')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<NotificationsIcon />}
                    onClick={() => console.log('Notification settings')}
                  >
                    {t('notification_settings')}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                  >
                    {t('logout')}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('edit')} {t(editField)}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t(editField)}
            fullWidth
            variant="outlined"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} startIcon={<CancelIcon />}>
            {t('cancel')}
          </Button>
          <Button onClick={handleSave} variant="contained" startIcon={<SaveIcon />}>
            {t('save')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;
