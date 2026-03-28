import { API_BASE_URL } from '../config';
import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Agriculture as AgricultureIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { CropAdviceRequest, CropRecommendation } from '../models';

const CropAdvicePage: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    N: 90,
    P: 42,
    K: 43,
    temperature: 21,
    humidity: 80,
    soilPH: 6.5,
    rainfall: 200,
    soilMoisture: 50,
  });

  const [recommendation, setRecommendation] = useState<CropRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value);
    setFormData(prev => ({
      ...prev,
      [field]: isNaN(value) ? 0 : value,
    }));
  };

  const handleGetRecommendation = async () => {
    setLoading(true);
    setError('');
    setRecommendation(null);

    try {
      const response = await fetch(`${API_BASE_URL}/predict-crop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          N: formData.N,
          P: formData.P,
          K: formData.K,
          temperature: formData.temperature,
          humidity: formData.humidity,
          ph: formData.soilPH,
          rainfall: formData.rainfall,
          soil_moisture_avg: formData.soilMoisture,
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error("API error");
      }

      const result = await response.json();

      // Convert backend response → UI format
    setRecommendation({
      confidenceLevel: "High",
      recommendation: result.predicted_crop,
      timestamp: new Date(),
      analysisData: formData,
      recommendedCrops: [
        {
          id: "1",
          name: result.predicted_crop,
          nameHindi: result.predicted_crop,
          description: "Predicted using ML model", 
          expectedYield: 1000,
          profitMargin: 20,
          sustainabilityScore: 7,
          suitableConditions: ["Good soil", "Adequate rainfall"],
          imageUrl: ""
        }
      ]
    });
    } catch (error) {
      console.error(error);
      setError("Failed to get recommendations");
    } finally {
      setLoading(false);
    }
  };
  const getConfidenceColor = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case 'high':
        return 'success';
      case 'medium':
        return 'warning';
      case 'low':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
          {t('get_crop_advice')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Get AI-powered crop recommendations based on your soil conditions and farm details.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
              {t('crop_advice_form') || 'Crop Advice Form'}
            </Typography>

            <Box component="form" sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Nitrogen (N)"
                    type="number"
                    value={formData.N}
                    onChange={handleInputChange('N')}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Phosphorus (P)"
                    type="number"
                    value={formData.P}
                    onChange={handleInputChange('P')}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Potassium (K)"
                    type="number"
                    value={formData.K}
                    onChange={handleInputChange('K')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Temperature (°C)"
                    type="number"
                    value={formData.temperature}
                    onChange={handleInputChange('temperature')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Humidity (%)"
                    type="number"
                    value={formData.humidity}
                    onChange={handleInputChange('humidity')}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Soil pH"
                    type="number"
                    value={formData.soilPH}
                    onChange={handleInputChange('soilPH')}
                    inputProps={{ min: 0, max: 14, step: 0.1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Rainfall (mm)"
                    type="number"
                    value={formData.rainfall}
                    onChange={handleInputChange('rainfall')}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Soil Moisture (%)"
                    type="number"
                    value={formData.soilMoisture}
                    onChange={handleInputChange('soilMoisture')}
                    inputProps={{ min: 0, max: 100, step: 1 }}
                  />
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleGetRecommendation}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <AgricultureIcon />}
                sx={{ py: 1.5, mt: 3 }}
              >
                {loading ? 'Analyzing...' : t('get_recommendation') || 'Get Recommendation'}
              </Button>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Paper>
        </Grid>

        {/* Results Section */}
        <Grid item xs={12} md={6}>
          {recommendation ? (
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
                {t('recommended_crops')}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Confidence Level:
                </Typography>
                <Chip
                  label={recommendation.confidenceLevel}
                  color={getConfidenceColor(recommendation.confidenceLevel) as any}
                  variant="outlined"
                />
              </Box>

              <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                {recommendation.recommendation}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {recommendation.recommendedCrops.map((crop, index) => (
                <Card key={crop.id} sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AgricultureIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6" component="h3" fontWeight="bold">
                        {crop.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({crop.nameHindi})
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {crop.description}
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" color="primary" fontWeight="bold">
                            {Math.round(crop.expectedYield)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {t('yield')} (kg/acre)
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" color="success.main" fontWeight="bold">
                            {crop.profitMargin.toFixed(1)}%
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {t('profit_margin')}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" color="info.main" fontWeight="bold">
                            {crop.sustainabilityScore.toFixed(1)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {t('sustainability_score')}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                      Suitable Conditions:
                    </Typography>
                    <List dense>
                      {crop.suitableConditions.map((condition, conditionIndex) => (
                        <ListItem key={conditionIndex} sx={{ py: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleIcon fontSize="small" color="success" />
                          </ListItemIcon>
                          <ListItemText
                            primary={condition}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          ) : (
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
              <AgricultureIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No recommendations yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fill in the form and click "Get Recommendation" to see AI-powered crop suggestions.
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CropAdvicePage;
