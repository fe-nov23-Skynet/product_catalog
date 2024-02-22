import { Product } from '../types/Product';
import { client } from './fetchClient';

export function getProduct(currentPath: string, productId: string) {
  return client.get<Product[]>(`api/${currentPath}.json`)
    .then(
      productsServer => productsServer.find(({ id }) => id === productId) || null,
    );
}
