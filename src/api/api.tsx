import { AxiosResponse } from 'axios';
import { ShortProduct } from '../types/ShortProduct';
import { Product } from '../types/Product';
import { client } from './fetchClient';
import axiosInstance from './axiosClient';

export function getProductOLD(currentPath: string, productId: string) {
  return client.get<Product[]>(`api/${currentPath}.json`)
    .then(
      productsServer => productsServer.find(({ id }) => id === productId) || null,
    );
}

export async function getProduct(currentPath: string, productId: string): Promise<Product | null> {
  try {
    const serverProduct = await axiosInstance.get<Product>(`/${currentPath}/${productId}`);

    return serverProduct.data;
  } catch (error) {
    try {
      const productsServer = await client.get<Product[]>(`api/${currentPath}.json`);
      const localProduct = productsServer.find(product => product.id === productId) || null;

      return localProduct;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error fetching product:', error);
      return null;
    }
  }
}

export async function getProducts(currentPath: string) {
  try {
    const serverData: AxiosResponse<Product[]> = await axiosInstance.get<Product[]>(`/${currentPath}`);
    if (serverData.data.length > 0) return serverData.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching products:', error);
  }

  try {
    const localData = await client.get<Product[]>(`api/${currentPath}.json`);
    return localData;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching products:', err);
    return [];
  }
}

export function getShortProducts(currentPath: string) {
  return client.get<ShortProduct[]>(`api/${currentPath}.json`);
}
