// stores/useBrandStore.js
import {create} from 'zustand';
import { supabase } from '../lib/supabase';

export const useBrandStore = create((set) => ({
  brands: [],
  addBrand: (brand) => set((state) => ({ brands: [...state.brands, brand] })),
  removeBrand: (id) => set((state) => ({
    brands: state.brands.filter((brand) => brand.id !== id),
  })),
  updateBrand: (id, updatedBrand) => set((state) => ({
    brands: state.brands.map((brand) =>
      brand.id === id ? { ...brand, ...updatedBrand } : brand
    ),
  })),
  
  setBrands: (brands) => set({ brands }),
}));

