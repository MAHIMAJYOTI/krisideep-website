export interface Crop {
  id: string;
  name: string;
  nameHindi: string;
  description: string;
  expectedYield: number; // kg per acre
  profitMargin: number; // percentage
  sustainabilityScore: number; // 0-10 scale
  suitableConditions: string[];
  imageUrl: string;
}

export interface CropJson {
  id: string;
  name: string;
  nameHindi: string;
  description: string;
  expectedYield: number;
  profitMargin: number;
  sustainabilityScore: number;
  suitableConditions: string[];
  imageUrl: string;
}

export const cropFromJson = (json: CropJson): Crop => ({
  id: json.id,
  name: json.name,
  nameHindi: json.nameHindi,
  description: json.description,
  expectedYield: json.expectedYield,
  profitMargin: json.profitMargin,
  sustainabilityScore: json.sustainabilityScore,
  suitableConditions: json.suitableConditions,
  imageUrl: json.imageUrl || '',
});

export const cropToJson = (crop: Crop): CropJson => ({
  id: crop.id,
  name: crop.name,
  nameHindi: crop.nameHindi,
  description: crop.description,
  expectedYield: crop.expectedYield,
  profitMargin: crop.profitMargin,
  sustainabilityScore: crop.sustainabilityScore,
  suitableConditions: crop.suitableConditions,
  imageUrl: crop.imageUrl,
});
