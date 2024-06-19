// stores/useProductStore.js
import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useProductStore = create((set) => ({
  products: [],
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  removeProduct: (id) => set((state) => ({
    products: state.products.filter((product) => product.id !== id),
  })),
  increaseQuantity: async (id, quantity) => {
    const nextQuantity = quantity + 1;
    const { data, error } = await supabase
      .from('Product')
      .update({ quantity: nextQuantity })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error increasing quantity:', error);
    } else {
      // Update the state with the new quantity
      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? { ...product, quantity: nextQuantity } : product
        ),
      }));
    }
  },
  decreaseQuantity: async (id, quantity) => {
    const nextQuantity = quantity - 1;
    const { data, error } = await supabase
      .from('Product')
      .update({ quantity: nextQuantity })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error decreasing quantity:', error);
    } else {
      // Update the state with the new quantity
      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? { ...product, quantity: nextQuantity } : product
        ),
      }));
    }
  },
  updateProduct: (id, updatedProduct) => set((state) => ({
    products: state.products.map((product) =>
      product.id === id ? { ...product, ...updatedProduct } : product
    ),
  })),
  setProducts: (products) => set({ products }),
  fetchProductsByMarket: async (marketId) => {
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .eq('market_id', marketId);

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      set({ products: data });
    }
  },
  insertProduct: async (newProduct) => {
            const { data, error } = await supabase
            .from('Product')
            .insert(newProduct)
            .select()
            console.log(data,error)
        },
            }));
           

export default useProductStore;
