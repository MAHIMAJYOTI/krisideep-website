export interface DiseaseDetectionResult {
  diseaseName: string;
  diseaseNameHindi: string;
  description: string;
  confidence: number; // percentage
  severity: string;
  treatments: string[];
  prevention: string[];
  imageUrl: string;
}

export interface DiseaseDetectionResultJson {
  diseaseName: string;
  diseaseNameHindi: string;
  description: string;
  confidence: number;
  severity: string;
  treatments: string[];
  prevention: string[];
  imageUrl: string;
}

export const diseaseDetectionResultFromJson = (json: DiseaseDetectionResultJson): DiseaseDetectionResult => ({
  diseaseName: json.diseaseName,
  diseaseNameHindi: json.diseaseNameHindi,
  description: json.description,
  confidence: json.confidence,
  severity: json.severity,
  treatments: json.treatments,
  prevention: json.prevention,
  imageUrl: json.imageUrl || '',
});

export const diseaseDetectionResultToJson = (result: DiseaseDetectionResult): DiseaseDetectionResultJson => ({
  diseaseName: result.diseaseName,
  diseaseNameHindi: result.diseaseNameHindi,
  description: result.description,
  confidence: result.confidence,
  severity: result.severity,
  treatments: result.treatments,
  prevention: result.prevention,
  imageUrl: result.imageUrl,
});
