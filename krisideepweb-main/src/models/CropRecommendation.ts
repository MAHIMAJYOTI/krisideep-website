import { Crop } from './Crop';

export interface CropRecommendation {
  recommendedCrops: Crop[];
  recommendation: string;
  confidenceLevel: string;
  timestamp: Date;
  analysisData: Record<string, any>;
}

export interface CropRecommendationJson {
  recommendedCrops: any[];
  recommendation: string;
  confidenceLevel: string;
  timestamp: string;
  analysisData: Record<string, any>;
}

export const cropRecommendationFromJson = (json: CropRecommendationJson): CropRecommendation => ({
  recommendedCrops: json.recommendedCrops.map((crop: any) => ({
    id: crop.id,
    name: crop.name,
    nameHindi: crop.nameHindi,
    description: crop.description,
    expectedYield: crop.expectedYield,
    profitMargin: crop.profitMargin,
    sustainabilityScore: crop.sustainabilityScore,
    suitableConditions: crop.suitableConditions,
    imageUrl: crop.imageUrl || '',
  })),
  recommendation: json.recommendation,
  confidenceLevel: json.confidenceLevel,
  timestamp: new Date(json.timestamp),
  analysisData: json.analysisData,
});

export const cropRecommendationToJson = (recommendation: CropRecommendation): CropRecommendationJson => ({
  recommendedCrops: recommendation.recommendedCrops.map(crop => ({
    id: crop.id,
    name: crop.name,
    nameHindi: crop.nameHindi,
    description: crop.description,
    expectedYield: crop.expectedYield,
    profitMargin: crop.profitMargin,
    sustainabilityScore: crop.sustainabilityScore,
    suitableConditions: crop.suitableConditions,
    imageUrl: crop.imageUrl,
  })),
  recommendation: recommendation.recommendation,
  confidenceLevel: recommendation.confidenceLevel,
  timestamp: recommendation.timestamp.toISOString(),
  analysisData: recommendation.analysisData,
});
