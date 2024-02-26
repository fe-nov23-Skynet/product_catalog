import { Product } from '../types/Product';

export function getNewestProducts(products: Product[]) {
  const newestProducts = products.sort((a, b) => a.id.localeCompare(b.id));

  return newestProducts;
}
