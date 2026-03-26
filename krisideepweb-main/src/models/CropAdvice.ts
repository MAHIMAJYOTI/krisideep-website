export interface CropAdviceRequest {
  soilPH: number;
  soilMoisture: number;
  farmSize: number;
  location: string;
}

export interface CropAdviceRequestJson {
  soilPH: number;
  soilMoisture: number;
  farmSize: number;
  location: string;
}

export const cropAdviceRequestFromJson = (json: CropAdviceRequestJson): CropAdviceRequest => ({
  soilPH: json.soilPH,
  soilMoisture: json.soilMoisture,
  farmSize: json.farmSize,
  location: json.location,
});

export const cropAdviceRequestToJson = (request: CropAdviceRequest): CropAdviceRequestJson => ({
  soilPH: request.soilPH,
  soilMoisture: request.soilMoisture,
  farmSize: request.farmSize,
  location: request.location,
});
