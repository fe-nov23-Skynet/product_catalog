import { Product } from '../types/Product';

export function getBestPrice(products: Product[]) {
  const bestPrice = products
    .filter(prod => prod.priceRegular - prod.priceDiscount > 0)
    .filter(prod => prod.name.length > 28)
    .filter(prod => prod.screen.length < 25);
  bestPrice.sort((a, b) => (b.priceRegular - b.priceDiscount) - (a.priceRegular - a.priceDiscount));

  return bestPrice;
}
