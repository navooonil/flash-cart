import { Product } from '../../types';

export const PRODUCTS: Record<string, Product> = {
  "banana": {
    id: "banana",
    displayName: "Organic Bananas (1kg)",
    category: "Produce",
    image: "https://images.unsplash.com/photo-1571771896454-8463d75c745a?auto=format&fit=crop&q=80&w=200",
    nutrition: { calories: 89, protein: "1.1g", carbs: "23g" },
    prices: [
      { store: "Blinkit", price: 45 },
      { store: "Zepto", price: 42 },
      { store: "Instamart", price: 48 }
    ]
  },
  "milk": {
    id: "milk",
    displayName: "Full Cream Milk (1L)",
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=200",
    nutrition: { calories: 60, protein: "3.2g", carbs: "4.8g" },
    prices: [
      { store: "Blinkit", price: 68 },
      { store: "Zepto", price: 66 },
      { store: "Instamart", price: 68 }
    ]
  },
  "bread": {
    id: "bread",
    displayName: "Whole Wheat Bread",
    category: "Bakery",
    image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&q=80&w=200",
    nutrition: { calories: 265, protein: "9g", carbs: "49g" },
    prices: [
      { store: "Blinkit", price: 40 },
      { store: "Zepto", price: 38 },
      { store: "Instamart", price: 45 }
    ]
  },
  "eggs": {
    id: "eggs",
    displayName: "Farm Fresh Eggs (6pcs)",
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=200",
    nutrition: { calories: 155, protein: "13g", carbs: "1.1g" },
    prices: [
      { store: "Blinkit", price: 55 },
      { store: "Zepto", price: 60 },
      { store: "Instamart", price: 52 }
    ]
  },
  "coffee": {
    id: "coffee",
    displayName: "Instant Coffee Jar (50g)",
    category: "Pantry",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=200",
    nutrition: { calories: 2, protein: "0.1g", carbs: "0g" },
    prices: [
      { store: "Blinkit", price: 180 },
      { store: "Zepto", price: 175 },
      { store: "Instamart", price: 185 }
    ]
  }
};