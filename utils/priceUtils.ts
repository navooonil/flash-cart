import { StorePrice } from '../types';

export const getBestPrice = (prices: StorePrice[]): StorePrice => {
  return prices.reduce((prev, curr) => prev.price < curr.price ? prev : curr);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};