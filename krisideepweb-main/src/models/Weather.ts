export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  condition: string;
  conditionHindi: string;
  rainfall: number;
  windSpeed: number;
  timestamp: Date;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  date: Date;
  maxTemp: number;
  minTemp: number;
  condition: string;
  conditionHindi: string;
  rainProbability: number;
}

export interface WeatherAlert {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  severity: string; // low, medium, high, critical
  alertTime: Date;
  expiryTime: Date;
}

export interface WeatherDataJson {
  location: string;
  temperature: number;
  humidity: number;
  condition: string;
  conditionHindi: string;
  rainfall: number;
  windSpeed: number;
  timestamp: string;
  forecast: any[];
}

export interface WeatherForecastJson {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  conditionHindi: string;
  rainProbability: number;
}

export interface WeatherAlertJson {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  severity: string;
  alertTime: string;
  expiryTime: string;
}

export const weatherDataFromJson = (json: WeatherDataJson): WeatherData => ({
  location: json.location,
  temperature: json.temperature,
  humidity: json.humidity,
  condition: json.condition,
  conditionHindi: json.conditionHindi,
  rainfall: json.rainfall,
  windSpeed: json.windSpeed,
  timestamp: new Date(json.timestamp),
  forecast: json.forecast.map((f: any) => weatherForecastFromJson(f)),
});

export const weatherForecastFromJson = (json: WeatherForecastJson): WeatherForecast => ({
  date: new Date(json.date),
  maxTemp: json.maxTemp,
  minTemp: json.minTemp,
  condition: json.condition,
  conditionHindi: json.conditionHindi,
  rainProbability: json.rainProbability,
});

export const weatherAlertFromJson = (json: WeatherAlertJson): WeatherAlert => ({
  id: json.id,
  title: json.title,
  titleHindi: json.titleHindi,
  description: json.description,
  descriptionHindi: json.descriptionHindi,
  severity: json.severity,
  alertTime: new Date(json.alertTime),
  expiryTime: new Date(json.expiryTime),
});

export const weatherDataToJson = (data: WeatherData): WeatherDataJson => ({
  location: data.location,
  temperature: data.temperature,
  humidity: data.humidity,
  condition: data.condition,
  conditionHindi: data.conditionHindi,
  rainfall: data.rainfall,
  windSpeed: data.windSpeed,
  timestamp: data.timestamp.toISOString(),
  forecast: data.forecast.map(weatherForecastToJson),
});

export const weatherForecastToJson = (forecast: WeatherForecast): WeatherForecastJson => ({
  date: forecast.date.toISOString(),
  maxTemp: forecast.maxTemp,
  minTemp: forecast.minTemp,
  condition: forecast.condition,
  conditionHindi: forecast.conditionHindi,
  rainProbability: forecast.rainProbability,
});

export const weatherAlertToJson = (alert: WeatherAlert): WeatherAlertJson => ({
  id: alert.id,
  title: alert.title,
  titleHindi: alert.titleHindi,
  description: alert.description,
  descriptionHindi: alert.descriptionHindi,
  severity: alert.severity,
  alertTime: alert.alertTime.toISOString(),
  expiryTime: alert.expiryTime.toISOString(),
});
