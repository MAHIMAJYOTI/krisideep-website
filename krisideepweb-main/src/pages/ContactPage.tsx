import React from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  Support as SupportIcon,
  WhatsApp as WhatsAppIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();

  const contactInfo = [
    {
      title: '24/7 Helpline',
      titleHindi: '24/7 हेल्पलाइन',
      icon: <PhoneIcon />,
      details: ['+91 1800-123-4567', '+91 9876543210', '+91 9876543211'],
      color: 'primary',
    },
    {
      title: 'Email Support',
      titleHindi: 'ईमेल सहायता',
      icon: <EmailIcon />,
      details: ['support@krisideep.com', 'help@krisideep.com', 'info@krisideep.com'],
      color: 'secondary',
    },
    {
      title: 'WhatsApp Support',
      titleHindi: 'व्हाट्सऐप सहायता',
      icon: <WhatsAppIcon />,
      details: ['+91 9876543210', '+91 9876543211'],
      color: 'success',
    },
  ];

  const regionalContacts = [
    {
      region: 'North India',
      regionHindi: 'उत्तर भारत',
      contact: 'Dr. Rajesh Kumar',
      phone: '+91 9876543211',
      specialization: 'Rice & Wheat Expert',
      experience: '15+ years',
      location: 'Punjab, Haryana, UP',
    },
    {
      region: 'South India',
      regionHindi: 'दक्षिण भारत',
      contact: 'Dr. Priya Sharma',
      phone: '+91 9876543212',
      specialization: 'Cotton & Sugarcane Expert',
      experience: '12+ years',
      location: 'Tamil Nadu, Karnataka, AP',
    },
    {
      region: 'East India',
      regionHindi: 'पूर्वी भारत',
      contact: 'Dr. Amit Singh',
      phone: '+91 9876543213',
      specialization: 'Vegetable & Spice Expert',
      experience: '18+ years',
      location: 'West Bengal, Odisha, Bihar',
    },
    {
      region: 'West India',
      regionHindi: 'पश्चिम भारत',
      contact: 'Dr. Sunita Patel',
      phone: '+91 9876543214',
      specialization: 'Oilseeds & Pulses Expert',
      experience: '14+ years',
      location: 'Gujarat, Maharashtra, Rajasthan',
    },
    {
      region: 'Central India',
      regionHindi: 'मध्य भारत',
      contact: 'Dr. Vikram Mehta',
      phone: '+91 9876543215',
      specialization: 'Soybean & Maize Expert',
      experience: '16+ years',
      location: 'MP, Chhattisgarh, Jharkhand',
    },
    {
      region: 'Northeast India',
      regionHindi: 'पूर्वोत्तर भारत',
      contact: 'Dr. Anjali Das',
      phone: '+91 9876543216',
      specialization: 'Horticulture & Spices Expert',
      experience: '13+ years',
      location: 'Assam, Meghalaya, Manipur',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
          {t('contact_support')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Get expert help and support for all your farming needs.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
            {t('spoc')}
          </Typography>
          
          {contactInfo.map((contact, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: `${contact.color}.light`,
                      color: `${contact.color}.contrastText`,
                      mr: 2,
                    }}
                  >
                    {contact.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold">
                    {contact.title}
                  </Typography>
                </Box>
                
                <List dense>
                  {contact.details.map((detail, detailIndex) => (
                    <ListItem key={detailIndex} sx={{ py: 0 }}>
                      <ListItemText
                        primary={detail}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Regional Experts */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
            Regional Experts
          </Typography>
          
          {regionalContacts.map((expert, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {expert.region}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  ({expert.regionHindi})
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <SupportIcon sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
                  <Typography variant="body2" fontWeight="bold">
                    {expert.contact}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PhoneIcon sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    {expert.phone}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {expert.specialization}
                </Typography>
                
                <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
                  {t('experience')}: {expert.experience}
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  {t('covers')}: {expert.location}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>

      {/* Emergency Support */}
      <Paper elevation={2} sx={{ p: 3, mt: 4, bgcolor: 'error.light', color: 'error.contrastText' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SupportIcon sx={{ mr: 2, fontSize: 30 }} />
          <Typography variant="h5" fontWeight="bold">
            Emergency Support
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          For urgent farming emergencies, crop diseases, or pest outbreaks, contact our emergency helpline.
        </Typography>
        <Button
          variant="contained"
          color="error"
          size="large"
          startIcon={<PhoneIcon />}
          sx={{ color: 'white' }}
        >
          Call Emergency: +91 9876543210
        </Button>
      </Paper>

      {/* Office Hours */}
      <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ScheduleIcon sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h5" fontWeight="bold">
            Office Hours
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" fontWeight="bold">
              Monday - Friday:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              9:00 AM - 6:00 PM
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" fontWeight="bold">
              Saturday:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              9:00 AM - 2:00 PM
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ContactPage;
