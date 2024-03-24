import { Product } from '../types/Product';

export function getNewestProducts(products: Product[]) {
  const newestProducts = products.sort((a, b) => a.id.localeCompare(b.id))
    .filter(prod => prod.name.length > 28)
    .filter(prod => prod.screen.length < 25);

  return newestProducts;
}
