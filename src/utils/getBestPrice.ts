import { Product } from '../types/Product';

export function getBestPrice(products: Product[]) {
  const bestPrice = products.filter(prod => prod.priceRegular - prod.priceDiscount > 0);
  bestPrice.sort((a, b) => (b.priceRegular - b.priceDiscount) - (a.priceRegular - a.priceDiscount));

  return bestPrice;
}
