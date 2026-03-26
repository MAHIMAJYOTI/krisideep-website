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
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  Tabs,
  Tab,
} from '@mui/material';
import {
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  Assessment as AssessmentIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Add as AddIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const FinancialAdvisoryPage: React.FC = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);

  // Dummy financial data
  const financialOverview = {
    totalAssets: { value: 2500000, currency: '₹', trend: 'up', change: '+8.5%' },
    totalLiabilities: { value: 800000, currency: '₹', trend: 'down', change: '-2.1%' },
    netWorth: { value: 1700000, currency: '₹', trend: 'up', change: '+12.3%' },
    monthlyIncome: { value: 45000, currency: '₹', trend: 'up', change: '+5.2%' },
  };

  const loanApplications = [
    {
      id: 1,
      bank: 'State Bank of India',
      amount: '₹5,00,000',
      purpose: 'Equipment Purchase',
      status: 'approved',
      interestRate: '8.5%',
      tenure: '5 years',
      appliedDate: '2024-01-15',
    },
    {
      id: 2,
      bank: 'HDFC Bank',
      amount: '₹3,00,000',
      purpose: 'Working Capital',
      status: 'pending',
      interestRate: '9.2%',
      tenure: '3 years',
      appliedDate: '2024-02-20',
    },
    {
      id: 3,
      bank: 'ICICI Bank',
      amount: '₹2,00,000',
      purpose: 'Crop Insurance',
      status: 'under_review',
      interestRate: '7.8%',
      tenure: '2 years',
      appliedDate: '2024-03-10',
    },
  ];

  const financialGoals = [
    {
      id: 1,
      title: 'Farm Equipment Upgrade',
      targetAmount: '₹10,00,000',
      currentAmount: '₹6,50,000',
      targetDate: '2024-12-31',
      progress: 65,
    },
    {
      id: 2,
      title: 'Emergency Fund',
      targetAmount: '₹2,00,000',
      currentAmount: '₹1,20,000',
      targetDate: '2024-06-30',
      progress: 60,
    },
    {
      id: 3,
      title: 'Children Education',
      targetAmount: '₹5,00,000',
      currentAmount: '₹1,80,000',
      targetDate: '2025-12-31',
      progress: 36,
    },
  ];

  const recommendations = [
    {
      id: 1,
      type: 'investment',
      title: 'Diversify Investment Portfolio',
      description: 'Consider investing in government bonds and mutual funds for better returns',
      priority: 'high',
    },
    {
      id: 2,
      type: 'insurance',
      title: 'Increase Life Insurance Coverage',
      description: 'Current coverage may not be sufficient for family needs',
      priority: 'medium',
    },
    {
      id: 3,
      type: 'savings',
      title: 'Optimize Savings Rate',
      description: 'Increase monthly savings by 15% to meet financial goals faster',
      priority: 'high',
    },
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
      case 'pending': return <WarningIcon />;
      case 'under_review': return <InfoIcon />;
      case 'rejected': return <WarningIcon />;
      default: return <InfoIcon />;
    }
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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
          {t('financial_advisory')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Expert financial guidance and planning for farmers
        </Typography>
      </Box>

      {/* Financial Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(financialOverview).map(([key, data]) => (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Typography>
                  {getTrendIcon(data.trend)}
                </Box>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {data.currency}{data.value.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.change} from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Financial Health" />
          <Tab label="Loan Applications" />
          <Tab label="Financial Goals" />
          <Tab label="Recommendations" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Financial Health Score
                </Typography>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h2" color="success.main" fontWeight="bold">
                    85/100
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Excellent financial health
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={85} color="success" sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  Your financial health is in excellent condition. Keep up the good work!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Upcoming Payments
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'warning.main' }}>
                        <AttachMoneyIcon />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary="Equipment Loan EMI"
                      secondary="Due: 15th March 2024"
                    />
                    <Typography variant="h6" color="primary">
                      ₹12,500
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'info.main' }}>
                        <AccountBalanceIcon />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary="Insurance Premium"
                      secondary="Due: 20th March 2024"
                    />
                    <Typography variant="h6" color="primary">
                      ₹8,000
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Loan Applications
              </Typography>
              <Button variant="contained" startIcon={<AddIcon />}>
                Apply for Loan
              </Button>
            </Box>
            <List>
              {loanApplications.map((loan, index) => (
                <React.Fragment key={loan.id}>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: `${getStatusColor(loan.status)}.main` }}>
                        {getStatusIcon(loan.status)}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={loan.bank}
                      secondary={
                        <Box>
                          <Typography variant="body2">
                            {loan.purpose} | {loan.amount} | {loan.interestRate} | {loan.tenure}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Chip 
                              label={loan.status.replace('_', ' ')} 
                              color={getStatusColor(loan.status) as any}
                              size="small"
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                              Applied: {loan.appliedDate}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                    <Button variant="outlined" size="small">
                      View Details
                    </Button>
                  </ListItem>
                  {index < loanApplications.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          {financialGoals.map((goal) => (
            <Grid item xs={12} md={4} key={goal.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {goal.title}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      {goal.currentAmount} / {goal.targetAmount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Target: {goal.targetDate}
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={goal.progress} sx={{ mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    {goal.progress}% completed
                  </Typography>
                  <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                    Add Funds
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 3 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Financial Recommendations
            </Typography>
            <List>
              {recommendations.map((rec, index) => (
                <React.Fragment key={rec.id}>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: `${getPriorityColor(rec.priority)}.main` }}>
                        {rec.type === 'investment' && <TrendingUpIcon />}
                        {rec.type === 'insurance' && <AssessmentIcon />}
                        {rec.type === 'savings' && <AttachMoneyIcon />}
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
                    <Button variant="outlined" size="small">
                      Learn More
                    </Button>
                  </ListItem>
                  {index < recommendations.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default FinancialAdvisoryPage;
