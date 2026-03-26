import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  ShowChart as ShowChartIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  TrendingDown as TrendingDownIcon,
  Agriculture as AgricultureIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const AnalyticsDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Dummy analytics data
  const analyticsData = {
    yieldPrediction: { value: 85, unit: '%', trend: 'up', change: '+12%' },
    profitMargin: { value: 23, unit: '%', trend: 'up', change: '+5%' },
    efficiency: { value: 78, unit: '%', trend: 'up', change: '+3%' },
    sustainability: { value: 92, unit: '%', trend: 'up', change: '+8%' },
  };

  const predictions = [
    { id: 1, crop: 'Rice', predictedYield: '4.2 tons/acre', confidence: 87, status: 'excellent' },
    { id: 2, crop: 'Wheat', predictedYield: '3.8 tons/acre', confidence: 82, status: 'good' },
    { id: 3, crop: 'Corn', predictedYield: '5.1 tons/acre', confidence: 91, status: 'excellent' },
    { id: 4, crop: 'Soybean', predictedYield: '2.9 tons/acre', confidence: 76, status: 'good' },
  ];

  const recommendations = [
    { id: 1, type: 'irrigation', title: 'Optimize Irrigation Schedule', description: 'Reduce water usage by 15% with smart scheduling', priority: 'high' },
    { id: 2, type: 'fertilizer', title: 'Adjust Fertilizer Application', description: 'Increase nitrogen levels for better yield', priority: 'medium' },
    { id: 3, type: 'pest', title: 'Pest Control Alert', description: 'Monitor for aphids in the next 2 weeks', priority: 'high' },
    { id: 4, type: 'harvest', title: 'Optimal Harvest Window', description: 'Best harvest time: 15-20 days from now', priority: 'low' },
  ];

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <TrendingUpIcon color="success" /> : <TrendingDownIcon color="error" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
            {t('analytics_dashboard')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            AI-powered insights and analytics for your farming operations
          </Typography>
        </Box>
        <Button variant="outlined" startIcon={<RefreshIcon />} onClick={handleRefresh}>
          Refresh Data
        </Button>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(analyticsData).map(([key, data]) => (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Typography>
                  {getTrendIcon(data.trend)}
                </Box>
                <Typography variant="h3" fontWeight="bold" color="primary">
                  {data.value}{data.unit}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.change} from last month
                </Typography>
                <LinearProgress variant="determinate" value={data.value} sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Yield Predictions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Yield Predictions
              </Typography>
              <List>
                {predictions.map((prediction) => (
                  <ListItem key={prediction.id}>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <AgricultureIcon />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={prediction.crop}
                      secondary={
                        <Box>
                          <Typography variant="body2">
                            Predicted: {prediction.predictedYield}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              Confidence: {prediction.confidence}%
                            </Typography>
                            <Chip 
                              label={prediction.status} 
                              size="small" 
                              color={prediction.confidence > 85 ? 'success' : 'warning'}
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* AI Recommendations */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                AI Recommendations
              </Typography>
              <List>
                {recommendations.map((rec, index) => (
                  <React.Fragment key={rec.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: `${getPriorityColor(rec.priority)}.main` }}>
                          {rec.type === 'irrigation' && <ShowChartIcon />}
                          {rec.type === 'fertilizer' && <AssessmentIcon />}
                          {rec.type === 'pest' && <WarningIcon />}
                          {rec.type === 'harvest' && <CheckCircleIcon />}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={rec.title}
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              {rec.description}
                            </Typography>
                            <Chip 
                              label={rec.priority} 
                              size="small" 
                              color={getPriorityColor(rec.priority) as any}
                              sx={{ mt: 1 }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recommendations.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Overview */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Performance Overview
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="success.main" fontWeight="bold">
                  96.5%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Prediction Accuracy
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main" fontWeight="bold">
                  1,247
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Data Points Analyzed
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="info.main" fontWeight="bold">
                  24/7
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  AI Monitoring
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Last Updated */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </Typography>
      </Box>
    </Container>
  );
};

export default AnalyticsDashboardPage;
