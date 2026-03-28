import React, { useState, useRef } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CameraAlt as CameraIcon,
  CloudUpload as UploadIcon,
  BugReport as BugReportIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { cropService } from '../services/CropService';
import { predictDisease } from '../services/predictDisease';
import { DiseaseDetectionResult } from '../models';

const DiseaseDetectionPage: React.FC = () => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [detectionResult, setDetectionResult] = useState<DiseaseDetectionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setDetectionResult(null);
      setError('');
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeDisease = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call the actual backend API
      const backendResult = await predictDisease(selectedFile);
      const predictedName = backendResult.predicted_disease;

      // Parse PlantVillage format (e.g. "Tomato___Bacterial_spot" -> "Tomato - Bacterial spot")
      const formattedName = predictedName
        .replace(/___/g, ' - ')
        .replace(/_/g, ' ');

      // Map to local UI metadata (descriptions, prevention, etc)
      const allDiseases = cropService.getAllDiseases();
      const match = allDiseases.find(d => 
        d.diseaseName.toLowerCase().includes(predictedName.toLowerCase()) || 
        predictedName.toLowerCase().includes(d.diseaseName.toLowerCase()) ||
        formattedName.toLowerCase().includes(d.diseaseName.toLowerCase())
      );

      // Default fallback if metadata loosely missing
      const fullResult: DiseaseDetectionResult = match || {
        diseaseName: formattedName,
        diseaseNameHindi: "अज्ञात",
        description: `This plant has been diagnosed with ${formattedName}. Please consult local agricultural guidelines for specific treatment.`,
        confidence: backendResult.confidence ? backendResult.confidence * 100 : 90.5,
        severity: formattedName.toLowerCase().includes('healthy') ? 'None' : 'Moderate',
        treatments: ['Consult a local agricultural expert', 'Consider using appropriate fungicides/pesticides based on the specific crop and disease'],
        prevention: ['Ensure proper watering techniques', 'Maintain field hygiene', 'Use disease-resistant seeds in the future'],
        imageUrl: '/images/default-disease.jpg'
      };

      setDetectionResult({
        ...fullResult,
        diseaseName: formattedName,
        confidence: backendResult.confidence ? backendResult.confidence * 100 : fullResult.confidence
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to analyze disease');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setDetectionResult(null);
    setError('');
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
      case 'severe':
        return 'error';
      case 'moderate':
      case 'medium':
        return 'warning';
      case 'mild':
      case 'low':
        return 'info';
      case 'none':
        return 'success';
      default:
        return 'default';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
      case 'severe':
        return <WarningIcon color="error" />;
      case 'moderate':
      case 'medium':
        return <WarningIcon color="warning" />;
      case 'mild':
      case 'low':
        return <InfoIcon color="info" />;
      case 'none':
        return <CheckCircleIcon color="success" />;
      default:
        return <InfoIcon />;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
          {t('crop_disease_detection')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('upload_image_description')}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Upload Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
              {t('upload_image')}
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              {!imagePreview ? (
                <Box
                  sx={{
                    border: '2px dashed',
                    borderColor: 'primary.main',
                    borderRadius: 2,
                    p: 4,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      opacity: 0.1,
                    },
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    {t('click_to_upload')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('drag_drop_image')}
                  </Typography>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center' }}>
                  <img
                    src={imagePreview}
                    alt="Selected crop"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      borderRadius: '8px',
                      marginBottom: '16px',
                    }}
                  />
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button
                      variant="outlined"
                      onClick={() => fileInputRef.current?.click()}
                      startIcon={<UploadIcon />}
                    >
                      Change Image
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleReset}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>

            {selectedFile && (
              <Box sx={{ mt: 3 }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleAnalyzeDisease}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <BugReportIcon />}
                  sx={{ py: 1.5 }}
                >
                  {loading ? 'Analyzing...' : t('analyze_disease')}
                </Button>
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Paper>
        </Grid>

        {/* Results Section */}
        <Grid item xs={12} md={6}>
          {detectionResult ? (
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
                {t('disease_detection_result')}
              </Typography>
              
              <Card sx={{ mb: 3, border: '1px solid', borderColor: 'divider' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getSeverityIcon(detectionResult.severity)}
                    <Typography variant="h5" component="h3" fontWeight="bold" sx={{ ml: 1 }}>
                      {detectionResult.diseaseName}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    ({detectionResult.diseaseNameHindi})
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip
                      label={`${detectionResult.confidence.toFixed(1)}% Confidence`}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                    <Chip
                      label={detectionResult.severity}
                      color={getSeverityColor(detectionResult.severity) as any}
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {detectionResult.description}
                  </Typography>
                </CardContent>
              </Card>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" component="h4" gutterBottom fontWeight="bold" color="error">
                        Treatment Options
                      </Typography>
                      <List dense>
                        {detectionResult.treatments.map((treatment, index) => (
                          <ListItem key={index} sx={{ py: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircleIcon fontSize="small" color="error" />
                            </ListItemIcon>
                            <ListItemText
                              primary={treatment}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" component="h4" gutterBottom fontWeight="bold" color="success">
                        Prevention Tips
                      </Typography>
                      <List dense>
                        {detectionResult.prevention.map((prevention, index) => (
                          <ListItem key={index} sx={{ py: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircleIcon fontSize="small" color="success" />
                            </ListItemIcon>
                            <ListItemText
                              primary={prevention}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          ) : (
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
              <CameraIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No analysis yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upload an image and click "Analyze Disease" to get AI-powered disease detection results.
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DiseaseDetectionPage;
