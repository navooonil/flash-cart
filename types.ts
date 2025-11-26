export interface StorePrice {
  store: string;
  price: number;
  logo?: string;
}

export interface Nutrition {
  calories: number;
  protein: string;
  carbs: string;
}

export interface Product {
  id: string;
  displayName: string;
  category: string;
  prices: StorePrice[];
  image?: string;
  nutrition?: Nutrition;
}

export interface CartItem extends Product {
  qty: number;
}

export interface DetectionResult {
  label: string;
  confidence: number;
  timestamp: number;
  nutrition?: Nutrition;
}

export type ViewState = 'landing' | 'scan';