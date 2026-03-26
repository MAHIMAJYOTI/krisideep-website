import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import {
  Sensors as SensorsIcon,
  TrendingUp as TrendingUpIcon,
  Water as WaterIcon,
  Nature as EcoIcon,
  Refresh as RefreshIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const IoTDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Dummy sensor data
  const sensorData = {
    soilMoisture: { value: 65, unit: '%', status: 'good', color: 'success' },
    temperature: { value: 28, unit: '°C', status: 'good', color: 'success' },
    humidity: { value: 72, unit: '%', status: 'good', color: 'success' },
    phLevel: { value: 6.8, unit: 'pH', status: 'good', color: 'success' },
    nitrogen: { value: 45, unit: 'ppm', status: 'warning', color: 'warning' },
    phosphorus: { value: 32, unit: 'ppm', status: 'good', color: 'success' },
    potassium: { value: 28, unit: 'ppm', status: 'warning', color: 'warning' },
  };

  const alerts = [
    { id: 1, type: 'warning', message: 'Nitrogen levels are below optimal range', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'Irrigation system scheduled for tomorrow at 6 AM', time: '4 hours ago' },
    { id: 3, type: 'success', message: 'Soil moisture levels are optimal', time: '6 hours ago' },
  ];

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircleIcon color="success" />;
      case 'warning': return <WarningIcon color="warning" />;
      case 'error': return <ErrorIcon color="error" />;
      default: return <CheckCircleIcon color="success" />;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
            {t('iot_dashboard')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time monitoring of your farm sensors and IoT devices
          </Typography>
        </Box>
        <IconButton onClick={handleRefresh} color="primary">
          <RefreshIcon />
        </IconButton>
      </Box>

      {/* Status Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SensorsIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Active Sensors</Typography>
              </Box>
              <Typography variant="h3" color="primary" fontWeight="bold">12</Typography>
              <Typography variant="body2" color="text.secondary">All systems operational</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">System Health</Typography>
              </Box>
              <Typography variant="h3" color="success.main" fontWeight="bold">98%</Typography>
              <LinearProgress variant="determinate" value={98} sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WarningIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">Active Alerts</Typography>
              </Box>
              <Typography variant="h3" color="warning.main" fontWeight="bold">2</Typography>
              <Typography variant="body2" color="text.secondary">Requires attention</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Data Points</Typography>
              </Box>
              <Typography variant="h3" color="info.main" fontWeight="bold">1.2K</Typography>
              <Typography variant="body2" color="text.secondary">Last 24 hours</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Sensor Data Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(sensorData).map(([key, data]) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Typography>
                  {getStatusIcon(data.status)}
                </Box>
                <Typography variant="h4" fontWeight="bold" color={`${data.color}.main`}>
                  {data.value} {data.unit}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={data.value} 
                  color={data.color as any}
                  sx={{ mt: 1 }} 
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Alerts Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Recent Alerts
              </Typography>
              <List>
                {alerts.map((alert) => (
                  <ListItem key={alert.id}>
                    <ListItemIcon>
                      {alert.type === 'warning' && <WarningIcon color="warning" />}
                      {alert.type === 'info' && <CheckCircleIcon color="info" />}
                      {alert.type === 'success' && <CheckCircleIcon color="success" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={alert.message}
                      secondary={alert.time}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="contained" startIcon={<WaterIcon />}>
                  Schedule Irrigation
                </Button>
                <Button variant="outlined" startIcon={<TrendingUpIcon />}>
                  Generate Report
                </Button>
                <Button variant="outlined" startIcon={<EcoIcon />}>
                  View Recommendations
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Last Updated */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </Typography>
      </Box>
    </Container>
  );
};

export default IoTDashboardPage;
