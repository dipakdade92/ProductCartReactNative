import {Product} from '../types/Product';

export const fetchProducts = async (): Promise<Product[]> => {
  const baseUrl = 'https://fakestoreapi.com/products';
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products: ', error);
    return [];
  }
};
