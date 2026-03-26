import { Crop, CropRecommendation, CropAdviceRequest, DiseaseDetectionResult } from '../models';

class CropService {
  // Comprehensive crop data for demonstration
  private dummyCrops: Crop[] = [
    {
      id: '1',
      name: 'Rice',
      nameHindi: 'चावल',
      description: 'Staple crop suitable for humid regions with good water availability. High yielding varieties available.',
      expectedYield: 2800, // kg per acre
      profitMargin: 28.5,
      sustainabilityScore: 8.2,
      suitableConditions: ['High moisture (60-80%)', 'pH 6.0-7.5', 'Fertile alluvial soil', 'Temperature 20-35°C'],
      imageUrl: '/images/rice.jpg',
    },
    {
      id: '2',
      name: 'Wheat',
      nameHindi: 'गेहूं',
      description: 'Winter crop suitable for cooler regions with moderate water needs. High protein content.',
      expectedYield: 2200,
      profitMargin: 32.8,
      sustainabilityScore: 8.5,
      suitableConditions: ['Moderate moisture (40-60%)', 'pH 6.5-7.5', 'Well-drained soil', 'Temperature 15-25°C'],
      imageUrl: '/images/wheat.jpg',
    },
    {
      id: '3',
      name: 'Maize',
      nameHindi: 'मक्का',
      description: 'Versatile crop suitable for various climatic conditions. High energy content.',
      expectedYield: 3800,
      profitMargin: 38.2,
      sustainabilityScore: 7.8,
      suitableConditions: ['Moderate moisture (50-70%)', 'pH 6.0-7.0', 'Fertile soil', 'Temperature 18-30°C'],
      imageUrl: '/images/maize.jpg',
    },
    {
      id: '4',
      name: 'Sugarcane',
      nameHindi: 'गन्ना',
      description: 'Cash crop requiring high water and warm climate. High sugar content.',
      expectedYield: 52000,
      profitMargin: 31.5,
      sustainabilityScore: 6.8,
      suitableConditions: ['High moisture (70-90%)', 'pH 6.5-7.5', 'Rich fertile soil', 'Temperature 25-35°C'],
      imageUrl: '/images/sugarcane.jpg',
    },
    {
      id: '5',
      name: 'Cotton',
      nameHindi: 'कपास',
      description: 'Fiber crop suitable for black cotton soil regions. High market value.',
      expectedYield: 950,
      profitMargin: 35.8,
      sustainabilityScore: 7.2,
      suitableConditions: ['Moderate moisture (40-60%)', 'pH 6.0-8.0', 'Black cotton soil', 'Temperature 20-30°C'],
      imageUrl: '/images/cotton.jpg',
    },
    {
      id: '6',
      name: 'Soybean',
      nameHindi: 'सोयाबीन',
      description: 'Protein-rich legume crop. Good for soil nitrogen fixation.',
      expectedYield: 1800,
      profitMargin: 29.5,
      sustainabilityScore: 8.8,
      suitableConditions: ['Moderate moisture (50-70%)', 'pH 6.0-7.0', 'Well-drained soil', 'Temperature 20-30°C'],
      imageUrl: '/images/soybean.jpg',
    },
    {
      id: '7',
      name: 'Groundnut',
      nameHindi: 'मूंगफली',
      description: 'Oilseed crop with high nutritional value. Drought tolerant.',
      expectedYield: 1200,
      profitMargin: 33.2,
      sustainabilityScore: 8.0,
      suitableConditions: ['Low to moderate moisture (30-50%)', 'pH 6.0-7.5', 'Sandy loam soil', 'Temperature 25-35°C'],
      imageUrl: '/images/groundnut.jpg',
    },
    {
      id: '8',
      name: 'Tomato',
      nameHindi: 'टमाटर',
      description: 'High-value vegetable crop. Short duration and high yield potential.',
      expectedYield: 25000,
      profitMargin: 45.8,
      sustainabilityScore: 7.5,
      suitableConditions: ['Moderate moisture (50-70%)', 'pH 6.0-7.0', 'Fertile soil', 'Temperature 20-30°C'],
      imageUrl: '/images/tomato.jpg',
    },
    {
      id: '9',
      name: 'Potato',
      nameHindi: 'आलू',
      description: 'Staple vegetable crop. High carbohydrate content and good storage.',
      expectedYield: 18000,
      profitMargin: 28.5,
      sustainabilityScore: 7.8,
      suitableConditions: ['Moderate moisture (60-80%)', 'pH 5.5-6.5', 'Sandy loam soil', 'Temperature 15-25°C'],
      imageUrl: '/images/potato.jpg',
    },
    {
      id: '10',
      name: 'Onion',
      nameHindi: 'प्याज',
      description: 'Essential vegetable crop. Good market demand and storage life.',
      expectedYield: 15000,
      profitMargin: 42.3,
      sustainabilityScore: 8.1,
      suitableConditions: ['Moderate moisture (50-70%)', 'pH 6.0-7.0', 'Well-drained soil', 'Temperature 15-25°C'],
      imageUrl: '/images/onion.jpg',
    },
  ];

