import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  Badge,
  Tabs,
  Tab,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  AttachMoney as AttachMoneyIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Error as ErrorIcon,
  Download as DownloadIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const GovernmentSchemesPage: React.FC = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);

  // Dummy schemes data
  const availableSchemes = [
    {
      id: 1,
      name: 'PM-KISAN Scheme',
      description: 'Direct income support of ₹6,000 per year to farmer families',
      amount: '₹6,000/year',
      category: 'Income Support',
      status: 'active',
      deadline: '31 Dec 2024',
      eligibility: 'All farmer families',
    },
    {
      id: 2,
      name: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance scheme for farmers against crop loss',
      amount: 'Up to ₹2,00,000',
      category: 'Insurance',
      status: 'active',
      deadline: '30 Nov 2024',
      eligibility: 'All farmers',
    },
    {
      id: 3,
      name: 'Kisan Credit Card',
      description: 'Credit facility for farmers at subsidized interest rates',
      amount: 'Up to ₹3,00,000',
      category: 'Credit',
      status: 'active',
      deadline: 'Ongoing',
      eligibility: 'Farmers with land',
    },
    {
      id: 4,
      name: 'Soil Health Card Scheme',
      description: 'Free soil testing and recommendations for farmers',
      amount: 'Free',
      category: 'Support',
      status: 'active',
      deadline: 'Ongoing',
      eligibility: 'All farmers',
    },
  ];

  const myApplications = [
    {
      id: 1,
      schemeName: 'PM-KISAN Scheme',
      applicationDate: '2024-01-15',
      status: 'approved',
      amount: '₹6,000',
      nextPayment: '2024-04-01',
    },
    {
      id: 2,
      schemeName: 'Pradhan Mantri Fasal Bima Yojana',
      applicationDate: '2024-02-20',
      status: 'pending',
      amount: '₹2,00,000',
      nextPayment: 'N/A',
    },
    {
      id: 3,
      schemeName: 'Kisan Credit Card',
      applicationDate: '2024-03-10',
      status: 'under_review',
      amount: '₹1,50,000',
      nextPayment: 'N/A',
    },
  ];

  const notifications = [
    { id: 1, message: 'PM-KISAN installment credited to your account', time: '2 hours ago', type: 'success' },
    { id: 2, message: 'New scheme: Soil Health Card available for application', time: '1 day ago', type: 'info' },
    { id: 3, message: 'Your KCC application is under review', time: '3 days ago', type: 'warning' },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'under_review': return 'info';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircleIcon />;
      case 'pending': return <PendingIcon />;
      case 'under_review': return <InfoIcon />;
      case 'rejected': return <ErrorIcon />;
      default: return <InfoIcon />;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
          {t('government_schemes')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Access government benefits, subsidies, and schemes for farmers
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalanceIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Available Schemes</Typography>
              </Box>
              <Typography variant="h3" color="primary" fontWeight="bold">24</Typography>
              <Typography variant="body2" color="text.secondary">Active schemes</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">My Applications</Typography>
              </Box>
              <Typography variant="h3" color="success.main" fontWeight="bold">3</Typography>
              <Typography variant="body2" color="text.secondary">Total applications</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoneyIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Benefits</Typography>
              </Box>
              <Typography variant="h3" color="info.main" fontWeight="bold">₹12K</Typography>
              <Typography variant="body2" color="text.secondary">Received this year</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Badge badgeContent={3} color="error">
                  <SupportIcon color="warning" sx={{ mr: 1 }} />
                </Badge>
                <Typography variant="h6">Notifications</Typography>
              </Box>
              <Typography variant="h3" color="warning.main" fontWeight="bold">3</Typography>
              <Typography variant="body2" color="text.secondary">New updates</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Available Schemes" />
          <Tab label="My Applications" />
          <Tab label="Notifications" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {availableSchemes.map((scheme) => (
            <Grid item xs={12} md={6} key={scheme.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {scheme.name}
                    </Typography>
                    <Chip label={scheme.category} color="primary" size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {scheme.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" color="success.main" fontWeight="bold">
                      {scheme.amount}
                    </Typography>
                    <Chip 
                      label={scheme.status} 
                      color={scheme.status === 'active' ? 'success' : 'default'} 
                      size="small" 
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Eligibility:</strong> {scheme.eligibility}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    <strong>Deadline:</strong> {scheme.deadline}
                  </Typography>
                  <Button variant="contained" fullWidth>
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              My Applications
            </Typography>
            <List>
              {myApplications.map((app, index) => (
                <React.Fragment key={app.id}>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: `${getStatusColor(app.status)}.main` }}>
                        {getStatusIcon(app.status)}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={app.schemeName}
                      secondary={
                        <Box>
                          <Typography variant="body2">
                            Applied: {app.applicationDate} | Amount: {app.amount}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Chip 
                              label={app.status.replace('_', ' ')} 
                              color={getStatusColor(app.status) as any}
                              size="small"
                            />
                            {app.nextPayment !== 'N/A' && (
                              <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                                Next payment: {app.nextPayment}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      }
                    />
                    <Button variant="outlined" size="small" startIcon={<DownloadIcon />}>
                      Download
                    </Button>
                  </ListItem>
                  {index < myApplications.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {tabValue === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Notifications
            </Typography>
            <List>
              {notifications.map((notification) => (
                <ListItem key={notification.id}>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: `${notification.type === 'success' ? 'success' : notification.type === 'warning' ? 'warning' : 'info'}.main` }}>
                      {notification.type === 'success' && <CheckCircleIcon />}
                      {notification.type === 'warning' && <PendingIcon />}
                      {notification.type === 'info' && <InfoIcon />}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={notification.message}
                    secondary={notification.time}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default GovernmentSchemesPage;
