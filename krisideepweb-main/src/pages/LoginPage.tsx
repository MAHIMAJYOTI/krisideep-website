import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  Agriculture as AgricultureIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/AuthService';

const LoginPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState(i18n.language);

  // Check if user is already logged in
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLanguageChange = (event: any) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const verificationId = await authService.sendOTP(phoneNumber);
      setVerificationId(verificationId);
      setIsOtpSent(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = await authService.verifyOTP(verificationId, otp);
      if (user) {
        navigate('/home');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setOtp('');
    setError('');
    await handleSendOTP();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <AgricultureIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
              {t('app_name')}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {t('app_tagline')}
            </Typography>
          </Box>

          {/* Language Selection */}
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel>{t('language_selection')}</InputLabel>
              <Select
                value={language}
                label={t('language_selection')}
                onChange={handleLanguageChange}
                startAdornment={<LanguageIcon sx={{ mr: 1, color: 'text.secondary' }} />}
              >
                <MenuItem value="en">{t('english')}</MenuItem>
                <MenuItem value="hi">{t('hindi')}</MenuItem>
                <MenuItem value="ta">{t('tamil')}</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Phone Number Input */}
          {!isOtpSent ? (
            <Box>
              <TextField
                fullWidth
                label={t('phone_number')}
                value={phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                placeholder="+91 9876543210"
                InputProps={{
                  startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{ mb: 3 }}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSendOTP}
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? <CircularProgress size={24} /> : t('send_otp')}
              </Button>
            </Box>
          ) : (
            /* OTP Input */
            <Box>
              <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
                {t('enter_otp')} sent to {phoneNumber}
              </Typography>
              <TextField
                fullWidth
                label={t('enter_otp')}
                value={otp}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                placeholder="123456"
                sx={{ mb: 3 }}
                inputProps={{ maxLength: 6 }}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleResendOTP}
                    disabled={loading}
                  >
                    {t('resend_otp')}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleVerifyOTP}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : t('verify')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Demo Info */}
          <Card sx={{ mt: 3, bgcolor: 'info.light', color: 'info.contrastText' }}>
            <CardContent>
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                <strong>Demo Mode:</strong> Use OTP <strong>123456</strong> to login
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
