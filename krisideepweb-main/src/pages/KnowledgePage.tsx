import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  Book as BookIcon,
  Help as HelpIcon,
  CheckCircle as CheckCircleIcon,
  Agriculture as AgricultureIcon,
  Water as WaterIcon,
  Nature as EcoIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const KnowledgePage: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // Comprehensive FAQ data
  const faqs = [
    {
      id: '1',
      question: 'What is the best time to plant rice?',
      questionHindi: 'चावल बोने का सबसे अच्छा समय क्या है?',
      answer: 'Rice should be planted during the monsoon season (June-July) when there is adequate water availability. The soil temperature should be around 25-30°C for optimal germination. Early planting helps avoid pest attacks and ensures better yield.',
      answerHindi: 'चावल को मानसून के मौसम (जून-जुलाई) में बोना चाहिए जब पर्याप्त पानी उपलब्ध हो। इष्टतम अंकुरण के लिए मिट्टी का तापमान लगभग 25-30°C होना चाहिए। जल्दी बोने से कीटों के हमले से बचा जा सकता है।',
      category: 'Planting',
    },
    {
      id: '2',
      question: 'How often should I water my crops?',
      questionHindi: 'मुझे अपनी फसलों को कितनी बार पानी देना चाहिए?',
      answer: 'Watering frequency depends on the crop type, soil type, and weather conditions. Generally, most crops need 1-2 inches of water per week. Monitor soil moisture and adjust accordingly. Avoid overwatering as it can lead to root rot.',
      answerHindi: 'पानी देने की आवृत्ति फसल के प्रकार, मिट्टी के प्रकार और मौसम की स्थिति पर निर्भर करती है। आमतौर पर, अधिकांश फसलों को प्रति सप्ताह 1-2 इंच पानी की आवश्यकता होती है। अधिक पानी देने से बचें।',
      category: 'Irrigation',
    },
    {
      id: '3',
      question: 'What are the signs of nutrient deficiency in plants?',
      questionHindi: 'पौधों में पोषक तत्वों की कमी के संकेत क्या हैं?',
      answer: 'Common signs include yellowing leaves (nitrogen deficiency), purple leaves (phosphorus deficiency), brown leaf edges (potassium deficiency), and stunted growth. Regular soil testing helps identify deficiencies early.',
      answerHindi: 'आम संकेतों में पीले पत्ते (नाइट्रोजन की कमी), बैंगनी पत्ते (फॉस्फोरस की कमी), भूरे पत्ते के किनारे (पोटेशियम की कमी) और अवरुद्ध वृद्धि शामिल हैं।',
      category: 'Nutrition',
    },
    {
      id: '4',
      question: 'How can I prevent pest attacks on my crops?',
      questionHindi: 'मैं अपनी फसलों पर कीटों के हमले को कैसे रोक सकता हूं?',
      answer: 'Use integrated pest management (IPM) techniques including crop rotation, natural predators, organic pesticides, and regular field monitoring. Maintain good field hygiene and use resistant varieties when available.',
      answerHindi: 'फसल चक्रण, प्राकृतिक शिकारी, जैविक कीटनाशक और नियमित क्षेत्र निगरानी सहित एकीकृत कीट प्रबंधन (IPM) तकनीकों का उपयोग करें।',
      category: 'Pest Control',
    },
    {
      id: '5',
      question: 'What is the ideal soil pH for most crops?',
      questionHindi: 'अधिकांश फसलों के लिए आदर्श मिट्टी का pH क्या है?',
      answer: 'Most crops prefer a soil pH between 6.0 and 7.5. This range allows for optimal nutrient availability. Some crops like blueberries prefer more acidic soil (pH 4.5-5.5). Regular soil testing helps maintain proper pH levels.',
      answerHindi: 'अधिकांश फसलें 6.0 और 7.5 के बीच मिट्टी का pH पसंद करती हैं। यह सीमा इष्टतम पोषक तत्व उपलब्धता की अनुमति देती है।',
      category: 'Soil Management',
    },
    {
      id: '6',
      question: 'How do I choose the right fertilizer for my crops?',
      questionHindi: 'मैं अपनी फसलों के लिए सही उर्वरक कैसे चुनूं?',
      answer: 'Choose fertilizers based on soil test results and crop requirements. NPK ratio varies by crop - rice needs more nitrogen, while fruits need more potassium. Organic fertilizers improve soil health long-term.',
      answerHindi: 'मिट्टी की जांच के परिणामों और फसल की आवश्यकताओं के आधार पर उर्वरक चुनें। NPK अनुपात फसल के अनुसार भिन्न होता है।',
      category: 'Fertilization',
    },
    {
      id: '7',
      question: 'What are the benefits of crop rotation?',
      questionHindi: 'फसल चक्रण के क्या फायदे हैं?',
      answer: 'Crop rotation improves soil fertility, reduces pest and disease pressure, breaks weed cycles, and maintains soil structure. It also helps in better nutrient utilization and reduces the need for chemical inputs.',
      answerHindi: 'फसल चक्रण मिट्टी की उर्वरता में सुधार करता है, कीट और रोग के दबाव को कम करता है, और मिट्टी की संरचना को बनाए रखता है।',
      category: 'Crop Management',
    },
    {
      id: '8',
      question: 'How can I improve soil organic matter?',
      questionHindi: 'मैं मिट्टी के कार्बनिक पदार्थ को कैसे बेहतर बना सकता हूं?',
      answer: 'Add compost, green manure, crop residues, and organic matter regularly. Use cover crops, practice no-till farming, and avoid burning crop residues. This improves soil structure and water retention.',
      answerHindi: 'नियमित रूप से कम्पोस्ट, हरी खाद, फसल अवशेष और कार्बनिक पदार्थ मिलाएं। यह मिट्टी की संरचना और पानी की धारण क्षमता में सुधार करता है।',
      category: 'Soil Management',
    },
    {
      id: '9',
      question: 'What is the best way to store harvested crops?',
      questionHindi: 'कटाई की गई फसलों को स्टोर करने का सबसे अच्छा तरीका क्या है?',
      answer: 'Store crops in cool, dry, and well-ventilated areas. Use proper containers and maintain appropriate temperature and humidity levels. Regular inspection helps prevent spoilage and pest damage.',
      answerHindi: 'फसलों को ठंडे, सूखे और हवादार स्थानों में स्टोर करें। उचित तापमान और आर्द्रता बनाए रखें।',
      category: 'Post-Harvest',
    },
    {
      id: '10',
      question: 'How do I calculate the right seed rate for planting?',
      questionHindi: 'बुवाई के लिए सही बीज दर की गणना कैसे करूं?',
      answer: 'Seed rate depends on crop type, variety, soil conditions, and planting method. Generally, rice needs 20-25 kg/acre, wheat 40-50 kg/acre, and maize 15-20 kg/acre. Follow package recommendations for best results.',
      answerHindi: 'बीज दर फसल के प्रकार, किस्म, मिट्टी की स्थिति और बुवाई की विधि पर निर्भर करती है। सर्वोत्तम परिणामों के लिए पैकेज की सिफारिशों का पालन करें।',
      category: 'Planting',
    },
  ];

  const guidelines = [
    {
      title: 'Soil Preparation',
      titleHindi: 'मिट्टी की तैयारी',
      icon: <AgricultureIcon />,
      color: 'primary',
      items: [
        'Test soil pH and nutrient levels',
        'Add organic matter and compost',
        'Ensure proper drainage',
        'Remove weeds and debris',
      ],
    },
    {
      title: 'Water Management',
      titleHindi: 'जल प्रबंधन',
      icon: <WaterIcon />,
      color: 'info',
      items: [
        'Install efficient irrigation systems',
        'Monitor soil moisture levels',
        'Use mulching to retain moisture',
        'Implement water conservation techniques',
      ],
    },
    {
      title: 'Sustainable Farming',
      titleHindi: 'टिकाऊ खेती',
      icon: <EcoIcon />,
      color: 'success',
      items: [
        'Practice crop rotation',
        'Use organic fertilizers',
        'Implement integrated pest management',
        'Maintain biodiversity',
      ],
    },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
          {t('knowledge_faqs')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Access comprehensive farming guidelines and frequently asked questions.
        </Typography>
      </Box>

      {/* Search */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search FAQs and guidelines..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Grid container spacing={3}>
        {/* Guidelines Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
            {t('guidelines')}
          </Typography>
          
          {guidelines.map((guideline, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: `${guideline.color}.light`,
                      color: `${guideline.color}.contrastText`,
                      mr: 2,
                    }}
                  >
                    {guideline.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold">
                    {guideline.title}
                  </Typography>
                </Box>
                
                <List dense>
                  {guideline.items.map((item, itemIndex) => (
                    <ListItem key={itemIndex} sx={{ py: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary={item}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* FAQs Section */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
            {t('faqs')}
          </Typography>
          
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <Accordion key={faq.id} sx={{ mb: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`faq-${faq.id}-content`}
                  id={`faq-${faq.id}-header`}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <HelpIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {faq.question}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ({faq.questionHindi})
                      </Typography>
                    </Box>
                    <Chip
                      label={faq.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {faq.answer}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    {faq.answerHindi}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
              <BookIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No FAQs found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search terms or browse all FAQs.
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default KnowledgePage;