  // Simulate AI-based crop recommendation
  async getCropRecommendation(request: CropAdviceRequest): Promise<CropRecommendation> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simple rule-based recommendation logic (replace with actual AI model)
    const recommendedCrops: Crop[] = [];

    for (const crop of this.dummyCrops) {
      const suitabilityScore = this.calculateSuitabilityScore(crop, request);
      if (suitabilityScore > 0.6) {
        // Modify crop data based on request parameters
        recommendedCrops.push({
          ...crop,
          expectedYield: crop.expectedYield * suitabilityScore,
          profitMargin: crop.profitMargin * suitabilityScore,
        });
      }
    }

    // Sort by expected yield
    recommendedCrops.sort((a, b) => b.expectedYield - a.expectedYield);

    // Take top 3 recommendations
    const topRecommendations = recommendedCrops.slice(0, 3);

    const recommendation = this.generateRecommendationText(request, topRecommendations);
    const confidenceLevel = topRecommendations.length > 0 ? 'High' : 'Low';

    return {
      recommendedCrops: topRecommendations,
      recommendation,
      confidenceLevel,
      timestamp: new Date(),
      analysisData: {
        soilPH: request.soilPH,
        soilMoisture: request.soilMoisture,
        farmSize: request.farmSize,
        location: request.location,
      },
    };
  }

  // Calculate suitability score based on soil conditions
  private calculateSuitabilityScore(crop: Crop, request: CropAdviceRequest): number {
    let score = 0.5; // Base score

    // pH suitability
    if (crop.name === 'Rice' && request.soilPH >= 6.0 && request.soilPH <= 7.5) {
      score += 0.2;
    } else if (crop.name === 'Wheat' && request.soilPH >= 6.5 && request.soilPH <= 7.5) {
      score += 0.2;
    } else if (crop.name === 'Maize' && request.soilPH >= 6.0 && request.soilPH <= 7.0) {
      score += 0.2;
    } else if (crop.name === 'Sugarcane' && request.soilPH >= 6.5 && request.soilPH <= 7.5) {
      score += 0.2;
    } else if (crop.name === 'Cotton' && request.soilPH >= 6.0 && request.soilPH <= 8.0) {
      score += 0.2;
    }

    // Moisture suitability
    if ((crop.name === 'Rice' || crop.name === 'Sugarcane') && request.soilMoisture > 60) {
      score += 0.2;
    } else if (
      (crop.name === 'Wheat' || crop.name === 'Maize' || crop.name === 'Cotton') &&
      request.soilMoisture >= 30 &&
      request.soilMoisture <= 70
    ) {
      score += 0.2;
    }

    // Farm size consideration
    if (request.farmSize > 5) {
      score += 0.1;
    }

    return Math.min(score, 1.0);
  }

  // Generate recommendation text
  private generateRecommendationText(request: CropAdviceRequest, crops: Crop[]): string {
    if (crops.length === 0) {
      return `Based on your soil conditions (pH: ${request.soilPH}, Moisture: ${request.soilMoisture}%), we recommend consulting with local agricultural experts for personalized advice.`;
    }

    const topCrop = crops[0].name;
    return `Based on your soil analysis (pH: ${request.soilPH}, Moisture: ${request.soilMoisture}%), ${topCrop} appears to be the most suitable crop for your ${request.farmSize}-acre farm. The recommended crops are well-suited for your soil conditions and climate.`;
  }

  // Simulate disease detection using ML model
  async detectDisease(imageFile: File): Promise<DiseaseDetectionResult> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Comprehensive disease detection results
    const possibleDiseases: DiseaseDetectionResult[] = [
      {
        diseaseName: 'Bacterial Leaf Blight',
        diseaseNameHindi: 'जीवाणु पत्ती झुलसा',
        description: 'A serious bacterial disease causing water-soaked lesions on leaves, leading to significant yield loss in rice crops.',
        confidence: 89.2,
        severity: 'High',
        treatments: [
          'Apply copper-based bactericides',
          'Remove and destroy infected plants',
          'Improve field drainage',
          'Use resistant varieties in next season',
          'Apply streptomycin spray (0.1%)',
        ],
        prevention: [
          'Use certified disease-free seeds',
          'Maintain proper field hygiene',
          'Avoid overhead irrigation',
          'Practice crop rotation',
          'Monitor weather conditions',
        ],
        imageUrl: '/images/bacterial-blight.jpg',
      },
      {
        diseaseName: 'Powdery Mildew',
        diseaseNameHindi: 'चूर्णी फफूंदी',
        description: 'Fungal disease causing white powdery coating on leaves, reducing photosynthesis and plant vigor.',
        confidence: 85.7,
        severity: 'Moderate',
        treatments: [
          'Apply sulfur-based fungicides',
          'Spray neem oil solution (2%)',
          'Use baking soda spray (1 tsp per liter)',
          'Remove heavily infected leaves',
          'Apply potassium bicarbonate',
        ],
        prevention: [
          'Ensure good air circulation',
          'Avoid overcrowding plants',
          'Water at soil level only',
          'Use resistant varieties',
          'Regular field monitoring',
        ],
        imageUrl: '/images/powdery-mildew.jpg',
      },
      {
        diseaseName: 'Rust Disease',
        diseaseNameHindi: 'रस्ट रोग',
        description: 'Fungal disease causing orange or brown pustules on leaves, stems, and grains, affecting crop quality.',
        confidence: 91.3,
        severity: 'High',
        treatments: [
          'Apply propiconazole fungicide',
          'Remove infected plant debris',
          'Improve field ventilation',
          'Use systemic fungicides',
          'Apply mancozeb spray',
        ],
        prevention: [
          'Plant resistant varieties',
          'Maintain proper spacing',
          'Avoid excessive nitrogen',
          'Practice crop rotation',
          'Monitor humidity levels',
        ],
        imageUrl: '/images/rust-disease.jpg',
      },
      {
        diseaseName: 'Anthracnose',
        diseaseNameHindi: 'एन्थ्रेक्नोज',
        description: 'Fungal disease causing dark, sunken lesions on fruits, leaves, and stems, leading to fruit rot.',
        confidence: 87.8,
        severity: 'Moderate',
        treatments: [
          'Apply chlorothalonil fungicide',
          'Remove infected plant parts',
          'Improve air circulation',
          'Use copper-based sprays',
          'Apply thiophanate-methyl',
        ],
        prevention: [
          'Use disease-free seeds',
          'Avoid overhead watering',
          'Maintain proper spacing',
          'Practice field sanitation',
          'Monitor weather conditions',
        ],
        imageUrl: '/images/anthracnose.jpg',
      },
      {
        diseaseName: 'Root Rot',
        diseaseNameHindi: 'जड़ सड़न',
        description: 'Soil-borne fungal disease causing root decay, wilting, and plant death, especially in waterlogged conditions.',
        confidence: 83.5,
        severity: 'High',
        treatments: [
          'Improve soil drainage',
          'Apply fungicide drench',
          'Remove infected plants',
          'Use biological control agents',
          'Apply carbendazim to soil',
        ],
        prevention: [
          'Ensure proper drainage',
          'Avoid overwatering',
          'Use well-drained soil',
          'Practice crop rotation',
          'Maintain soil pH balance',
        ],
        imageUrl: '/images/root-rot.jpg',
      },
      {
        diseaseName: 'Healthy Plant',
        diseaseNameHindi: 'स्वस्थ पौधा',
        description: 'The plant appears healthy with no visible signs of disease. Continue current care practices.',
        confidence: 94.2,
        severity: 'None',
        treatments: [
          'Continue regular care',
          'Maintain proper nutrition',
          'Monitor regularly',
          'Apply preventive measures',
        ],
        prevention: [
          'Regular field inspection',
          'Proper watering schedule',
          'Balanced fertilization',
          'Good field hygiene',
          'Use quality seeds',
        ],
        imageUrl: '/images/healthy-plant.jpg',
      },
    ];

    // Randomly select a result for demonstration
    const randomIndex = Math.floor(Math.random() * possibleDiseases.length);
    return possibleDiseases[randomIndex];
  }

  // Get all available crops
  getAllCrops(): Crop[] {
    return this.dummyCrops;
  }

  // Search crops by name
  searchCrops(query: string): Crop[] {
    return this.dummyCrops.filter(
      crop =>
        crop.name.toLowerCase().includes(query.toLowerCase()) ||
        crop.nameHindi.includes(query)
    );
  }
}

// Create a singleton instance
export const cropService = new CropService();
