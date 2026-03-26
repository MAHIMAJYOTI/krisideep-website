export interface MarketPrice {
  id: string;
  cropName: string;
  cropNameHindi: string;
  currentPrice: number; // per quintal in INR
  previousPrice: number;
  changePercentage: number;
  market: string;
  marketHindi: string;
  state: string;
  stateHindi: string;
  timestamp: Date;
  priceUnit: string;
  grade: string;
}

export interface PriceTrend {
  cropName: string;
  priceHistory: PricePoint[];
  averagePrice: number;
  highestPrice: number;
  lowestPrice: number;
  trend: string; // increasing, decreasing, stable
  volatilityIndex: number;
}

export interface PricePoint {
  date: Date;
  price: number;
}

export interface MarketAlert {
  id: string;
  cropName: string;
  alertType: string; // price_drop, price_surge, best_time_to_sell
  title: string;
  titleHindi: string;
  message: string;
  messageHindi: string;
  targetPrice: number;
  currentPrice: number;
  createdAt: Date;
  isActive: boolean;
}

export interface BestSellingLocation {
  marketName: string;
  marketNameHindi: string;
  state: string;
  stateHindi: string;
  price: number;
  distance: number; // in km
  transportCost: string;
  netPrice: number;
  contact: string;
  rating: number;
}

export interface MarketPriceJson {
  id: string;
  cropName: string;
  cropNameHindi: string;
  currentPrice: number;
  previousPrice: number;
  changePercentage: number;
  market: string;
  marketHindi: string;
  state: string;
  stateHindi: string;
  timestamp: string;
  priceUnit: string;
  grade: string;
}

export interface PriceTrendJson {
  cropName: string;
  priceHistory: any[];
  averagePrice: number;
  highestPrice: number;
  lowestPrice: number;
  trend: string;
  volatilityIndex: number;
}

export interface PricePointJson {
  date: string;
  price: number;
}

export interface MarketAlertJson {
  id: string;
  cropName: string;
  alertType: string;
  title: string;
  titleHindi: string;
  message: string;
  messageHindi: string;
  targetPrice: number;
  currentPrice: number;
  createdAt: string;
  isActive: boolean;
}

export interface BestSellingLocationJson {
  marketName: string;
  marketNameHindi: string;
  state: string;
  stateHindi: string;
  price: number;
  distance: number;
  transportCost: string;
  netPrice: number;
  contact: string;
  rating: number;
}

export const marketPriceFromJson = (json: MarketPriceJson): MarketPrice => ({
  id: json.id,
  cropName: json.cropName,
  cropNameHindi: json.cropNameHindi,
  currentPrice: json.currentPrice,
  previousPrice: json.previousPrice,
  changePercentage: json.changePercentage,
  market: json.market,
  marketHindi: json.marketHindi,
  state: json.state,
  stateHindi: json.stateHindi,
  timestamp: new Date(json.timestamp),
  priceUnit: json.priceUnit || 'per quintal',
  grade: json.grade || 'FAQ',
});

export const priceTrendFromJson = (json: PriceTrendJson): PriceTrend => ({
  cropName: json.cropName,
  priceHistory: json.priceHistory.map((p: any) => pricePointFromJson(p)),
  averagePrice: json.averagePrice,
  highestPrice: json.highestPrice,
  lowestPrice: json.lowestPrice,
  trend: json.trend,
  volatilityIndex: json.volatilityIndex,
});

export const pricePointFromJson = (json: PricePointJson): PricePoint => ({
  date: new Date(json.date),
  price: json.price,
});

export const marketAlertFromJson = (json: MarketAlertJson): MarketAlert => ({
  id: json.id,
  cropName: json.cropName,
  alertType: json.alertType,
  title: json.title,
  titleHindi: json.titleHindi,
  message: json.message,
  messageHindi: json.messageHindi,
  targetPrice: json.targetPrice,
  currentPrice: json.currentPrice,
  createdAt: new Date(json.createdAt),
  isActive: json.isActive ?? true,
});

export const bestSellingLocationFromJson = (json: BestSellingLocationJson): BestSellingLocation => ({
  marketName: json.marketName,
  marketNameHindi: json.marketNameHindi,
  state: json.state,
  stateHindi: json.stateHindi,
  price: json.price,
  distance: json.distance,
  transportCost: json.transportCost,
  netPrice: json.netPrice,
  contact: json.contact,
  rating: json.rating,
});

export const marketPriceToJson = (price: MarketPrice): MarketPriceJson => ({
  id: price.id,
  cropName: price.cropName,
  cropNameHindi: price.cropNameHindi,
  currentPrice: price.currentPrice,
  previousPrice: price.previousPrice,
  changePercentage: price.changePercentage,
  market: price.market,
  marketHindi: price.marketHindi,
  state: price.state,
  stateHindi: price.stateHindi,
  timestamp: price.timestamp.toISOString(),
  priceUnit: price.priceUnit,
  grade: price.grade,
});

export const priceTrendToJson = (trend: PriceTrend): PriceTrendJson => ({
  cropName: trend.cropName,
  priceHistory: trend.priceHistory.map(pricePointToJson),
  averagePrice: trend.averagePrice,
  highestPrice: trend.highestPrice,
  lowestPrice: trend.lowestPrice,
  trend: trend.trend,
  volatilityIndex: trend.volatilityIndex,
});

export const pricePointToJson = (point: PricePoint): PricePointJson => ({
  date: point.date.toISOString(),
  price: point.price,
});

export const marketAlertToJson = (alert: MarketAlert): MarketAlertJson => ({
  id: alert.id,
  cropName: alert.cropName,
  alertType: alert.alertType,
  title: alert.title,
  titleHindi: alert.titleHindi,
  message: alert.message,
  messageHindi: alert.messageHindi,
  targetPrice: alert.targetPrice,
  currentPrice: alert.currentPrice,
  createdAt: alert.createdAt.toISOString(),
  isActive: alert.isActive,
});

export const bestSellingLocationToJson = (location: BestSellingLocation): BestSellingLocationJson => ({
  marketName: location.marketName,
  marketNameHindi: location.marketNameHindi,
  state: location.state,
  stateHindi: location.stateHindi,
  price: location.price,
  distance: location.distance,
  transportCost: location.transportCost,
  netPrice: location.netPrice,
  contact: location.contact,
  rating: location.rating,
});
