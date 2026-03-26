import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Fade,
  Grow,
} from '@mui/material';
import {
  Agriculture as EcoIcon,
  CameraAlt as CameraIcon,
  Sensors as SensorsIcon,
  Analytics as AnalyticsIcon,
  AccountBalance as AccountBalanceIcon,
  AttachMoney as AttachMoneyIcon,
  Forum as ForumIcon,
  Help as HelpIcon,
  TrendingUp as TrendingUpIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  color, 
  delay, 
  onClick 
}) => {
  return (
    <Grow in timeout={800 + delay}>
      <Card
        sx={{
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          borderTop: `4px solid ${color}`,
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
          },
        }}
        onClick={onClick}
      >
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              mx: 'auto',
              mb: 2,
              bgcolor: `${color}20`,
              color: color,
            }}
          >
            {icon}
          </Avatar>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grow>
  );
};

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mode } = useCustomTheme();

  const [stats] = useState({
    farmersHelped: '75K+',
    accuracyRate: '96.5%',
    supportAvailable: '24/7',
    cropsAnalyzed: '500+',
  });

  const features = [
    {
      icon: <EcoIcon />,
      title: t('get_crop_advice'),
      description: t('crop_advice_description'),
      color: '#4CAF50',
      path: '/crop-advice',
    },
    {
      icon: <CameraIcon />,
      title: t('crop_disease_detection'),
      description: t('disease_detection_description'),
      color: '#FF9800',
      path: '/disease-detection',
    },
    {
      icon: <SensorsIcon />,
      title: t('iot_dashboard'),
      description: t('iot_dashboard_description'),
      color: '#2196F3',
      path: '/iot-dashboard',
    },
    {
      icon: <AnalyticsIcon />,
      title: t('analytics_dashboard'),
      description: t('analytics_dashboard_description'),
      color: '#9C27B0',
      path: '/analytics',
    },
    {
      icon: <AccountBalanceIcon />,
      title: t('government_schemes'),
      description: t('government_schemes_description'),
      color: '#F44336',
      path: '/government-schemes',
    },
    {
      icon: <AttachMoneyIcon />,
      title: t('financial_advisory'),
      description: t('financial_advisory_description'),
      color: '#00BCD4',
      path: '/financial-advisory',
    },
    {
      icon: <ForumIcon />,
      title: t('farmer_community'),
      description: t('farmer_community_description'),
      color: '#795548',
      path: '/farmer-community',
    },
    {
      icon: <HelpIcon />,
      title: t('knowledge_faqs'),
      description: t('knowledge_faqs_description'),
      color: '#607D8B',
      path: '/knowledge',
    },
  ];

  const handleFeatureClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: mode === 'dark' 
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 4,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        {/* Hero Section */}
        <Fade in timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              component="h1"
              fontWeight="bold"
              sx={{
                background: mode === 'dark'
                  ? 'linear-gradient(45deg, #4CAF50, #81C784)'
                  : 'linear-gradient(45deg, #2E7D32, #4CAF50)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              {t('welcome')}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
            >
              {t('home_description')}
            </Typography>
          </Box>
        </Fade>

        {/* Features Grid */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            textAlign="center"
            sx={{ mb: 4 }}
          >
            {t('our_features')}
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  color={feature.color}
                  delay={index * 100}
                  onClick={() => handleFeatureClick(feature.path)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats Section */}
        <Fade in timeout={1500}>
          <Paper
            sx={{
              p: 4,
              mb: 6,
              background: mode === 'dark'
                ? 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              fontWeight="bold"
              textAlign="center"
              sx={{ mb: 4 }}
            >
              {t('our_impact')}
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'primary.main',
                    }}
                  >
                    <TrendingUpIcon />
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {stats.farmersHelped}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('farmers_helped')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'success.main',
                    }}
                  >
                    <SpeedIcon />
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    {stats.accuracyRate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('accuracy_rate')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'info.main',
                    }}
                  >
                    <SecurityIcon />
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold" color="info.main">
                    {stats.supportAvailable}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('support_available')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'warning.main',
                    }}
                  >
                    <StarIcon />
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold" color="warning.main">
                    {stats.cropsAnalyzed}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('crops_analyzed')}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Fade>

        {/* Call to Action */}
        <Fade in timeout={2000}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              component="h2"
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              {t('ready_to_start')}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
            >
              {t('get_started_description')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/crop-advice')}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                }}
              >
                {t('get_started_now')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/contact')}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                }}
              >
                {t('contact_support')}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default HomePage;